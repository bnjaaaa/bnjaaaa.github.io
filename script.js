const datosDias = {
    lunes: {
        titulo: "Lunes",
        rutinaPrincipal: "Gym: tren inferior + caminata suave de 10 minutos.",
        rutinaAlternativa: "Si no puedes ir al gym, realiza una rutina en casa de 20 minutos.",
        comidas: [
            "Desayuno: yogur con avena y fruta.",
            "Almuerzo: arroz con pollo y ensalada.",
            "Cena: tortilla de huevo con verduras."
        ],
        consejo: "No busques hacerlo perfecto, busca cumplir lo planificado de forma constante."
    },
    martes: {
        titulo: "Martes",
        rutinaPrincipal: "Gym: espalda y bíceps + estiramiento al terminar.",
        rutinaAlternativa: "Haz una rutina corta con bandas elásticas o mancuernas en casa.",
        comidas: [
            "Desayuno: pan integral con huevo.",
            "Almuerzo: carne magra con papas cocidas y ensalada.",
            "Cena: yogur alto en proteína con fruta."
        ],
        consejo: "Cumplir aunque sea un poco siempre será mejor que no hacer nada."
    },
    miercoles: {
        titulo: "Miércoles",
        rutinaPrincipal: "Ejercicio en casa: sentadillas, zancadas, plancha y jumping jacks por 25 minutos.",
        rutinaAlternativa: "Si estás muy ocupada, haz 10 minutos de movilidad y una caminata corta.",
        comidas: [
            "Desayuno: avena con plátano.",
            "Almuerzo: pollo con arroz y verduras.",
            "Cena: ensalada con atún o huevo."
        ],
        consejo: "Hoy lo importante es adaptarse al tiempo disponible sin abandonar el plan."
    },
    jueves: {
        titulo: "Jueves",
        rutinaPrincipal: "Gym: glúteos y piernas + 10 minutos de bicicleta.",
        rutinaAlternativa: "En casa puedes hacer puente de glúteos, sentadillas y patadas de glúteo.",
        comidas: [
            "Desayuno: yogur con cereal y fruta.",
            "Almuerzo: fideos con pollo y verduras.",
            "Cena: omelette con ensalada."
        ],
        consejo: "La constancia semanal vale más que un solo día perfecto."
    },
    viernes: {
        titulo: "Viernes",
        rutinaPrincipal: "Gym: tren superior completo + cardio suave.",
        rutinaAlternativa: "Haz una rutina full body corta en casa con peso corporal.",
        comidas: [
            "Desayuno: tostadas con palta y huevo.",
            "Almuerzo: arroz con carne magra y verduras.",
            "Cena: yogur o sándwich liviano con proteína."
        ],
        consejo: "Termina la semana fuerte, pero sin exigirte más de la cuenta."
    },
    sabado: {
        titulo: "Sábado",
        rutinaPrincipal: "Actividad ligera: caminata larga, bici o rutina suave de cuerpo completo.",
        rutinaAlternativa: "Haz estiramientos y movilidad si necesitas descansar.",
        comidas: [
            "Desayuno: fruta con yogur y avena.",
            "Almuerzo: proteína con ensalada y carbohidrato moderado.",
            "Cena: comida ligera y saciante."
        ],
        consejo: "Disfrutar también es parte de llevar una vida saludable."
    },
    domingo: {
        titulo: "Domingo",
        rutinaPrincipal: "Descanso activo: caminata, estiramientos o relajación.",
        rutinaAlternativa: "Si prefieres, toma el día completo de descanso.",
        comidas: [
            "Desayuno: desayuno libre pero equilibrado.",
            "Almuerzo: comida casera con buena porción de proteína.",
            "Cena: algo simple para cerrar la semana."
        ],
        consejo: "Descansar también ayuda al progreso y a la recomposición corporal."
    }
};

const botonesDias = document.querySelectorAll(".dia-card");
const tituloDia = document.getElementById("titulo-dia");
const rutinaPrincipal = document.getElementById("rutina-principal");
const rutinaAlternativa = document.getElementById("rutina-alternativa");
const comidasLista = document.getElementById("comidas-lista");
const consejoDia = document.getElementById("consejo-dia");
const btnCompletado = document.getElementById("btn-completado");
const btnReiniciar = document.getElementById("btn-reiniciar");
const textoProgreso = document.getElementById("texto-progreso");
const rellenoProgreso = document.getElementById("relleno-progreso");

let diaSeleccionado = "lunes";
let diasCompletados = JSON.parse(localStorage.getItem("diasCompletados")) || {};

function mostrarDia(dia) {
    const info = datosDias[dia];

    tituloDia.textContent = info.titulo;
    rutinaPrincipal.textContent = info.rutinaPrincipal;
    rutinaAlternativa.textContent = info.rutinaAlternativa;
    consejoDia.textContent = info.consejo;

    comidasLista.innerHTML = "";
    info.comidas.forEach(comida => {
        const li = document.createElement("li");
        li.textContent = comida;
        comidasLista.appendChild(li);
    });

    botonesDias.forEach(boton => boton.classList.remove("activo"));
    document.querySelector(`[data-dia="${dia}"]`).classList.add("activo");

    actualizarBotonCompletado(dia);
    diaSeleccionado = dia;
}

function actualizarBotonCompletado(dia) {
    if (diasCompletados[dia]) {
        btnCompletado.textContent = "Día completado ✅";
        btnCompletado.style.background = "#6c757d";
    } else {
        btnCompletado.textContent = "Marcar como completado";
        btnCompletado.style.background = "#198754";
    }
}

function actualizarProgreso() {
    const totalCompletados = Object.values(diasCompletados).filter(valor => valor).length;
    const porcentaje = (totalCompletados / 7) * 100;

    textoProgreso.textContent = `Has completado ${totalCompletados} de 7 días esta semana.`;
    rellenoProgreso.style.width = `${porcentaje}%`;
}

botonesDias.forEach(boton => {
    boton.addEventListener("click", () => {
        const dia = boton.dataset.dia;
        mostrarDia(dia);
    });
});

btnCompletado.addEventListener("click", () => {
    diasCompletados[diaSeleccionado] = !diasCompletados[diaSeleccionado];
    localStorage.setItem("diasCompletados", JSON.stringify(diasCompletados));

    actualizarBotonCompletado(diaSeleccionado);
    actualizarProgreso();
});

btnReiniciar.addEventListener("click", () => {
    const confirmar = confirm("¿Seguro que quieres reiniciar la semana? Se borrará el progreso actual.");

    if (confirmar) {
        diasCompletados = {};
        localStorage.removeItem("diasCompletados");
        actualizarBotonCompletado(diaSeleccionado);
        actualizarProgreso();
    }
});

mostrarDia("lunes");
actualizarProgreso();
