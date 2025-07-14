// Estado de la aplicación
const state = {
    currentTime: new Date(),
    startTime: '--:--',
    endTime: '--:--',
    breaks: [],
    activeBreak: null,
    attendanceData: [
        { day: 'Lunes', status: 'present', hours: 8 },
        { day: 'Martes', status: 'present', hours: 7.5 },
        { day: 'Miércoles', status: 'late', hours: 6 },
        { day: 'Jueves', status: 'present', hours: 8 },
        { day: 'Viernes', status: 'absent', hours: 0 },
        { day: 'Sábado', status: 'off', hours: 0 },
        { day: 'Domingo', status: 'off', hours: 0 }
    ],
    menuActive: false
};

// Función para formatear la hora
function formatTime(date) {
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
}

// Función para actualizar la hora actual
function updateCurrentTime() {
    state.currentTime = new Date();
    document.getElementById('current-hours').textContent =
        state.currentTime.getHours().toString().padStart(2, '0');
    document.getElementById('current-minutes').textContent =
        state.currentTime.getMinutes().toString().padStart(2, '0');

    // Actualizar la fecha
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    document.getElementById('current-date').textContent =
        state.currentTime.toLocaleDateString('es-ES', options);
}

// Función para manejar el inicio del día
function handleStartDay() {
    state.startTime = formatTime(new Date());
    state.endTime = '--:--';
    state.breaks = [];
    state.activeBreak = null;

    document.getElementById('start-time').textContent = state.startTime;
    document.getElementById('end-time').textContent = state.endTime;
    document.getElementById('breaks-section').innerHTML = '<h3>Descansos hoy</h3>';

    updateActionButtons();
}

// Función para manejar el final del día
function handleEndDay() {
    state.endTime = formatTime(new Date());
    document.getElementById('end-time').textContent = state.endTime;
    updateActionButtons();
}

// Función para iniciar un descanso
function handleStartBreak() {
    const newBreak = {
        start: formatTime(new Date()),
        end: ''
    };
    state.breaks.push(newBreak);
    state.activeBreak = newBreak;

    renderBreaks();
    updateActionButtons();
}

// Función para finalizar un descanso
function handleEndBreak() {
    if (state.activeBreak) {
        state.activeBreak.end = formatTime(new Date());
        state.activeBreak = null;

        renderBreaks();
        updateActionButtons();
    }
}

// Función para renderizar los descansos
function renderBreaks() {
    const breaksSection = document.getElementById('breaks-section');
    breaksSection.innerHTML = '<h3>Descansos hoy</h3>';

    if (state.breaks.length === 0) return;

    state.breaks.forEach((brk, index) => {
        const breakItem = document.createElement('div');
        breakItem.className = 'break-item';

        const breakTime = document.createElement('span');
        breakTime.className = 'break-time';
        breakTime.textContent = `${brk.start} - ${brk.end || 'En progreso'}`;

        const breakDuration = document.createElement('span');
        breakDuration.className = 'break-duration';

        if (brk.end) {
            const startDate = new Date(`2000-01-01T${brk.start}:00`);
            const endDate = new Date(`2000-01-01T${brk.end}:00`);
            const duration = Math.floor((endDate - startDate) / 60000);
            breakDuration.textContent = `${duration} min`;
        }

        breakItem.appendChild(breakTime);
        breakItem.appendChild(breakDuration);
        breaksSection.appendChild(breakItem);
    });
}

// Función para actualizar los botones de acción
function updateActionButtons() {
    const actionButtons = document.getElementById('action-buttons');

    if (state.startTime === '--:--') {
        actionButtons.innerHTML = `
                    <button class="btn-start" onclick="handleStartDay()">
                        <ion-icon name="time-outline"></ion-icon> Marcar Entrada
                    </button>
                `;
    } else if (state.endTime === '--:--') {
        if (!state.activeBreak) {
            actionButtons.innerHTML = `
                        <button class="btn-break" onclick="handleStartBreak()">
                            <ion-icon name="cafe-outline"></ion-icon> Iniciar Descanso
                        </button>
                        <button class="btn-end" onclick="handleEndDay()">
                            <ion-icon name="exit-outline"></ion-icon> Marcar Salida
                        </button>
                    `;
        } else {
            actionButtons.innerHTML = `
                        <button class="btn-break" onclick="handleEndBreak()">
                            <ion-icon name="cafe-outline"></ion-icon> Terminar Descanso
                        </button>
                        <button class="btn-end" onclick="handleEndDay()">
                            <ion-icon name="exit-outline"></ion-icon> Marcar Salida
                        </button>
                    `;
        }
    } else {
        actionButtons.innerHTML = `
                    <div class="day-completed">
                        <ion-icon name="checkmark-circle-outline"></ion-icon>
                        <span>Jornada completada</span>
                    </div>
                `;
    }
}

