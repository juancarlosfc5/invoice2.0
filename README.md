# 🚀 Invoice 2.0

**Invoice 2.0** es una aplicación web diseñada para optimizar el proceso de facturación y gestión de inventario. Con una interfaz amigable e intuitiva, permite a los usuarios registrar ventas y administrar productos de manera eficiente.

## 🌐 Demo en Vivo

Prueba la aplicación en acción: [CampusInvoice](https://campusinvoice.netlify.app)

## 📌 Características Principales

### 🛒 Sección de Ventas

- **Generación de Facturas**: Crea facturas detalladas a partir de los productos seleccionados.
- **Gestión de Información del Cliente**: Permite ingresar y almacenar datos personales del comprador.
- **Selección de Productos**: Presenta una lista desplegable con todos los productos disponibles.
- **Gestión de Cantidades**: Solo se debe ingresar la cantidad deseada; el resto de la información del producto se completa automáticamente.
- **Resumen de Compra**: 
  - Muestra un listado con los productos agregados y sus respectivas cantidades.
  - Si se añade un producto que ya está en la factura, solo se actualiza su cantidad.
  - Posibilidad de eliminar productos del resumen de compra.
  
### 📦 Sección de Productos

- **Crear Producto**:
  - Permite registrar nuevos productos en el inventario.
  - El código de producto (ID) se genera automáticamente en función de la cantidad de productos en `data.json`.
- **Editar Producto**:
  - Presenta un `select` para elegir el producto a modificar.
  - Muestra los datos actuales del producto en campos editables (excepto el `ID`).
  - Permite actualizar la información del producto en la base de datos.
- **Eliminar Producto**:
  - Lista automática de productos con su ID y nombre.
  - Opción de eliminar un producto con confirmación antes de la acción.
- **Listar Productos**:
  - Visualización de los productos en tarjetas que incluyen imagen, nombre y precio.
  
### 🔄 Interacción y Navegación

- **Botón "Cancelar"**: 
  - Cuando se entra en los modos `Crear`, `Editar`, `Eliminar` o `Listar`, los demás botones se deshabilitan para evitar acciones simultáneas.
  - Permite regresar a la vista inicial y reactivar todas las opciones de gestión.
- **Navbar Dinámico**:
  - La aplicación inicia mostrando solo la barra de navegación.
  - Al hacer clic en `Vender`, se despliegan los módulos de facturación.
  - Al hacer clic en `Productos`, se muestran las opciones de gestión del inventario.

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Vite, Lit (Web Components), CSS
- **Backend**: JSON Server para la gestión de datos
- **Base de Datos**: `data.json` como almacenamiento de productos y facturas
- **Fetch API**: Para interactuar con JSON Server y actualizar datos en tiempo real