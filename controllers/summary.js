import { getInvoiceDetails } from "./detail.js";
import { postInvoice } from "../api/productsApi.js";

let facturas = JSON.parse(localStorage.getItem("facturas")) || [];

export function calculateSummary(summaryComponent) {
  document.addEventListener("detailUpdated", (event) => {
    const details = event.detail;

    // Calcula valores y actualiza las propiedades del componente
    summaryComponent.subtotal = details.reduce((acc, item) => acc + item.subtotal, 0);
    summaryComponent.iva = summaryComponent.subtotal * 0.19;
    summaryComponent.total = summaryComponent.subtotal + summaryComponent.iva;
  });
}

export async function processPayment(summaryComponent) {
  const header = getHeaderInfo();
  const detailFact = getInvoiceDetails();

  if (!header || detailFact.length === 0) {
      alert("Por favor complete todos los campos y registre productos en la factura.");
      return;
  }

  const factura = {
      nroFactura: _getInvoiceID(),
      header,
      detailFact,
      summary: {
          subtotal: summaryComponent.subtotal,
          iva: summaryComponent.iva,
          total: summaryComponent.total,
      },
  };

  try {
      const response = await postInvoice(factura);
      if (response) {
          alert("¡Factura guardada en el servidor con éxito!");
          reloadPage();
      } else {
          alert("Error al guardar la factura en el servidor.");
      }
  } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Ocurrió un error. Intente nuevamente.");
  }
}

function getHeaderInfo() {
  const headerComponent = document.querySelector("header-component")?.shadowRoot;

  if (!headerComponent) return null;

  const identificacion = headerComponent.querySelector("#idClient")?.value.trim();
  const nombres = headerComponent.querySelector("#nameClient")?.value.trim();
  const apellido = headerComponent.querySelector("#lastNameClient")?.value.trim();
  const direccion = headerComponent.querySelector("#direction")?.value.trim();
  const email = headerComponent.querySelector("#email")?.value.trim();

  if (!identificacion || !nombres || !apellido || !direccion || !email) {
    return null;
  }

  return { identificacion, nombres, apellido, direccion, email };
}

function _getInvoiceID() {
  const headerComponent = document.querySelector("header-component")?.shadowRoot;
  return headerComponent?.querySelector("#invoiceID")?.value.trim() || null;
}

export function reloadPage() {
  setTimeout(() => {
    location.reload();
  }, 500);
}
