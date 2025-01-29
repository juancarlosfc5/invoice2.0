import { LitElement, html } from "lit";
import { removeProductFromDetail } from "../controllers/detail.js";

export class DetailComponent extends LitElement {
  static properties = {
    details: { type: Array },
  };

  constructor() {
    super();
    this.details = []; // Inicializa los detalles como un array vacío
  }

  connectedCallback() {
    super.connectedCallback();

    // Escucha el evento 'detailUpdated' para actualizar la lista de detalles
    document.addEventListener("detailUpdated", (event) => {
      this.details = event.detail; // Asigna directamente el array recibido
    });
  }

  render() {
    return html`
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <br />
      <div class="container card">
        <div class="row text-center card-header">
          <h3>Detalle de la compra</h3>
        </div>
        <div class="card-body">
          <table id="detailTable" class="table table-striped">
            <thead>
              <tr>
                <th>Cod</th>
                <th>Nombre</th>
                <th>Valor Unitario</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              ${this.details.map(
                (product) => html`
                  <tr>
                    <td>${product.cod}</td>
                    <td>${product.product}</td>
                    <td>$${product.price}</td>
                    <td>${product.quantity}</td>
                    <td>$${product.subtotal.toFixed(2)}</td>
                    <td>
                      <button
                        class="btn btn-danger btn-sm"
                        @click="${() => this._removeProduct(product.cod)}"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                `
              )}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  _removeProduct(cod) {
    removeProductFromDetail(cod); // Llama al controlador para eliminar el producto
  }
}

customElements.define("detail-component", DetailComponent);
