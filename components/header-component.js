import { LitElement, html } from 'lit';
import { validateHeaderInputs } from '../controllers/header.js';

export class HeaderComponent extends LitElement {

  constructor() {
    super();
    this.id = Date.now().toString(16).toUpperCase(); // Generación del ID único
  }

  render() {
    return html`
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
      <div class="container text-center card">
        <div class="row align-items-start card-header">
          <h3>Apple Store - No. Factura</h3>
          <div class="col">
            <input id="invoiceID" class="form-control text-center" type="text" .value="${this.id}" aria-label="Disabled input example" disabled readonly>
          </div>
        </div>
        <div class="card-body">
          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">No. Id</label>
            <div class="col-sm-10">
              <input class="form-control" id="idClient" />
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Nombres</label>
            <div class="col-sm-4">
              <input class="form-control" id="nameClient" />
            </div>
            <label class="col-sm-2 col-form-label">Apellidos</label>
            <div class="col-sm-4">
              <input class="form-control" id="lastNameClient" />
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Dirección</label>
            <div class="col-sm-10">
              <input class="form-control" id="direction" />
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
              <input class="form-control" id="email" type="email" />
            </div>
          </div>
        </div>
      </div>
    `;
  }

  firstUpdated() {
    // Validación al momento de interactuar con el componente
    this.shadowRoot.addEventListener('input', () => {
      validateHeaderInputs(this.shadowRoot);
    });
  }
}

customElements.define('header-component', HeaderComponent);