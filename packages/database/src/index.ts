import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "./schema.js";
export function createDatabase(url: string) {
  const pool = mysql.createPool({
    uri: url,
    connectionLimit: 5,
    connectTimeout: 3000,
  });
  const db = drizzle(pool, { schema, mode: "default" });
  return { db, pool };
}
