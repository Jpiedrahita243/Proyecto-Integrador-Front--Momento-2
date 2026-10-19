// Lee la cuenta activa y permite continuar solo si su rol es estudiante.
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

// Solo permite continuar si su rol es estudiante.
if (usuarioActivo === null || usuarioActivo.rol !== "estudiante") {
	window.location.href = "iniciar-sesion.html";
} else {
	// Busca en el HTML el nombre, la tabla, el mensaje y el botón de cerrar sesión ya que se van a actualizar.
	const nombreEstudiante = document.querySelector("#nombre-estudiante");
	const listaNotasTabla = document.querySelector("#lista-notas");
	const mensajeNotas = document.querySelector("#mensaje-notas");
	const botonCerrarSesion = document.querySelector("#cerrar-sesion");
	let listaNotas = JSON.parse(localStorage.getItem("notas"));

	if (listaNotas === null) {
		listaNotas = [];
	}

	// Muestra el nombre que quedo guardado en la sesion.
	nombreEstudiante.textContent = usuarioActivo.nombreCompleto;

    
    // Prepara el nombre para comparar sin mayúsculas ni espacios exteriores y filtra la lista de notas para mostrar solo las que coinciden con el nombre del estudiante.
	const nombreBuscado = usuarioActivo.nombreCompleto.trim().toLowerCase();
	const notasEstudiante = listaNotas.filter(function (nota) {
		return nota.nombreEstudiante.trim().toLowerCase() === nombreBuscado;
	});

	// Crea una fila de tabla  para cada nota y muestra solo asignatura y calificación.
	for (const nota of notasEstudiante) {
		const fila = document.createElement("tr");
		const celdaAsignatura = document.createElement("td");
		const celdaCalificacion = document.createElement("td");

		celdaAsignatura.textContent = nota.asignatura;
		celdaCalificacion.textContent = nota.calificacion;
		fila.appendChild(celdaAsignatura);
		fila.appendChild(celdaCalificacion);
		listaNotasTabla.appendChild(fila);
	}

	// Informa al estudiante cuando no encuentra notas para su nombre.
	if (notasEstudiante.length === 0) {
		mensajeNotas.textContent = "No tienes notas registradas.";
	}

	// Al cerrar sesión, borra la cuenta activa y vuelve a la página principal.
	botonCerrarSesion.addEventListener("click", function () {
		localStorage.removeItem("usuarioActivo");
		window.location.href = "index.html";
	});
}
