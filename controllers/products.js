import { getProducts } from "../api/productsApi.js";

export async function listProduct(productsComponent) {
  // Referencias a los elementos en el Shadow DOM
  const item = productsComponent.shadowRoot.querySelector("#productList");
  const productIdInput = productsComponent.shadowRoot.querySelector("#productIdInput");
  const unitaryValueInput = productsComponent.shadowRoot.querySelector("#unitaryValue");

  try {
    // Obtener productos desde JSON Server
    const dataBase = await getProducts();

    // Agregar los productos al select de opciones
    dataBase.forEach((element) => {
      const option = document.createElement("option");
      option.value = element.id; // ID del producto
      option.textContent = element.product; // Nombre del producto
      item.appendChild(option);
    });

  // Evento para actualizar los campos código y valor unitario al seleccionar un producto
  item.addEventListener("change", (event) => {
    const selectedProductId = event.target.value; // id seleccionado
    const selectedProduct = dataBase.find((product) => product.id === selectedProductId); // Buscar producto

    // Validación del producto seleccionado
    if (selectedProduct) {
      productIdInput.value = selectedProduct.cod; // Actualizar el código
      unitaryValueInput.value = `$ ${selectedProduct.price}`; // Actualizar el precio
    } else {
      // Limpiar los campos si no hay un producto válido seleccionado
      productIdInput.value = "";
      unitaryValueInput.value = "";
    }
  });
} catch (error) {
  console.error("Error al obtener los productos:", error);
}
}