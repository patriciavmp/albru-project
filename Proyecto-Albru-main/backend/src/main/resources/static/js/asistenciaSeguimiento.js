// Datos de ejemplo, cadda registro es un día con marcas horarias
const asistencias = [
    {
        fecha: "2025-06-02",
        entrada: "08:15",
        breakInicio: "12:00",
        breakFin: "12:30",
        salida: "17:30",
        trabajador: "Patricia"
    },
    {
        fecha: "2025-06-01",
        entrada: "08:05",
        breakInicio: "12:15",
        breakFin: "12:45",
        salida: "17:45",
        trabajador: "Patricia"
    },
    {
        fecha: "2025-05-31",
        entrada: "08:10",
        breakInicio: "12:05",
        breakFin: "12:40",
        salida: "17:50",
        trabajador: "Patricia"
    }
];

// Objeto con resumen falso para gráfico (este grapfico es opcional))
const resumenFalso = {
    "2025-05-31": 3,
    "2025-06-01": 4,
    "2025-06-02": 4,
    "2025-06-03": 2,
    "2025-06-04": 3,
};

function filtrarPorDia() {
    const fechaSeleccionada = document.getElementById("filterDate").value;
    const lista = document.getElementById("asistenciaList");
    lista.innerHTML = "";

    if (!fechaSeleccionada) {
        lista.innerHTML = `<div class="text-warning">Selecciona una fecha válida.</div>`;
        return;
    }

    const filtradas = asistencias.filter(a => a.fecha === fechaSeleccionada);
    if (filtradas.length === 0) {
        lista.innerHTML = `<div class="text-info">No hay registros para esta fecha.</div>`;
        return;
    }

    filtradas.forEach(a => {
        const item = document.createElement("div");
        item.className = "list-group-item";

        item.innerHTML = `
    <div class="list-item-left">
        <strong>Trabajador:</strong> ${a.trabajador}<br />
        <strong>Fecha:</strong> ${a.fecha}
    </div>
    <div class="list-item-right">
        Entrada: ${a.entrada}<br />
        Break: ${a.breakInicio} - ${a.breakFin}<br />
        Salida: ${a.salida}
    </div>
    `;

        item.addEventListener("click", () => mostrarModal(a));

        lista.appendChild(item);
    });
}

function mostrarModal(registro) {
    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modalBody");

    modalBody.innerHTML = `
    <h5>Detalle de asistencia</h5>
    <p><strong>Trabajador:</strong> ${registro.trabajador}</p>
    <p><strong>Fecha:</strong> ${registro.fecha}</p>
    <p><strong>Entrada:</strong> ${registro.entrada}</p>
    <p><strong>Inicio de Break:</strong> ${registro.breakInicio}</p>
    <p><strong>Fin de Break:</strong> ${registro.breakFin}</p>
    <p><strong>Salida:</strong> ${registro.salida}</p>
    <p><strong>Información adicional:</strong></p>
    <div style="background-color: #2c2f3b; padding: 1rem; border-radius: 0.5rem; border: 1px solid #3a3d4a;">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed posuere, justo ut fringilla porta, nisl elit tincidunt lectus, at efficitur lacus justo vel felis.
    </div>
`;

    modal.style.display = "flex";
}

function cerrarModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

document.getElementById("modalClose").addEventListener("click", cerrarModal);

// Cerrar modal si clic fuera del contenido
document.getElementById("modal").addEventListener("click", e => {
    if (e.target === e.currentTarget) {
        cerrarModal();
    }
});

// Evento filtro
document.getElementById("btnFiltrar").addEventListener("click", filtrarPorDia);

// Render gráfico
function renderChart() {
    const ctx = document.getElementById('asistenciaChart').getContext('2d');
    const labels = Object.keys(resumenFalso);
    const data = Object.values(resumenFalso);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Cantidad de Marcas de Asistencia',
                data,
                backgroundColor: '#0d6efd',
                borderRadius: 8,
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#fff',
                        font: { weight: 'bold' }
                    }
                }
            }
        }
    });
}

window.onload = () => {
    renderChart();
};

// Función para obtener el lunes de la semana dada (para filtro semanal)
function getMonday(d) {
    d = new Date(d);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}

// Función para filtrar asistencias
function filtrarPorPeriodo() {
    const tipoFiltro = document.getElementById("filterType").value;
    const fechaInput = document.getElementById("filterDate").value;
    const lista = document.getElementById("asistenciaList");
    lista.innerHTML = "";

    if (!fechaInput) {
        lista.innerHTML = `<div class="text-warning">Selecciona una fecha válida.</div>`;
        return;
    }

    let filtradas = [];

    if (tipoFiltro === "day") {
        filtradas = asistencias.filter(a => a.fecha === fechaInput);

    } else if (tipoFiltro === "week") {
        // Calcular lunes y domingo
        const lunes = getMonday(fechaInput);
        const domingo = new Date(lunes);
        domingo.setDate(lunes.getDate() + 6);

        filtradas = asistencias.filter(a => {
            const fechaA = new Date(a.fecha);
            return fechaA >= lunes && fechaA <= domingo;
        });

    } else if (tipoFiltro === "month") {
        const [year, month] = fechaInput.split("-");
        filtradas = asistencias.filter(a => {
            const [aYear, aMonth] = a.fecha.split("-");
            return aYear === year && aMonth === month;
        });
    }

    if (filtradas.length === 0) {
        lista.innerHTML = `<div class="text-info">No hay registros para este período.</div>`;
        return;
    }

    filtradas.forEach(a => {
        const item = document.createElement("div");
        item.className = "list-group-item";

        item.innerHTML = `
        <div class="list-item-left">
        <strong>Trabajador:</strong> ${a.trabajador}<br />
        <strong>Fecha:</strong> ${a.fecha}
        </div>
        <div class="list-item-right">
        Entrada: ${a.entrada}<br />
        Break: ${a.breakInicio} - ${a.breakFin}<br />
        Salida: ${a.salida}
        </div>
    `;

        item.addEventListener("click", () => mostrarModal(a));

        lista.appendChild(item);
    });
}

// Cambiar input según filtro
document.getElementById("filterType").addEventListener("change", (e) => {
    const tipo = e.target.value;
    const inputFecha = document.getElementById("filterDate");

    if (tipo === "month") {
        inputFecha.type = "month";
    } else {
        inputFecha.type = "date";
    }
    inputFecha.value = ""; // limpiar
});

document.getElementById("btnFiltrar").addEventListener("click", filtrarPorPeriodo);