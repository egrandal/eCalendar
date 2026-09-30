import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
config({ path: "../../.env" });
if (!process.env.DATABASE_URL) throw new Error("Falta DATABASE_URL en .env");
export default defineConfig({
  dialect: "mysql",
  schema: "./src/schema.ts",
  out: "./migrations",
  dbCredentials: { url: process.env.DATABASE_URL },
});
