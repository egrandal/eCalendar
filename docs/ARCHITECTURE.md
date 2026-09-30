# Arquitectura inicial

Motor de reservas propio y reutilizable; primera instalación para Esteban. Implementación inicial para un único anfitrión. API independiente de WordPress/Astro, con widget Lit y administración React.

## Decisiones conservadas

- TypeScript, Fastify, React + Vite, Lit y Drizzle.
- MariaDB para el inicio local, compatible con la última propuesta de alojamiento; Plesk no es un requisito del código.
- URL prevista `citas.egrandal.pro`, sin configurar DNS ni producción ahora.
- Desarrollo en WSL mediante Dev Containers. Un contenedor de herramientas y otro de base de datos.
- Producción conceptual con una API Node y archivos estáticos compilados. La infraestructura de producción se decidirá por separado.
- Web Component principal, futura API pública, página independiente, SDK popup e iframe de respaldo.

## Límites actuales

La pantalla React y el Web Component son pruebas de conexión. No hay usuarios ni disponibilidad inventados, endpoints de reserva ni OAuth de demostración. El `event` del componente identifica el futuro tipo de cita, pero todavía no consulta `booking_pages`.

Los contratos compartidos se compilan primero. Fastify utiliza conexiones MariaDB con pool y un endpoint de readiness. La migración inicial crea una tabla vacía. La lógica de reglas y reservas se añadirá por hitos.

## Integración del widget

El archivo compilado es `/widget/v1/booking.js`. Se registra `eg-booking` con Shadow DOM, variables CSS y `part="container"`/`part="title"`. Descubre el origen de su script para consultar `/health`, que actualmente permite lectura CORS por ser un estado público sin datos personales.

```html
<script type="module" src="http://localhost:3000/widget/v1/booking.js"></script>
<eg-booking event="reunion-esteban"></eg-booking>
```

Se puede especificar `api-base` al crear el componente. Las futuras rutas públicas tendrán política de orígenes, validación y límites de abuso; los endpoints de administración no heredarán acceso público. El componente actual solo verifica conexión.

## Invariantes para el motor futuro

- El navegador no decide que una reserva es válida.
- Revalidar disponibilidad y conflictos de Google al confirmar.
- Serializar operaciones por anfitrión/intervalo con transacciones y bloqueo; una restricción única sobre hora de inicio no impide solapamientos de distinta duración.
- Manejar idempotencia y estados pendientes para las operaciones externas. No existe una transacción atómica entre MariaDB y Google Calendar.
- Instantes en UTC, reglas en zona IANA, conversión explícita y pruebas con cambios de horario de Europe/Madrid.
- Tokens Google cifrados en servidor; ninguna credencial en SDK/widget.
- No exponer contenidos de eventos para calcular disponibilidad.
- Enlaces de gestión con tokens aleatorios, almacenados con hash y sin datos personales en URL.

Estos puntos son requisitos para implementar, **no capacidades existentes**.
