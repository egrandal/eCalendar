# Validación de la entrega inicial

Verificado en el entorno de preparación, con Node 24.19.0 y pnpm 10.33.2:

- Instalación con `pnpm-lock.yaml`; repetición con `--frozen-lockfile --offline` correcta.
- Compilación de los cinco paquetes/apps correcta.
- Comprobación TypeScript correcta.
- Dos pruebas API correctas: liveness independiente de DB, readiness 503 sin filtrar secretos, readiness 200 con dependencia simulada y cierre de recursos.
- Peticiones internas Fastify a `/health`, `/ready`, `/admin/`, `/widget/v1/booking.js` y `/e/reunion-esteban`: 200. La DB en esta comprobación es una dependencia simulada.
- Migración SQL inicial generada por Drizzle; todavía no aplicada a MariaDB.
- Formato Prettier, JSON/YAML y sintaxis de scripts bash correctos.

Pendiente en WSL: construir la imagen Docker, descargar imágenes/features, abrir VS Code dentro del contenedor, aplicar migraciones, confirmar conexión **real** a MariaDB y revisar visualmente panel/widget en navegador. No hay Docker en el entorno de preparación.

No se ha instalado nada en el ordenador del usuario, creado un remoto GitHub ni desplegado el proyecto.
