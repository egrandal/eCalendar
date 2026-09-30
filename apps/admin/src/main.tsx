import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import type { ReadinessResponse } from "@eg/shared";
import "./style.css";
function App() {
  const [status, setStatus] = useState("Comprobando conexión…");
  useEffect(() => {
    const controller = new AbortController();
    fetch("/ready", { signal: controller.signal })
      .then(async (response) => {
        const data = (await response.json()) as ReadinessResponse;
        setStatus(
          response.ok && data.database === "ok"
            ? "API y MariaDB conectadas"
            : "MariaDB no disponible",
        );
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus("API no disponible");
      });
    return () => controller.abort();
  }, []);
  return (
    <main>
      <p className="eyebrow">eGRANDAL / RESERVAS</p>
      <h1>
        Una agenda propia.
        <br />
        Empezamos por la base.
      </h1>
      <p role="status" className="status">
        {status}
      </p>
      <p>
        El entorno está preparado. La administración de citas y la conexión con
        Google Calendar se implementarán en los siguientes hitos.
      </p>
      <a href="/e/reunion-esteban">Abrir widget compilado</a>
      <p className="note">
        Esta pantalla técnica todavía no permite reservar citas.
      </p>
    </main>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
