export const config = {
    APIPromocionesUrls: {
        baseUrl: 'https://apigateway-v5pv.onrender.com',

        // Días
        getDias: '/microservicio-promociones/dia/admin/all',
        getDiaById: (id: number) => `/microservicio-promociones/dia/admin/${id}`,
        registrarDia: '/microservicio-promociones/dia/admin/new',
        actualizarDiaById: (id: number) => `/microservicio-promociones/dia/admin/${id}`,
        eliminarDiaById: (id: number) => `/microservicio-promociones/dia/admin/${id}`,

        // Promociones
        getPromociones: '/microservicio-promociones/promocion/admin/all',
        getPromocionById: (id: number) => `/microservicio-promociones/promocion/admin/${id}`,

        createPromocion: '/microservicio-promociones/promocion/admin/new',
        updatePromocion: (id: number) => `/microservicio-promociones/promocion/admin/${id}`,
        deletePromocion: (id: number) => `/microservicio-promociones/promocion/admin/${id}`,
        verificarPromocionById: (id: number) =>
            `/microservicio-promociones/promocion/verificar-promocion/${id}`,
    },

    APIFuncionesUrls: {
        baseUrl: 'https://apigateway-v5pv.onrender.com',
        //formato
        findOneAdmin: (id: number) => `microservicio-funciones-y-salas/formato/admin/${id}`,
        findAllAdmin: 'microservicio-funciones-y-salas/formato/admin/all',
        create: 'microservicio-funciones-y-salas/formato/admin/new',
        update: (id: number) => `microservicio-funciones-y-salas/formato/admin/${id}`,
        findOneFormatoForPut: (id: number) => `microservicio-funciones-y-salas/formato/admin/${id}`,
        //funcion
        getFunciones: '/microservicio-funciones-y-salas/funcion/admin/all',
        getFuncById: (id: number) => `/microservicio-funciones-y-salas/funcion/admin/${id}`,
        createFuncionAdmin: '/microservicio-funciones-y-salas/funcion/admin/new',
        updateFuncionAdmin: (id: number) => `/microservicio-funciones-y-salas/funcion/admin/edit/${id}`,
        //salas
        getAllSalas: 'microservicio-funciones-y-salas/salas/admin/all',
        getSalas: 'microservicio-funciones-y-salas/salas/admin/selec',
        createSalas: 'microservicio-funciones-y-salas/salas/admin/new',
        getSalaById: (id: number) => `microservicio-funciones-y-salas/salas/admin/${id}`,
        updateSala: (id: number) => `microservicio-funciones-y-salas/salas/admin/${id}`,
        deleteSalaById: (id: number) => `microservicio-funciones-y-salas/salas/admin/${id}`,
        //idioma
        getIdiomaById: (id: number) => `microservicio-funciones-y-salas/idioma/admin/${id}`,
        getIdiomas: 'microservicio-funciones-y-salas/idioma/admin/all',
        createIdioma: 'microservicio-funciones-y-salas/idioma/admin/new',
        updateIdioma: (id: number) => `microservicio-funciones-y-salas/idioma/admin/${id}`,
    },
    APIUsuariosUrls: {
        baseUrl: 'https://apigateway-v5pv.onrender.com',
        register: 'microservicio-usuarios/usuario/admin/register/empleado',
        login: 'microservicio-usuarios/usuario/login',
        //rol
        getAllRoles: 'microservicio-usuarios/roles/admin/all',
        getRolById: (id: number) => `microservicio-usuarios/roles/${id}`,
        //tipo cliente
        getTipoClienteById: (id: number) => `microservicio-usuarios/tipo-cliente/admin/${id}`,
        getTiposClientes: 'microservicio-usuarios/tipo-cliente/admin/all',
        createTipoCliente: 'microservicio-usuarios/tipo-cliente/admin/new',
        updateTipoCliente: (id: number) => `microservicio-usuarios/tipo-cliente/admin/${id}`,
        refreshToken: 'microservicio-usuarios/refresh-token',
        getDatosEmpleado: 'microservicio-usuarios/usuario/datos-empleado',
    },
    APIPeliculasUrls: {
        baseUrl: 'https://apigateway-v5pv.onrender.com',

        getPeliculaByIdForAdmin: (id: number) => `/microservicio-peliculas/pelicula/admin/${id}`,
        getPeliculas: '/microservicio-peliculas/pelicula/admin/all',
        createPelicula: '/microservicio-peliculas/pelicula/admin/new',
        updatePelicula: (id: number) => `/microservicio-peliculas/pelicula/admin/${id}`,
        getPeliculasPAraSelec: '/microservicio-peliculas/pelicula/admin/selec',

        // genero
        getGeneroById: (id: number) => `/microservicio-peliculas/genero/admin/${id}`,
        getGeneros: '/microservicio-peliculas/genero/admin/all',
        createGenero: '/microservicio-peliculas/genero/admin/new',
        updateGenero: (id: number) => `/microservicio-peliculas/genero/admin/${id}`,

        // clasificacion
        getClasificacionById: (id: number) => `/microservicio-peliculas/clasificacion/admin/${id}`,
        getClasificaciones: '/microservicio-peliculas/clasificacion/admin/all',
        createClasificacion: '/microservicio-peliculas/clasificacion/admin/new',
        updateClasificacion: (id: number) => `/microservicio-peliculas/clasificacion/admin/${id}`,
        deleteClasificacionById: (id: number) => `/microservicio-peliculas/clasificacion/admin/${id}`,

        // estados
        getEstadoById: (id: number) => `/microservicio-peliculas/estado-pelicula/admin/${id}`,
        getEstados: '/microservicio-peliculas/estado-pelicula/admin/all',
        createEstado: '/microservicio-peliculas/estado-pelicula/admin/new',
        updateEstado: (id: number) => `/microservicio-peliculas/estado-pelicula/admin/${id}`,
    },

    APIVentasUrls: {
        baseUrl: 'https://apigateway-v5pv.onrender.com',
        getVentas: 'microservicio-ventas/venta/admin/all',
        getHorariosMasElegidosMesActual:
            'microservicio-ventas/venta/admin/reportes/entradas-por-dia-semana/actual',
        getEntradasPorDiaSemanaMesActual:
            'microservicio-ventas/venta/admin/reportes/horarios-mas-elegidos/actual',
        getPeliculasPorRangoTrimestral:
            'microservicio-ventas/venta/admin/reportes/peliculas-por-rango-trimestral',
    },
};
