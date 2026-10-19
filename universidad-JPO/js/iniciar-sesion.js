// Con estos selectores obtienen el formulario y los campos que se van a comprobar.
const formularioInicioSesion = document.querySelector("form");
const campoCorreo = document.querySelector("#correo");
const campoContrasena = document.querySelector("#contrasena");

function iniciarSesion(evento) {
	// Evita que cuando envie se recargue la página antes de revisar las credenciales.
	evento.preventDefault();

	// Prepara los datos ingresados y lee las cuentas guardadas durante el registro.
	const correoIngresado = campoCorreo.value.trim().toLowerCase();
	const contrasenaIngresada = campoContrasena.value;
	let listaUsuarios = JSON.parse(localStorage.getItem("usuarios"));

	if (listaUsuarios === null) {
		listaUsuarios = [];
	}

	// Busca una cuenta que coincida por correo y contraseña.
	let usuarioEncontrado = null;

	for (const usuario of listaUsuarios) {
		if (
			usuario.correo.toLowerCase() === correoIngresado &&
			usuario.contrasena === contrasenaIngresada
		) {
			usuarioEncontrado = usuario;
			break;
		}
	}

	// Si no hay coincidencia, muestra un aviso y no inicia la sesión.
	if (usuarioEncontrado === null) {
		alert("El correo o la contraseña no son correctos.");
		return;
	}

	// Guarda la cuenta que inició sesión para que las páginas de rol puedan leerla.
	localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

	// El rol de la cuenta determina cuál página se abre.
	if (usuarioEncontrado.rol === "estudiante") {
		window.location.href = "estudiante.html";
	} else if (usuarioEncontrado.rol === "profesor") {
		window.location.href = "profesor.html";
	} else {
		alert("El rol de la cuenta no es válido.");
	}
}

// Ejecuta la comprobación al enviar el formulario de inicio de sesión.
formularioInicioSesion.addEventListener("submit", iniciarSesion);
