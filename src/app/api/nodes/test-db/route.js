import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { Client as PGClient } from "pg";
import mysql from "mysql2/promise";

export async function POST(req) {
  try {
    const { uri, dbName, dbType } = await req.json();

    if (!uri || !dbType) {
      return NextResponse.json(
        { error: "Missing URI or dbType" },
        { status: 400 }
      );
    }

    // MongoDB Schema Extraction
    if (dbType === "mongodb") {
      const client = new MongoClient(uri);
      await client.connect();
      const db = client.db(dbName);
      const collections = await db.listCollections().toArray();

      const schemaInfo = await Promise.all(
        collections.map(async (col) => {
          const collection = db.collection(col.name);
          // Get sample document to infer schema
          const sampleDoc = await collection.findOne({});
          const fields = sampleDoc
            ? Object.keys(sampleDoc).map((key) => ({
                name: key,
                type: typeof sampleDoc[key],
                // For nested objects, we could add more detailed typing
                example: JSON.stringify(sampleDoc[key]).slice(0, 50),
              }))
            : [];

          return {
            name: col.name,
            type: "collection",
            fields,
          };
        })
      );

      await client.close();

      return NextResponse.json({
        type: "mongodb",
        schema: dbName,
        tables: schemaInfo,
      });
    }

    // PostgreSQL Schema Extraction
    if (dbType === "postgresql") {
      const client = new PGClient({ connectionString: uri });
      await client.connect();

      // Get tables
      const tablesResult = await client.query(
        `SELECT table_name FROM information_schema.tables 
         WHERE table_schema='public'`
      );

      // Get columns for each table
      const tablesWithColumns = await Promise.all(
        tablesResult.rows.map(async (row) => {
          const columns = await client.query(
            `SELECT column_name, data_type, is_nullable, column_default 
             FROM information_schema.columns 
             WHERE table_name = $1`,
            [row.table_name]
          );

          return {
            name: row.table_name,
            type: "table",
            columns: columns.rows.map((col) => ({
              name: col.column_name,
              type: col.data_type,
              nullable: col.is_nullable === "YES",
              default: col.column_default,
            })),
          };
        })
      );

      await client.end();

      return NextResponse.json({
        type: "postgresql",
        schema: "public",
        tables: tablesWithColumns,
      });
    }

    // MySQL Schema Extraction
    if (dbType === "mysql") {
      const conn = await mysql.createConnection(uri);

      // Get tables
      const [tables] = await conn.execute("SHOW TABLES");
      const tableList = tables.map((t) => Object.values(t)[0]);

      // Get columns for each table
      const tablesWithColumns = await Promise.all(
        tableList.map(async (tableName) => {
          const [columns] = await conn.execute(
            `SHOW COLUMNS FROM ${tableName}`
          );

          return {
            name: tableName,
            type: "table",
            columns: columns.map((col) => ({
              name: col.Field,
              type: col.Type,
              nullable: col.Null === "YES",
              default: col.Default,
              key: col.Key, // PRI for primary key, etc.
            })),
          };
        })
      );

      await conn.end();

      return NextResponse.json({
        type: "mysql",
        schema: dbName,
        tables: tablesWithColumns,
      });
    }

    return NextResponse.json(
      { error: "Unsupported database type." },
      { status: 400 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Something went wrong." },
      { status: 500 }
    );
  }
}
