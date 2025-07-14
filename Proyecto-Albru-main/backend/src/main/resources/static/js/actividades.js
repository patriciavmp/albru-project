const ventas = [
    { id: 1, trabajador: "Patricia Mejia", fecha: "2025-06-01", info: "Reunión con cliente importante" },
    { id: 2, trabajador: "Patricia Mejia", fecha: "2025-06-02", info: "Presentación de propuesta comercial" },
    { id: 3, trabajador: "Patricia Mejia", fecha: "2025-06-06", info: "Seguimiento de leads calificados" },
    { id: 4, trabajador: "Patricia Mejia", fecha: "2025-05-15", info: "Capacitación de equipo de ventas" },
    { id: 5, trabajador: "Patricia Mejia", fecha: "2025-06-02", info: "Análisis de mercado competitivo" },
    { id: 6, trabajador: "Patricia Mejia", fecha: "2025-05-30", info: "Elaboración de informe mensual" },
    { id: 7, trabajador: "Patricia Mejia", fecha: "2025-06-01", info: "Desarrollo de estrategia comercial" }
];

function filtrarVentas() {
    const tipo = document.getElementById("filterType").value;
    const fechaBase = new Date(document.getElementById("filterDate").value);
    const container = document.getElementById("ventasList");
    container.innerHTML = "";

    if (!fechaBase || isNaN(fechaBase.getTime())) {
        container.innerHTML = `<div class="alert mt-3">Selecciona una fecha válida.</div>`;
        return;
    }

    const ventasFiltradas = ventas.filter(v => {
        const fechaVenta = new Date(v.fecha);

        if (tipo === "dia") {
            return fechaVenta.toDateString() === fechaBase.toDateString();
        } else if (tipo === "semana") {
            const inicioSemana = new Date(fechaBase);
            inicioSemana.setDate(fechaBase.getDate() - fechaBase.getDay());
            const finSemana = new Date(inicioSemana);
            finSemana.setDate(inicioSemana.getDate() + 6);
            return fechaVenta >= inicioSemana && fechaVenta <= finSemana;
        } else if (tipo === "mes") {
            return (
                fechaVenta.getMonth() === fechaBase.getMonth() &&
                fechaVenta.getFullYear() === fechaBase.getFullYear()
            );
        }

        return false;
    });

    if (ventasFiltradas.length === 0) {
        container.innerHTML = `<div class="alert mt-3">No se encontraron actividades.</div>`;
        return;
    }

    ventasFiltradas.forEach((v, i) => {
        const delay = i * 0.1;
        const card = document.createElement("div");
        card.className = "venta-card";
        card.style.animationDelay = `${delay}s`;
        card.innerHTML = `
        <h5>Actividad #${v.id}</h5>
        <p><strong>Fecha:</strong> ${v.fecha}</p>
        <p><strong>Descripción:</strong> ${v.info.substring(0, 50)}...</p>
    `;

        card.addEventListener("click", () => {
            mostrarModal(v);
        });

        container.appendChild(card);
    });
}

function mostrarModal(venta) {
    document.getElementById("ventaId").textContent = venta.id;
    document.getElementById("ventaTrabajador").textContent = venta.trabajador;
    document.getElementById("ventaFecha").textContent = venta.fecha;

    const modal = new bootstrap.Modal(document.getElementById("previewModal"));
    modal.show();
}