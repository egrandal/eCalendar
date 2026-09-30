import Fastify from "fastify";
import staticFiles from "@fastify/static";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import type { HealthResponse, ReadinessResponse } from "@eg/shared";

export async function buildApp(options: {
  checkDatabase: () => Promise<void>;
  closeDatabase?: () => Promise<void>;
  logger?: boolean;
}) {
  const app = Fastify({ logger: options.logger ?? false });
  app.get("/health", async (_request, reply): Promise<HealthResponse> => {
    // Único recurso público actual: estado sin datos personales ni credenciales.
    reply.header("Access-Control-Allow-Origin", "*");
    return { status: "ok", service: "ecalendar" };
  });
  app.get("/ready", async (_request, reply): Promise<ReadinessResponse> => {
    try {
      await options.checkDatabase();
      return { status: "ok", database: "ok" };
    } catch {
      reply.code(503);
      return { status: "unavailable", database: "unavailable" };
    }
  });
  // Rutas estáticas compartidas por el arranque compilado y el desarrollo.
  const adminRoot = fileURLToPath(
    new URL("../../admin/dist/", import.meta.url),
  );
  const widgetRoot = fileURLToPath(
    new URL("../../../packages/booking-widget/dist/", import.meta.url),
  );
  if (existsSync(adminRoot)) {
    await app.register(staticFiles, {
      root: adminRoot,
      prefix: "/admin/",
      decorateReply: false,
    });
    app.get("/", async (_req, reply) => reply.redirect("/admin/"));
    app.get("/admin", async (_req, reply) => reply.redirect("/admin/"));
  }
  if (existsSync(widgetRoot)) {
    await app.register(staticFiles, {
      root: widgetRoot,
      prefix: "/widget/v1/",
      decorateReply: false,
    });
    app.get("/e/:slug", async (request, reply) => {
      // El slug todavía no activa tipos de cita. Es una página técnica.
      const { slug } = request.params as { slug: string };
      const safeSlug = slug.replace(/[^a-zA-Z0-9_-]/g, "");
      reply.type("text/html; charset=utf-8");
      return `<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>eGrandal · Reservas</title><script type="module" src="/widget/v1/booking.js"></script><body><eg-booking event="${safeSlug}"></eg-booking></body></html>`;
    });
  }
  app.addHook("onClose", async () => {
    await options.closeDatabase?.();
  });
  return app;
}
