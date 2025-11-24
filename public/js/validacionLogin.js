// --- Obtener los campos del formulario ---
const email = document.getElementById("email");
const password = document.getElementById("password");

// --- Función para mostrar un mensaje de error ---
function mostrarError(input, mensaje) {
  // Primero eliminamos cualquier error anterior
    limpiarError(input);

  // Crear etiqueta <span> para el mensaje
    const error = document.createElement("span");
    error.classList.add("error-msg");
    error.textContent = "🦀 " + mensaje; // Agregar el emoji de pez

  // Insertar el mensaje después del campo
    input.insertAdjacentElement("beforebegin", error);
}

// --- Función para borrar errores ---
function limpiarError(input) {
    const error = input.parentNode.querySelector(".error-msg");
    if (error) error.remove();
}

// --- Validación del email ---
function emailEsValido(valor) {
  // Debe tener un @
    if (!valor.includes("@")) return false;

  // Debe terminar en .com o .es
    if (!valor.endsWith(".com") && !valor.endsWith(".es")) return false;

    return true;
}

// --- Validación del password ---
function passwordEsValido(valor) {
  // Variables para marcar si tiene cada tipo necesario
    let may = false;
    let min = false;
    let num = false;
    let simb = false;

  // Revisar cada carácter
    for (let c of valor) {
    if (c >= "A" && c <= "Z") may = true;
    else if (c >= "a" && c <= "z") min = true;
    else if (c >= "0" && c <= "9") num = true;
    else simb = true; // cualquier otro símbolo
}

  // La contraseña debe tener todo esto
    return valor.length >= 8 && may && min && num && simb;
}

// --- Validar formulario al hacer submit ---
document.querySelector(".auth-form").addEventListener("submit", function (e) {
    let valido = true;

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

  // Si hay errores, no enviamos el formulario
  if (!valido) e.preventDefault();
});