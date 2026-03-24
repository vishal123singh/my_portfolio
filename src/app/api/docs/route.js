import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "openapi.json");
    const data = await fs.readFile(filePath, "utf-8");
    const json = JSON.parse(data);
    return NextResponse.json(json);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to load OpenAPI spec" },
      { status: 500 }
    );
  }
}
 
