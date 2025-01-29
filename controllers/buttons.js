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

    editBtn.addEventListener("click", () => {
        toggleButtons(true);
        showEditForm();
    });

    deleteBtn.addEventListener("click", () => {
        toggleButtons(true);
        showDeleteTable();
    });

    listBtn.addEventListener("click", () => {
        toggleButtons(true);
        showProductList();
    });

    cancelBtn.addEventListener("click", () => {
        toggleButtons(false);
        formContainer.innerHTML = ""; 
    });

    function toggleButtons(disabled) {
        createBtn.disabled = disabled;
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
        const newProduct = Object.assign(
            { id: (parseInt(lastId) + 1).toString() },  // Primero el ID
            { cod, product, price, stock, imageUrl }   // Luego las demás propiedades
        );

  
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

  document.addEventListener("DOMContentLoaded", () => {
    const buttonsContainer = document.querySelector("buttons-component");

    if (!buttonsContainer) return;

    buttonsContainer.addEventListener("click", (event) => {
        const target = event.target;
        if (target.matches(".btn-warning")) { // Botón "Editar"
            iniciarEdicion();
        }
    });

    function iniciarEdicion() {
        deshabilitarBotones(true);
        cargarProductosEnSelect();
    }

    function deshabilitarBotones(deshabilitar) {
        const botones = document.querySelector("buttons-component").shadowRoot.querySelectorAll("button");
        botones.forEach((btn) => {
            if (!btn.classList.contains("btn-secondary")) { // Mantener "Cancelar" activo
                btn.disabled = deshabilitar;
            }
        });
    }

    async function cargarProductosEnSelect() {
        try {
            const response = await fetch("http://localhost:3000/products");
            const products = await response.json();
            const productsComponent = document.querySelector("products-component");

            if (productsComponent) {
                productsComponent.mostrarSelectConProductos(products);
            }
        } catch (error) {
            console.error("Error al cargar los productos:", error);
        }
    }
});

export function editProduct(buttonsElement) {
    const shadow = buttonsElement.shadowRoot;
    const editBtn = shadow.getElementById("editBtn");
    const cancelBtn = shadow.getElementById("cancelBtn");
    const formContainer = shadow.getElementById("formContainer");

    editBtn.addEventListener("click", async () => {
        toggleButtons(true);
        await loadProductsIntoForm();
    });

    cancelBtn.addEventListener("click", () => {
        toggleButtons(false);
        formContainer.innerHTML = "";
    });

    function toggleButtons(disabled) {
        const buttons = shadow.querySelectorAll("button");
        buttons.forEach((btn) => {
            if (!btn.classList.contains("btn-secondary")) {
                btn.disabled = disabled;
            }
        });
    }

    async function loadProductsIntoForm() {
        try {
            const response = await fetch("http://localhost:3000/products");
            const products = await response.json();
            formContainer.innerHTML = createEditForm(products);
            attachConfirmEvent();
        } catch (error) {
            console.error("Error al cargar los productos:", error);
        }
    }

    function createEditForm(products) {
        return `
            <div class="container mt-3">
                <label for="productSelect">Seleccione un producto:</label>
                <select id="productSelect" class="form-control">
                    <option value="">Seleccione...</option>
                    ${products.map(p => `<option value="${p.id}">${p.product}</option>`).join('')}
                </select>
                <div id="editFields" class="mt-3"></div>
            </div>
        `;
    }

    function attachConfirmEvent() {
        const productSelect = shadow.getElementById("productSelect");
        const editFields = shadow.getElementById("editFields");

        productSelect.addEventListener("change", async () => {
            const selectedId = productSelect.value;
            if (!selectedId) return;

            try {
                const response = await fetch(`http://localhost:3000/products/${selectedId}`);
                const product = await response.json();
                editFields.innerHTML = generateEditFields(product);
                shadow.getElementById("confirmEditBtn").addEventListener("click", () => updateProduct(selectedId));
            } catch (error) {
                console.error("Error al cargar el producto:", error);
            }
        });
    }

    function generateEditFields(product) {
        return `
            <label for="editProduct">Nombre del Producto:</label>
            <input type="text" id="editProduct" class="form-control" value="${product.product}">
            <label for="editPrice">Precio:</label>
            <input type="number" id="editPrice" class="form-control" value="${product.price}">
            <label for="editStock">Stock:</label>
            <input type="number" id="editStock" class="form-control" value="${product.stock}">
            <label for="editImageUrl">URL de la Imagen:</label>
            <input type="text" id="editImageUrl" class="form-control" value="${product.imageUrl}">
            <button id="confirmEditBtn" class="btn btn-success mt-2">Confirmar</button>
        `;
    }

    async function updateProduct(id) {
        const updatedProduct = {
            product: shadow.getElementById("editProduct").value,
            price: parseFloat(shadow.getElementById("editPrice").value),
            stock: parseInt(shadow.getElementById("editStock").value),
            imageUrl: shadow.getElementById("editImageUrl").value
        };

        try {
            await fetch(`http://localhost:3000/products/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProduct)
            });
            alert("Producto actualizado exitosamente");
            toggleButtons(false);
            formContainer.innerHTML = "";
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
        }
    }
}

export function handleDeleteAction(buttonsElement) {
    const shadow = buttonsElement.shadowRoot;
    const createBtn = shadow.getElementById("createBtn");
    const editBtn = shadow.getElementById("editBtn");
    const deleteBtn = shadow.getElementById("deleteBtn");
    const listBtn = shadow.getElementById("listBtn");
    const cancelBtn = shadow.getElementById("cancelBtn");
    const formContainer = shadow.getElementById("formContainer");

    // Deshabilitar los botones excepto "Cancelar"
    createBtn.disabled = true;
    editBtn.disabled = true;
    listBtn.disabled = true;
    deleteBtn.disabled = true;
    cancelBtn.disabled = false;

    // Mostrar tabla de eliminación
    showDeleteTable(formContainer);
}

export async function showDeleteTable(container) {
    try {
        const response = await fetch("http://localhost:3000/products");
        const products = await response.json();

        if (products.length === 0) {
            container.innerHTML = "<p>No hay productos disponibles para eliminar.</p>";
            return;
        }

        container.innerHTML = `
            <table class="table mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    ${products.map(p => `
                        <tr>
                            <td>${p.id}</td>
                            <td>${p.product}</td>
                            <td>
                                <button class="btn btn-danger delete-btn" data-id="${p.id}">Eliminar</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        // Agregar eventos a los botones de eliminación
        container.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", (event) => {
                const productId = event.target.getAttribute("data-id");
                deleteProductFromServer(productId);
            });
        });

    } catch (error) {
        console.error("Error al obtener los productos:", error);
    }
}

