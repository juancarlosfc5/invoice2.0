import { LitElement, html, css } from "lit";
import { setupNavbar } from "../controllers/navbar.js";

export class NavbarComponent extends LitElement {
  static styles = css`
    .navbar {
      background-color: black !important;
    }
    .navbar .nav-link, 
    .navbar .navbar-brand {
      color: white !important;
    }
    .navbar .nav-link:hover {
      color: #f8f9fa !important;
    }
  `;

  firstUpdated() {
    setupNavbar(this);
  }

  render() {
    return html`
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img src="src/campus.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top" />
            Invoice 2.0
          </a>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="#" data-verocultar='["c"]'>Vender</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" data-verocultar='["ct"]'>Productos</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define("navbar-component", NavbarComponent);
