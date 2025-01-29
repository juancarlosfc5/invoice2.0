import { LitElement, html } from "lit";
import { listProduct } from "../controllers/products.js";
import { addProductToDetail } from "../controllers/detail.js";

export class ProductsComponent extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <br />
      <div class="container card">
        <div class="card-body text-center">
          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Código de Producto</label>
            <div class="col-sm-10">
              <input
                id="productIdInput"
                class="form-control text-center"
                type="text"
                value=""
                disabled
                readonly
              />
            </div>
          </div>

          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Nombre de Producto</label>
            <div class="col-sm-10">
              <select id="productList" class="form-select">
                <option value="">Elige tu producto</option>
              </select>
            </div>
          </div>

          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Valor Unitario</label>
            <div class="col-sm-4">
              <input
                id="unitaryValue"
                class="form-control text-center"
                type="text"
                value=""
                disabled
                readonly
              />
            </div>
            <label class="col-sm-2 col-form-label">Cantidad</label>
            <div class="col-sm-4">
              <input
                id="quantity"
                class="form-control"
                type="number"
                min="1"
                step="1"
              />
            </div>
          </div>

          <div class="mb-3 row">
            <button
              id="addButton"
              type="button"
              class="btn btn-outline-success col-sm-12"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    `;
  }

  firstUpdated() {
    // Llama a listProduct y pasa el componente completo
    listProduct(this);

    // Referencia a los elementos
    const productIdInput = this.shadowRoot.querySelector("#productIdInput");
    const productList = this.shadowRoot.querySelector("#productList");
    const unitaryValueInput = this.shadowRoot.querySelector("#unitaryValue");
    const quantityInput = this.shadowRoot.querySelector("#quantity");
    const addButton = this.shadowRoot.querySelector("#addButton");

    // Evento click del botón Add
    addButton.addEventListener("click", () => {
      const productId = productIdInput.value;
      const productName =
        productList.options[productList.selectedIndex]?.textContent;
      const unitaryValue = parseFloat(
        unitaryValueInput.value.replace("$", "").trim()
      );
      const quantity = parseInt(quantityInput.value, 10);

      // Validación de datos
      if (productId && productName && unitaryValue && quantity > 0) {
        const product = {
          cod: productId,
          product: productName,
          price: unitaryValue,
          quantity: quantity,
        };

        addProductToDetail(product);

        // Limpiar campos de entrada
        quantityInput.value = "";
        productList.value = "";
        productIdInput.value = "";
        unitaryValueInput.value = "";
      } else {
        alert("Por favor, seleccione un producto y una cantidad válida.");
      }
    });
  }
}

customElements.define("products-component", ProductsComponent);