// Función para eliminar un producto de JSON Server
export function deleteProductFromServer(id) {
    if (!id) {
        console.error("Error: ID del producto no proporcionado.");
        return;
    }

    if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        return;
    }

    fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("No se pudo eliminar el producto");
        }
        return response.json();
    })
    .then(() => {
        alert("Producto eliminado con éxito");

        // Volver a mostrar la tabla actualizada
        const buttonsElement = document.querySelector("buttons-component");
        if (buttonsElement) {
            const shadow = buttonsElement.shadowRoot;
            const formContainer = shadow.getElementById("formContainer");
            showDeleteTable(formContainer);
        }

        // Volver a habilitar los botones
        enableButtons();
    })
    .catch(error => console.error("Error al eliminar el producto:", error));
}

// Función para re-habilitar los botones después de eliminar
function enableButtons() {
    const buttonsElement = document.querySelector("buttons-component");
    if (!buttonsElement) return;
    
    const shadow = buttonsElement.shadowRoot;
    shadow.getElementById("createBtn").disabled = true;
    shadow.getElementById("editBtn").disabled = true;
    shadow.getElementById("deleteBtn").disabled = true;
    shadow.getElementById("listBtn").disabled = true;
    shadow.getElementById("cancelBtn").disabled = false;
}


export async function showProductList() {
    const buttonsElement = document.querySelector("buttons-component");
    if (!buttonsElement) return;

    const shadow = buttonsElement.shadowRoot;
    const formContainer = shadow.getElementById("formContainer");

    try {
        const response = await fetch("http://localhost:3000/products");
        const products = await response.json();

        if (products.length === 0) {
            formContainer.innerHTML = "<p>No hay productos disponibles.</p>";
            return;
        }

        // Generar las tarjetas con Bootstrap
        formContainer.innerHTML = `
            <div class="d-flex flex-wrap gap-3">
                ${products.map(p => `
                    <div class="card" style="width: 18rem;">
                        <img src="${p.imageUrl}" class="card-img-top" alt="${p.product}">
                        <div class="card-body">
                            <h5 class="card-title">${p.product}</h5>
                            <p class="card-text">$${p.price.toFixed(2)}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

    } catch (error) {
        console.error("Error al obtener los productos:", error);
        formContainer.innerHTML = "<p>Error al cargar los productos.</p>";
    }
}