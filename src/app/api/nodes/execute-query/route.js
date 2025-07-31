import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { Client as PgClient } from "pg";
import mysql from "mysql2/promise";

export async function POST(req) {
  try {
    const { uri, dbName, dbType, query } = await req.json();

    if (!uri || !dbName || !dbType || !query) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    let result;
    if (dbType === "mongodb") {
      const client = await MongoClient.connect(uri, {
        serverSelectionTimeoutMS: 5000,
      });

      const db = client.db(dbName);
      const queryObj = query;

      if (!queryObj.collection)
        throw new Error("MongoDB query must include a 'collection' field.");

      const data = await db
        .collection(queryObj.collection)
        .find(queryObj.filter || {}, { projection: queryObj.projection || {} })
        .limit(50)
        .toArray();

      result = data;

      await client.close();
    } else if (dbType === "postgres") {
      const client = new PgClient({ connectionString: uri });
      await client.connect();

      if (!query.toLowerCase().trim().startsWith("select")) {
        throw new Error("Only SELECT queries are allowed.");
      }

      const { rows } = await client.query(query);
      result = rows;

      await client.end();
    } else if (dbType === "mysql") {
      const connection = await mysql.createConnection(uri);

      if (!query.toLowerCase().trim().startsWith("select")) {
        throw new Error("Only SELECT queries are allowed.");
      }

      const [rows] = await connection.execute(query);
      result = rows;

      await connection.end();
    } else {
      return NextResponse.json(
        { error: "Unsupported database type." },
        { status: 400 }
      );
    }

    return NextResponse.json({ result });
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
