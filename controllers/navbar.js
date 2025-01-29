export function setupNavbar(navbarElement) {
    // Ocultar todos los componentes excepto el navbar al cargar la página
    const invoiceComponents = document.querySelectorAll(
        "header-component, products-component, detail-component, summary-component, buttons-component"
    );
    invoiceComponents.forEach(component => component.style.display = "none");

    // Escuchar los clics dentro del Shadow DOM
    navbarElement.shadowRoot.addEventListener("click", (event) => {
        const target = event.target;

        if (target.matches("[data-verocultar='[\"c\"]']")) {
            mostrarFactura();
        } else if (target.matches("[data-verocultar='[\"ct\"]']")) {
            mostrarProductos();
        }
    });

    function mostrarFactura() {
        invoiceComponents.forEach(component => component.style.display = "none");
        document.querySelector("header-component").style.display = "block";
        document.querySelector("products-component").style.display = "block";
        document.querySelector("detail-component").style.display = "block";
        document.querySelector("summary-component").style.display = "block";
    }

    function mostrarProductos() {
        invoiceComponents.forEach(component => component.style.display = "none");
        document.querySelector("buttons-component").style.display = "block";
    }
}
