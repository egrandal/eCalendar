# eCalendar

Base local para sustituir la reserva embebida de Koalendar en egrandal.pro.
Nombre provisional del proyecto. Esta entrega prepara el entorno: **todavía no reserva citas ni conecta con Google**.

## Arranque en WSL

Requisitos en Windows/WSL: Docker Desktop funcionando con integración para tu distribución WSL, VS Code con WSL y Dev Containers. Node, pnpm y MariaDB se instalan dentro del contenedor.

Guarda y descomprime `eCalendar.zip` en el sistema de archivos Linux, dejando esta estructura: `~/projects/eCalendar/.devcontainer/devcontainer.json`. Evita `/mnt/c` para el repositorio y sus dependencias.

Desde la terminal WSL:

```bash
cd ~/projects/eCalendar
docker version
docker compose version
code .
```

En VS Code, ejecuta **Dev Containers: Reopen in Container**. El primer arranque construye la imagen, espera a MariaDB, crea `.env` si no existe, instala con el lockfile y compila los paquetes. Si falla, consulta el log; los errores no se ocultan.

En una terminal **dentro del contenedor**:

```bash
pnpm db:migrate
pnpm dev
```

Abre:

| URL                                     | Qué comprueba                                      |
| --------------------------------------- | -------------------------------------------------- |
| http://localhost:5173/admin/            | Pantalla técnica React y disponibilidad de MariaDB |
| http://localhost:5174/                  | Web Component Lit con recarga en desarrollo        |
| http://localhost:3000/health            | Proceso API vivo; no comprueba MariaDB             |
| http://localhost:3000/ready             | Conexión real a MariaDB; 503 si no está disponible |
| http://localhost:3000/e/reunion-esteban | Página técnica con el widget compilado             |

El panel debe mostrar **API y MariaDB conectadas**. El widget debe mostrar **Widget conectado a la API**.

Los cambios en el widget se ven en vivo en el puerto 5174. La página `/e/...` usa su última compilación: ejecuta `pnpm build` para actualizarla. Los paquetes compartidos y de base de datos también requieren compilar tras modificarlos.

## Git y credenciales

Las credenciales de Codex y GitHub CLI se conservan en volúmenes dedicados a este proyecto; no se copian automáticamente desde otros contenedores. La extensión Codex está instalada y puede requerir iniciar sesión la primera vez.

Si GitHub CLI no tiene sesión, dentro del contenedor:

```bash
gh auth login --hostname github.com --git-protocol https --web
gh auth setup-git
```

La identidad Git puede heredarse de WSL mediante VS Code. Comprueba que esté configurada antes de hacer commits:

```bash
git config user.name
git config user.email
```

Si faltan, configura tus valores reales. No hay repositorio remoto creado ni submódulos en esta entrega. Para iniciar Git local, desde WSL:

```bash
git init -b main
git add .
```

## Estructura

```text
apps/api/                    Fastify, health/readiness y archivos compilados
apps/admin/                  React + Vite, pantalla técnica
packages/booking-widget/     Lit, Shadow DOM y prueba independiente
packages/shared/             Contratos TypeScript
packages/database/           Drizzle, mysql2, esquema y migraciones
.devcontainer/               Node 24, pnpm 10.33.2, MariaDB 11.4
docs/                        Arquitectura y tareas siguientes
```

## Comandos

```bash
pnpm check          # Compilación, tipos y pruebas API
pnpm format:check   # Formato
pnpm db:generate    # Generar migración después de cambiar el esquema
pnpm db:migrate     # Aplicar migraciones pendientes
pnpm build
pnpm start          # Un proceso Fastify: /admin, /widget/v1, /e, health/ready
```

Detén `pnpm dev` antes de `pnpm start`; ambos utilizan el puerto 3000. El arranque compilado sirve React y Lit sin servidores Vite.

La tabla inicial `booking_pages` está vacía y no se consulta desde las interfaces; su migración es el primer punto de partida del modelo, pendiente de ampliación.

## Persistencia y parada

Cerrar VS Code detiene los servicios del proyecto. MariaDB, pnpm y las credenciales conservan sus volúmenes. No se monta el socket Docker dentro del contenedor. MariaDB no publica puertos al ordenador ni a internet.

Para detener explícitamente desde **WSL**, en la raíz del proyecto:

```bash
docker compose -f .devcontainer/compose.yaml down
```

`down` conserva los volúmenes; **no añadas `-v`** salvo que quieras borrar datos y credenciales. Para reconstruir después de cambiar Dockerfile/configuración usa **Dev Containers: Rebuild Container**. No hace falta reconstruir por cambios de código.

## Alcance de esta entrega

Implementado: entorno, instalación reproducible con lockfile, API, conexión DB, migración inicial, UI técnica, widget real y compilación integrada.

Pendiente: autenticación, disponibilidad, reservas, Google OAuth/Calendar, email, cancelación/reprogramación, SDK popup e iframe dedicado. Consulta `docs/ROADMAP.md`.

**Configuración exclusivamente de desarrollo.** Las contraseñas de MariaDB del Compose son locales; este Compose no es un despliegue de producción. La pantalla técnica no tiene autenticación y no debe publicarse como administración real.

## Referencias del entorno

Revisadas las configuraciones actuales en la rama predeterminada de:

- https://github.com/egrandal/simple-invest-control : workspace `/workspace`, usuario `vscode`, persistencia de Codex/GitHub y arranque con permisos corregidos.
- https://github.com/egrandal/subscriptions : Dev Container, GitHub CLI y persistencia de credenciales.
- https://github.com/egrandal/egrandal-portfolio : monorepo Node y pnpm 10.33.2.

Se emplea Node 24 LTS para el proyecto nuevo: https://nodejs.org/en/about/previous-releases . MariaDB 11.4 es una rama de soporte prolongado: https://mariadb.org/about/ .

Las etiquetas Docker fijan la rama para recibir parches; las dependencias npm quedan fijadas y bloqueadas en `pnpm-lock.yaml`. No son imágenes bloqueadas por digest.
