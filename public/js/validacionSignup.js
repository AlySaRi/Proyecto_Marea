// --- Obtener los campos del formulario ---
const nameInput = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");

// --- Función para mostrar un mensaje de error ---
function mostrarError(input, mensaje) {
  limpiarError(input);

  const error = document.createElement("span");
  error.classList.add("error-msg");
  error.textContent = "🦀 " + mensaje;

  input.insertAdjacentElement("beforebegin", error);
}

// --- Función para borrar errores ---
function limpiarError(input) {
  const error = input.parentNode.querySelector(".error-msg");
  if (error) error.remove();
}

// --- Validación sencilla del email ---
function emailEsValido(valor) {
  return (
    valor.includes("@") &&
    (valor.endsWith(".com") || valor.endsWith(".es"))
  );
}

// --- Validación sencilla del password ---
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

// --- Validar formulario ---
document.querySelector(".auth-form").addEventListener("submit", function (e) {
  let valido = true;

  // --- Validar Nombre ---
  if (nameInput.value.trim() === "") {
    mostrarError(nameInput, "El nombre no puede estar vacío.");
    valido = false;
  } else {
    limpiarError(nameInput);
  }

  // --- Validar Email ---
  if (email.value.trim() === "") {
    mostrarError(email, "El email no puede estar vacío.");
    valido = false;
  } else if (!emailEsValido(email.value)) {
    mostrarError(email, "El email debe contener @ y terminar en .com o .es.");
    valido = false;
  } else {
    limpiarError(email);
  }

  // --- Validar Password ---
  if (password.value.trim() === "") {
    mostrarError(password, "La contraseña no puede estar vacía.");
    valido = false;
  } else if (!passwordEsValido(password.value)) {
    mostrarError(
      password,
      "La contraseña debe tener mayúsculas, minúsculas, números, símbolo y mínimo 8 caracteres."
    );
    valido = false;
  } else {
    limpiarError(password);
  }

  if (!valido) e.preventDefault();
});