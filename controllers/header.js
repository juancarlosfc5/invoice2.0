export function validateHeaderInputs(shadowRoot) {
    const idInput = shadowRoot.querySelector("#idClient");
    const nameInput = shadowRoot.querySelector("#nameClient");
    const lastNameInput = shadowRoot.querySelector("#lastNameClient");
    const directionInput = shadowRoot.querySelector("#direction");
    const emailInput = shadowRoot.querySelector("#email");
  
    const validations = {
      id: /^\d+$/, // Solo números
      text: /^[a-zA-ZÀ-ÿ\s]+$/, // Letras y espacios (nombres y apellidos)
      direction: /^[a-zA-Z0-9\s\.,#\-]+$/, // Letras, números y algunos caracteres especiales
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Correo válido
    };
  
    function validate(input, regex) {
      const value = input.value.trim();
      const isValid = regex.test(value);
      if (!isValid) {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
      } else {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
      }
      return isValid;
    }
  
    idInput.addEventListener("input", () => validate(idInput, validations.id));
    nameInput.addEventListener("input", () => validate(nameInput, validations.text));
    lastNameInput.addEventListener("input", () => validate(lastNameInput, validations.text));
    directionInput.addEventListener("input", () => validate(directionInput, validations.direction));
    emailInput.addEventListener("input", () => validate(emailInput, validations.email));
  }
  