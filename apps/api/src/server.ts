import { config } from "dotenv";
import { fileURLToPath } from "node:url";
import { createDatabase } from "@eg/database";
import { buildApp } from "./app.js";
config({ path: fileURLToPath(new URL("../../../.env", import.meta.url)) });
if (!process.env.DATABASE_URL)
  throw new Error("Falta DATABASE_URL. Copia .env.example a .env.");
const port = Number(process.env.PORT ?? 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535)
  throw new Error("PORT no válido");
const { pool } = createDatabase(process.env.DATABASE_URL);
const app = await buildApp({
  logger: true,
  checkDatabase: async () => {
    await pool.query("SELECT 1");
  },
  closeDatabase: async () => {
    await pool.end();
  },
});
for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.once(signal, () => {
    void app.close().catch(() => {
      process.exitCode = 1;
    });
  });
}
await app.listen({ host: process.env.HOST ?? "127.0.0.1", port });
