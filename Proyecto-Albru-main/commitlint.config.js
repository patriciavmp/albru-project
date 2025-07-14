module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'scope-case': [2, 'always', 'lower-case'],
        'scope-empty': [2, 'never'],
        'scope-enum': [
            2,
            'always',
            [
                'ui', // Cambios en la interfaz de usuario
                'leads', // Cambios en la gestión o lógica de leads
                'auth', // Autenticación y control de accesos
                'admin', // Funciones del panel de administrador
                'gtr', // Funcionalidades relacionadas al GTR
                'asesor', // Funcionalidades para los asesores
                'dashboard', // Paneles de métricas y visualizaciones
                'reports', // Generación o mejoras en reportes
                'api', // Backend/API
                'db', // Cambios en base de datos (migraciones, modelos)
                'config', // Configuraciones generales
                'docs', // Documentación
                'security', // Reglas o mejoras de seguridad
                'test', // Pruebas unitarias o de integración
            ],
        ],
        'type-enum': [
            2,
            'always',
            [
                'feat', // Nueva funcionalidad
                'fix', // Corrección de errores
                'docs', // Documentación solamente
                'style', // Cambios en estilos (CSS, formatos)
                'refactor', // Refactorización sin añadir funcionalidades
                'perf', // Mejoras de rendimiento
                'test', // Añadir/modificar pruebas
                'build', // Cambios en el sistema de construcción o dependencias
                'ci', // Cambios en integración continua
                'chore', // Tareas menores (build scripts, mantenimiento)
                'revert', // Revertir cambios anteriores
            ],
        ],
        'type-case': [2, 'always', 'lower-case'], // Asegura que el tipo esté en minúsculas
        'type-empty': [2, 'never'], // No permite tipos vacíos
        'body-leading-blank': [2, 'always'], // Requiere una línea en blanco antes del cuerpo
        'body-max-line-length': [2, 'always', 120], // Limita el cuerpo a 100 caracteres
        'header-max-length': [2, 'always', 100], // Limita el encabezado a 100 caracteres
        'subject-empty': [2, 'never'], // No permite encabezados vacíos
        'subject-case': [2, 'always', 'lower-case'], // Asegura que el encabezado esté en minúsculas
        'body-empty': [2, 'never'], // No permite cuerpos vacíos
    },
};
