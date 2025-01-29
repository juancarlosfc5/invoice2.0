export function setupButtons(buttonsElement) {
    const shadow = buttonsElement.shadowRoot;
    const createBtn = shadow.getElementById("createBtn");
    const editBtn = shadow.getElementById("editBtn");
    const deleteBtn = shadow.getElementById("deleteBtn");
    const listBtn = shadow.getElementById("listBtn");
    const cancelBtn = shadow.getElementById("cancelBtn");
    const formContainer = shadow.getElementById("formContainer");
  
    createBtn.addEventListener("click", () => {
      toggleButtons(true);
      showForm();
    });
  
    cancelBtn.addEventListener("click", () => {
      toggleButtons(false);
      formContainer.innerHTML = ""; // Limpiar el formulario
    });
  
    function toggleButtons(disabled) {
      editBtn.disabled = disabled;
      deleteBtn.disabled = disabled;
      listBtn.disabled = disabled;
      cancelBtn.disabled = !disabled;
    }
  
    function showForm() {
      formContainer.innerHTML = `
        <div class="container mt-3">
          <div class="mb-2">
            <label for="cod">Código:</label>
            <input type="text" id="cod" class="form-control">
          </div>
          <div class="mb-2">
            <label for="product">Nombre del Producto:</label>
            <input type="text" id="product" class="form-control">
          </div>
          <div class="mb-2">
            <label for="price">Precio:</label>
            <input type="number" id="price" class="form-control">
          </div>
          <div class="mb-2">
            <label for="stock">Stock:</label>
            <input type="number" id="stock" class="form-control">
          </div>
          <div class="mb-2">
            <label for="imageUrl">URL de la Imagen:</label>
            <input type="text" id="imageUrl" class="form-control">
          </div>
          <button id="confirmBtn" class="btn btn-success mt-2">Confirmar</button>
        </div>
      `;
  
      shadow.getElementById("confirmBtn").addEventListener("click", saveProduct);
    }
  
    async function saveProduct() {
      const cod = shadow.getElementById("cod").value;
      const product = shadow.getElementById("product").value;
      const price = parseFloat(shadow.getElementById("price").value);
      const stock = parseInt(shadow.getElementById("stock").value);
      const imageUrl = shadow.getElementById("imageUrl").value;
  
      if (!cod || !product || isNaN(price) || isNaN(stock) || !imageUrl) {
        alert("Todos los campos son obligatorios");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:3000/products");
        const products = await response.json();
        const lastId = products.length > 0 ? products[products.length - 1].id : 0;
        const newProduct = { id: lastId + 1, cod, product, price, stock, imageUrl };
  
        await fetch("http://localhost:3000/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct),
        });
  
        alert("Producto agregado con éxito");
        toggleButtons(false);
        formContainer.innerHTML = ""; // Limpiar el formulario
      } catch (error) {
        console.error("Error al guardar el producto:", error);
      }
    }
  }
  