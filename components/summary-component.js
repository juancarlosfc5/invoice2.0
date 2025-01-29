import { LitElement, html } from "lit";
import { calculateSummary, processPayment } from "../controllers/summary.js";

export class SummaryComponent extends LitElement {
  static properties = {
    subtotal: { type: Number },
    iva: { type: Number },
    total: { type: Number },
  };

  constructor() {
    super();
    this.subtotal = 0;
    this.iva = 0;
    this.total = 0;
  }

  connectedCallback() {
    super.connectedCallback();

    // Llama a la función para calcular el resumen
    calculateSummary(this);

    // Escucha eventos de actualización del detalle
    document.addEventListener("detailUpdated", (event) => {
      const details = event.detail;

      // Calcula los valores
      this.subtotal = details.reduce((acc, item) => acc + item.subtotal, 0);
      this.iva = this.subtotal * 0.19;
      this.total = this.subtotal + this.iva;
    });
  }

  render() {
    return html`
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <br />
      <div class="container card">
        <div class="row text-center card-header">
          <h3>Resumen de Factura</h3>
        </div>
        <div class="card-body">
          <div class="row mb-3">
            <label class="col-sm-4 col-form-label">Subtotal</label>
            <div class="col-sm-8">
              <input
                class="form-control text-center"
                type="text"
                .value="${this._formatCurrency(this.subtotal)}"
                disabled
                readonly
              />
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-sm-4 col-form-label">IVA (19%)</label>
            <div class="col-sm-8">
              <input
                class="form-control text-center"
                type="text"
                .value="${this._formatCurrency(this.iva)}"
                disabled
                readonly
              />
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-sm-4 col-form-label">Total</label>
            <div class="col-sm-8">
              <input
                class="form-control text-center"
                type="text"
                .value="${this._formatCurrency(this.total)}"
                disabled
                readonly
              />
            </div>
          </div>
          <div class="row">
            <button
              class="btn btn-success col-sm-12"
              @click="${this._processPayment}"
            >
              Pagar
            </button>
          </div>
        </div>
      </div>
    `;
  }

  _formatCurrency(value) {
    return `$${value.toFixed(2)}`;
  }

  _processPayment() {
    processPayment(this);
  }
}

customElements.define("summary-component", SummaryComponent);
