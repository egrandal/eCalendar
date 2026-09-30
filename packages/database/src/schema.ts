import {
  boolean,
  int,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
// Base inicial. Las reglas y reservas se añadirán con sus invariantes y pruebas.
export const bookingPages = mysqlTable("booking_pages", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  title: varchar("title", { length: 200 }).notNull(),
  durationMinutes: int("duration_minutes").notNull().default(30),
  timezone: varchar("timezone", { length: 64 })
    .notNull()
    .default("Europe/Madrid"),
  active: boolean("active").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