// Función para limpiar el menú activo al cerrar sesión
function clearActiveMenu() {
    sessionStorage.removeItem('activeMenu');
}

// Estado del menú
const states = {
    menuActive: false
};

// Función para alternar el menú lateral
function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.querySelector('.menuToggle');
    const container = document.querySelector('.container');

    states.menuActive = !states.menuActive;

    if (states.menuActive) {
        sidebar.classList.add('active');
        menuToggle.classList.add('active');
        if (container) container.classList.add('menu-active');
    } else {
        sidebar.classList.remove('active');
        menuToggle.classList.remove('active');
        if (container) container.classList.remove('menu-active');
    }
}

// Cierra el menú si se hace clic fuera de él
document.addEventListener('click', function (event) {
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.querySelector('.menuToggle');

    const clickInsideSidebar = sidebar.contains(event.target);
    const clickOnToggle = menuToggle.contains(event.target);

    if (states.menuActive && !clickInsideSidebar && !clickOnToggle) {
        toggleMenu(); // cierra el menú
    }
});

// Función para cambiar el menú activo
function setActiveMenu(menuId) {
    document.querySelectorAll('.Menulist li').forEach(item => {
        item.classList.remove('active');
    });

    const activeItem = document.getElementById(menuId);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

// Función para detectar la ruta actual
function detectActiveMenu() {
    const path = window.location.pathname;
    const exactPath = path.split('?')[0];

    // Limpiar storage si estamos en la raíz
    if (exactPath === '/user') {
        sessionStorage.removeItem('activeMenu');
    }

    // Mapeo de rutas
    const routeMap = {
        '/user': 'menu-inicio',
        '/user/registro': 'menu-registro',
        '/user/asistenciaSeguimiento': 'menu-asistenciaSeguimiento',
        '/user/actividades': 'menu-actividades',
        '/user/perfil': 'menu-perfil',
        '/user/admin': 'menu-crear-usuario',
        '/user/ayudaAdmin': 'ayudaAdmin',
        '/user/ayudaAsesor': 'ayudaAsesor',
        '/user/leads': 'menu-leads',

        '/login': null // Limpiar al cerrar sesión
    };

    // Buscar coincidencia exacta
    if (routeMap[exactPath] !== undefined) {
        return setActiveMenu(routeMap[exactPath] || 'menu-inicio');
    }

    // Coincidencias parciales
    if (path.startsWith('/user/registro')) {
        setActiveMenu('menu-registro');
    } else if (path.startsWith('/user/asistenciaSeguimiento')) {
        setActiveMenu('menu-seguimiento');
    } else if (path.startsWith('/user/actividades')) {
        setActiveMenu('menu-actividades');
    } else if (path.startsWith('/user/perfil')) {
        setActiveMenu('menu-perfil');
    } else if (path.startsWith('/user/admin')) {
        setActiveMenu('menu-crear-usuario');
    } else if (path.startsWith('/user/ayudaAdmin')) {
        setActiveMenu('ayudaAdmin');
    } else if (path.startsWith('/user/ayudaAsesor')) {
        setActiveMenu('ayudaAsesor');
    } else if (path.startsWith('/user/leads')) {
        setActiveMenu('menu-leads');
    } else {
        setActiveMenu('menu-inicio');
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Configurar el menú activo
    detectActiveMenu();

    // Maneja el clics en el menú
    document.querySelectorAll('.Menulist li a').forEach(link => {
        link.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }

            const menuItem = this.closest('li');
            setActiveMenu(menuItem.id);

            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });

    // Manejar cierre de sesión
    const logoutLink = document.querySelector('a[th:href="@{/login}"]');
    if (logoutLink) {
        logoutLink.addEventListener('click', function () {
            clearActiveMenu();
        });
    }
});