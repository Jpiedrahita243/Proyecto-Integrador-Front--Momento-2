// Lee la cuenta activa y permite usar esta página solo al rol profesor.
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

if (usuarioActivo === null || usuarioActivo.rol !== "profesor") {
	window.location.href = "iniciar-sesion.html";
} else {
	// Estos selectores conectan los controles del HTML con el JavaScript.
	const formularioNota = document.querySelector("#formulario-nota");
	const campoNombreEstudiante = document.querySelector("#nombreEstudiante");
	const campoAsignatura = document.querySelector("#asignatura");
	const campoCalificacion = document.querySelector("#calificacion");
	const listaNotasTabla = document.querySelector("#lista-notas");
	const mensajeNotas = document.querySelector("#mensaje-notas");
	const botonCerrarSesion = document.querySelector("#cerrar-sesion");

	let listaNotas = JSON.parse(localStorage.getItem("notas"));
	let posicionNotaEditando = null;

	// Si todavía no hay notas guardadas, inicia con una lista vacía.
	if (listaNotas === null) {
		listaNotas = [];
	}

	// Guarda la lista completa de notas como texto JSON en localStorage.
	function guardarNotas() {
		localStorage.setItem("notas", JSON.stringify(listaNotas));
	}

	// Actualiza la tabla: limpia el contenido anterior y muestra el estado de la lista.
	function mostrarNotas() {
		listaNotasTabla.textContent = "";
		mensajeNotas.textContent = "";

		if (listaNotas.length === 0) {
			mensajeNotas.textContent = "No hay notas registradas.";
			return;
		}

		// Crea las filas, celdas y botones a partir de las notas guardadas.
		for (let posicionNota = 0; posicionNota < listaNotas.length; posicionNota++) {
			const nota = listaNotas[posicionNota];
			const fila = document.createElement("tr");
			const celdaEstudiante = document.createElement("td");
			const celdaAsignatura = document.createElement("td");
			const celdaCalificacion = document.createElement("td");
			const celdaAcciones = document.createElement("td");
			const botonEditar = document.createElement("button");
			const botonEliminar = document.createElement("button");

			celdaEstudiante.textContent = nota.nombreEstudiante;
			celdaAsignatura.textContent = nota.asignatura;
			celdaCalificacion.textContent = nota.calificacion;

			botonEditar.type = "button";
			botonEditar.textContent = "Editar";
			// Carga los datos de la nota y recuerda su posición para actualizarla luego.
			botonEditar.addEventListener("click", function () {
				const notaSeleccionada = listaNotas[posicionNota];

				campoNombreEstudiante.value = notaSeleccionada.nombreEstudiante;
				campoAsignatura.value = notaSeleccionada.asignatura;
				campoCalificacion.value = notaSeleccionada.calificacion;
				posicionNotaEditando = posicionNota;
			});

			botonEliminar.type = "button";
			botonEliminar.textContent = "Eliminar";
			// Quita la nota seleccionada, guarda la lista y vuelve a dibujar la tabla.
			botonEliminar.addEventListener("click", function () {
				listaNotas.splice(posicionNota, 1);
				posicionNotaEditando = null;
				formularioNota.reset();
				guardarNotas();
				mostrarNotas();
			});

			celdaAcciones.appendChild(botonEditar);
			celdaAcciones.appendChild(botonEliminar);
			fila.appendChild(celdaEstudiante);
			fila.appendChild(celdaAsignatura);
			fila.appendChild(celdaCalificacion);
			fila.appendChild(celdaAcciones);
			listaNotasTabla.appendChild(fila);
		}
	}

	// Al enviar el formulario, evita la recarga y toma los valores de sus campos.
	formularioNota.addEventListener("submit", function (evento) {
		evento.preventDefault();

		const nota = {
			nombreEstudiante: campoNombreEstudiante.value.trim(),
			asignatura: campoAsignatura.value.trim(),
			calificacion: Number(campoCalificacion.value)
		};

		// Agrega una nota nueva o reemplaza la que se eligió para editar.
		if (posicionNotaEditando === null) {
			listaNotas.push(nota);
		} else {
			listaNotas[posicionNotaEditando] = nota;
		}

		guardarNotas();
		formularioNota.reset();
		posicionNotaEditando = null;
		mostrarNotas();
	});

	// Cierra la sesión borrando usuarioActivo y regresa a la página principal.
	botonCerrarSesion.addEventListener("click", function () {
		localStorage.removeItem("usuarioActivo");
		window.location.href = "index.html";
	});

	// Muestra las notas guardadas al cargar la página del profesor.
	mostrarNotas();
}
