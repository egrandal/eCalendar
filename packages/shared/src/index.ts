export interface HealthResponse {
  status: "ok";
  service: "ecalendar";
}
export interface ReadinessResponse {
  status: "ok" | "unavailable";
  database: "ok" | "unavailable";
}
