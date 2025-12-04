
// --- Obtener los campos del formulario ---
const form = document.querySelector(".auth-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// --- Función para mostrar un mensaje de error ---
function mostrarError(input, mensaje) {
  limpiarError(input);

  const error = document.createElement("span");
  error.classList.add("error-msg");
  error.textContent = "🦀 " + mensaje; // Mantener emoji

  input.insertAdjacentElement("beforebegin", error);
}

// --- Función para borrar errores ---
function limpiarError(input) {
  const prev = input.previousElementSibling;
  if (prev && prev.classList.contains("error-msg")) prev.remove();
}

// --- Validación sencilla del email ---
function emailEsValido(valor) {
  return (
    valor.includes("@") &&
    (valor.endsWith(".com") || valor.endsWith(".es"))
  );
}

// --- Validación de password ---
function passwordEsValido(valor) {
  let may = false,
      min = false,
      num = false,
      simb = false;

  for (let c of valor) {
    if (c >= "A" && c <= "Z") may = true;
    else if (c >= "a" && c <= "z") min = true;
    else if (c >= "0" && c <= "9") num = true;
    else simb = true;
  }

  return valor.length >= 8 && may && min && num && simb;
}

// --- Validar formulario solo si existe ---
if (form) {
  form.addEventListener("submit", function (e) {
    let valido = true;

    // Validar nombre solo si existe
    if (nameInput) {
      if (nameInput.value.trim() === "") {
        mostrarError(nameInput, "El nombre no puede estar vacío.");
        valido = false;
      } else limpiarError(nameInput);
    }

    // Validar email solo si existe
    if (emailInput) {
      if (emailInput.value.trim() === "") {
        mostrarError(emailInput, "El email no puede estar vacío.");
        valido = false;
      } else if (!emailEsValido(emailInput.value)) {
        mostrarError(emailInput, "El email debe contener @ y terminar en .com o .es.");
        valido = false;
      } else limpiarError(emailInput);
    }

    // Validar password solo si existe
    if (passwordInput) {
      if (passwordInput.value.trim() === "") {
        mostrarError(passwordInput, "La contraseña no puede estar vacía.");
        valido = false;
      } else if (!passwordEsValido(passwordInput.value)) {
        mostrarError(
          passwordInput,
          "La contraseña debe tener mayúsculas, minúsculas, números, símbolo y mínimo 8 caracteres."
        );
        valido = false;
      } else limpiarError(passwordInput);
    }

    // Si hay errores, prevenir envío
    if (!valido) e.preventDefault();
  });
}
