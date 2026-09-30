# Hitos de implementación

Validar cada hito antes de ampliar el alcance.

1. **Entorno local (esta entrega):** abrir en Dev Container, migrar, arrancar; `/ready` 200 y panel/widget conectados. La validación completa del contenedor queda para WSL, ya que el entorno de preparación no dispone de Docker.
2. **Administración segura:** usuario único, sesión, cierre de sesión, validación de formularios y protección de operaciones. Criterio: nadie sin sesión puede cambiar datos.
3. **Tipos de cita y disponibilidad:** CRUD, duración, zona, horario semanal, excepciones, buffers y antelación mínima/máxima. Criterio: cálculo reproducible con reloj inyectable y pruebas de horario de verano.
4. **Google Calendar:** proyecto OAuth, permisos mínimos, cifrado de tokens, selección de calendarios, lectura de ocupaciones y tratamiento de revocaciones/fallos. Criterio: ocupado en Google nunca aparece libre; un fallo de Google no se interpreta como disponibilidad.
5. **Reserva de extremo a extremo:** formulario nombre/email, idempotencia, bloqueo de solapamientos, estados pendientes y reconciliación de evento externo. Criterio: dos solicitudes simultáneas para intervalos solapados no se confirman ambas.
6. **Email y gestión:** confirmaciones, reintentos persistentes, cancelación y reprogramación mediante enlaces seguros. Criterio: fallo de SMTP no pierde la reserva ni genera otra; gestión coherente entre DB y Google.
7. **Integración y aspecto:** flujo final Lit, accesibilidad, variables CSS/parts, standalone, popup SDK, iframe, WordPress/Astro y política CORS de API pública. Criterio: una misma reserva se completa desde las distintas integraciones sin secretos en navegador.
8. **Sustitución de Koalendar:** configurar la página real y comprobar los flujos completos; mantener Koalendar hasta que estén validados.
9. **Producción:** decidir VPS, reverse proxy/SSL, copias y restauración, secretos y despliegue versionado. Criterio: restauración probada y reinicio fiable de procesos.

Fuera del primer alcance: pagos, SMS, equipos, round-robin, recurrencias, uploads y analítica publicitaria.
