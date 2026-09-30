# Reglas del proyecto

- Leer README.md y docs/ARCHITECTURE.md antes de implementar.
- Trabajar por hitos de docs/ROADMAP.md. No ampliar a SaaS/equipos ni añadir pagos sin petición.
- Mantener WSL y Dev Containers como entorno principal. No instalar herramientas en Windows para compensar problemas del contenedor.
- pnpm 10.33.2, Node 24, lockfile versionado. Ejecutar pnpm check tras cambios funcionales; pnpm format:check para formato.
- No ocultar errores de instalación/compilación con `|| true`.
- No añadir credenciales a Git. .env es local; .env.example solo valores de desarrollo o marcadores.
- Mantener separación API/administración/widget y personalización con CSS Custom Properties/parts.
- No representar disponibilidad falsa como información real.
- Cambios DB con migraciones; no sustituirlas por sincronización destructiva automática.
- Validar concurrencia, zonas horarias y fallos externos al implementar reservas.
- No borrar volúmenes Docker ni modificar otros proyectos para arreglar este.
- Documentar qué se ha comprobado y qué queda pendiente. No afirmar que Docker/WSL se ha validado si solo se han ejecutado pruebas fuera del contenedor.
