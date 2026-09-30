import { LitElement, css, html } from "lit";
import type { HealthResponse } from "@eg/shared";
// El módulo compilado permite descubrir el origen correcto cuando se embebe.
const defaultApiBase = new URL(import.meta.url).origin;
export class EgBooking extends LitElement {
  static properties = {
    event: { type: String },
    apiBase: { type: String, attribute: "api-base" },
    message: { state: true },
  };
  declare event: string;
  declare apiBase: string;
  declare message: string;
  private controller?: AbortController;
  constructor() {
    super();
    this.event = "reunion-esteban";
    this.apiBase = defaultApiBase;
    this.message = "Comprobando API…";
  }
  static styles = css`
    :host {
      display: block;
      color: var(--booking-text, #15342d);
      font-family: var(--booking-font-family, system-ui, sans-serif);
    }
    article {
      background: var(--booking-background, #f2f5f0);
      border-radius: var(--booking-radius, 16px);
      padding: 28px;
      max-width: 540px;
      margin: 24px auto;
    }
    h2 {
      color: var(--booking-primary, #176c55);
    }
    p {
      line-height: 1.6;
    }
  `;
  connectedCallback() {
    super.connectedCallback();
    void this.check();
  }
  disconnectedCallback() {
    this.controller?.abort();
    super.disconnectedCallback();
  }
  private async check() {
    this.controller?.abort();
    this.controller = new AbortController();
    try {
      const response = await fetch(new URL("/health", this.apiBase), {
        signal: this.controller.signal,
      });
      const data = (await response.json()) as HealthResponse;
      if (!response.ok || data.status !== "ok")
        throw new Error("API unavailable");
      this.message = "Widget conectado a la API";
      this.dispatchEvent(
        new CustomEvent("booking:loaded", {
          bubbles: true,
          composed: true,
          detail: { event: this.event },
        }),
      );
    } catch {
      if (!this.controller.signal.aborted)
        this.message = "No se ha podido conectar con la API";
    }
  }
  render() {
    return html`<article part="container">
      <h2 part="title">Reservas eGrandal</h2>
      <p role="status">${this.message}</p>
      <p>Base del Web Component para <strong>${this.event}</strong>.</p>
      <p>Las reservas todavía no están disponibles.</p>
    </article>`;
  }
}
if (!customElements.get("eg-booking"))
  customElements.define("eg-booking", EgBooking);
