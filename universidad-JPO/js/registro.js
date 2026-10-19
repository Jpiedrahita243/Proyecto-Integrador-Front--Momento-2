// Estos selectores conectan el script con el formulario y sus campos en el HTML.
const formularioRegistro = document.querySelector("form");
const campoNombreCompleto = document.querySelector("#nombreCompleto");
const campoCorreo = document.querySelector("#correo");
const campoContrasena = document.querySelector("#contrasena");
const campoRol = document.querySelector("#rol");

function registrarCuenta(evento) {
	// Evita que el navegador recargue la página al enviar el formulario.
	evento.preventDefault();

	// Crea la cuenta con los valores escritos y normaliza el correo para compararlo.
	const nuevoUsuario = {
		nombreCompleto: campoNombreCompleto.value.trim(),
		correo: campoCorreo.value.trim().toLowerCase(),
		contrasena: campoContrasena.value,
		rol: campoRol.value
	};

	// Lee la lista de cuentas guardada como JSON y prepara una lista vacía si aún no existe.
	let listaUsuarios = JSON.parse(localStorage.getItem("usuarios"));

	if (listaUsuarios === null) {
		listaUsuarios = [];
	}

	// Compara los correos sin distinguir mayúsculas para evitar cuentas duplicadas.
	for (const usuario of listaUsuarios) {
		if (usuario.correo.toLowerCase() === nuevoUsuario.correo) {
			alert("Ya existe una cuenta con ese correo.");
			return;
		}
	}

	// Agrega la cuenta y guarda la lista completa en localStorage.
	listaUsuarios.push(nuevoUsuario);
	localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));

	// Confirma el registro y lleva al usuario a la página de inicio de sesión.
	alert("Cuenta creada correctamente.");
	window.location.href = "iniciar-sesion.html";
}

// Ejecuta el registro cuando se envía el formulario.
formularioRegistro.addEventListener("submit", registrarCuenta);
