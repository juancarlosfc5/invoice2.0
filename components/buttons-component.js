import { LitElement, html, css } from "lit";
import { setupButtons } from "../controllers/buttons.js"; // Importar el controlador

export class ButtonsComponent extends LitElement {
  static styles = css`
    .container {
      margin-top: 20px;
    }
    button {
      margin: 5px;
    }
  `;

  constructor() {
    super();
  }

  firstUpdated() {
    setupButtons(this);
  }

  render() {
    return html`
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        crossorigin="anonymous"
      />
      <div class="container">
        <button id="createBtn" type="button" class="btn btn-success">Crear</button>
        <button id="editBtn" type="button" class="btn btn-warning">Editar</button>
        <button id="deleteBtn" type="button" class="btn btn-danger">Eliminar</button>
        <button id="listBtn" type="button" class="btn btn-primary">Listar</button>
        <button id="cancelBtn" type="button" class="btn btn-secondary">Cancelar</button>
      </div>
      <div id="formContainer"></div> <!-- Aquí se mostrará el formulario -->
    `;
  }
}

customElements.define("buttons-component", ButtonsComponent);
