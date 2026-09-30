export interface HealthResponse {
  status: "ok";
  service: "egrandal-booking";
}
export interface ReadinessResponse {
  status: "ok" | "unavailable";
  database: "ok" | "unavailable";
}
