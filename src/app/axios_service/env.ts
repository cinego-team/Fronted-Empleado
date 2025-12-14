export const config = {
  APIPromocionesUrls: {
    baseUrl: 'http://localhost:3000',
    //dia
    getDiaById: (id: number) => `microservicio-promociones/dias/${id}`,
    getDias: 'microservicio-promociones/dias/',
    createDia: 'microservicio-promociones/dias/new',
    updateDia: (id: number) => `microservicio-promociones/dias/${id}`,
    //promocion
    getPromocionById: (id: number) => `microservicio-promociones/promocion/${id}`,
    getPromociones: 'microservicio-promociones/promociones/',
    createPromocion: 'microservicio-promociones/promociones/nueva-promocion',
    updatePromocion: (id: number) => `microservicio-promociones/promocion/${id}`,
  },
  APIFuncionesUrls: {
    baseUrl: 'http://localhost:3000',
    //formato
    findOne: (id: number) => `microservicio-funciones-y-salas/formato/${id}`,
    findAll: 'microservicio-funciones-y-salas/formatos/',
    create: 'microservicio-funciones-y-salas/formatos/new',
    update: (id: number) => `microservicio-funciones-y-salas/formato/${id}`,
    //funcion
    getFunciones: 'microservicio-funciones-y-salas/funciones/',
    getFuncById: (id: number) => `microservicio-funciones-y-salas/funcion/${id}`,
    createFuncion: 'microservicio-funciones-y-salas/funciones/new/funcion/nueva-funcion',
    updateFuncion: (id: number) => `microservicio-funciones-y-salas/funcion/${id}`,
    //salas
    getAllSalas: 'microservicio-funciones-y-salas/salas/',
    getSalas: 'microservicio-funciones-y-salas/admin/salas/',
    createSalas: 'microservicio-funciones-y-salas/salas/new',
    getSalaById: (id: number) => `microservicio-funciones-y-salas/sala/${id}`,
    updateSala: (id: number) => `microservicio-funciones-y-salas/sala/${id}`,
  },
  APIUsuariosUrls: {
    baseUrl: 'http://localhost:3000/microservicio-usuarios',
    register: 'microservicio-usuarios/usuario/register',
    login: 'microservicio-usuarios/usuario/login',
    //permiso
    getPermisoById: (id: number) => `microservicio-usuarios/permisos/${id}`,
    getPermisos: 'microservicio-usuarios/permisos/',
    createPermiso: 'microservicio-usuarios/permisos/new',
    updatePermiso: (id: number) => `/permisos/${id}`,
    //rol
    getAllRoles: 'microservicio-usuarios/roles/',
    getRolById: (id: number) => `microservicio-usuarios/roles/${id}`,
    createRol: 'microservicio-usuarios/roles/new',
    updateRol: (id: number) => `microservicio-usuarios/roles/${id}`,
    //tipo cliente
    getTipoClienteById: (id: number) => `microservicio-usuarios/tipos-clientes/${id}`,
    getTiposClientes: 'microservicio-usuarios/tipos-clientes/',
    createTipoCliente: 'microservicio-usuarios/tipos-clientes/new',
    updateTipoCliente: (id: number) => `microservicio-usuarios/tipos-clientes/${id}`,
    refreshToken: 'microservicio-usuarios/refresh-token',
  },
  APIPeliculasUrls: {
    baseUrl: 'http://localhost:3000/microservicio-peliculas',
    getPeliculaByIdForAdmin: (id: number) => `microservicio-peliculas/pelicula/${id}`,
    getPeliculas: 'microservicio-peliculas/peliculas',
    createPelicula: 'microservicio-peliculas/pelicula/new',
    updatePelicula: (id: number) => `microservicio-peliculas/pelicula/${id}`,
    //idioma
    getIdiomaById: (id: number) => `microservicio-peliculas/idioma/${id}`,
    getIdiomas: 'microservicio-peliculas/idiomas',
    createIdioma: 'microservicio-peliculas/idioma/new',
    updateIdioma: (id: number) => `microservicio-peliculas/idioma/${id}`,
    //genero
    getGeneroById: (id: number) => `microservicio-peliculas/genero/${id}`,
    getGeneros: 'microservicio-peliculas/generos',
    createGenero: 'microservicio-peliculas/genero/new',
    updateGenero: (id: number) => `microservicio-peliculas/genero/${id}`,
    //clasificacion
    getClasificacionById: (id: number) => `microservicio-peliculas/clasificacion/${id}`,
    getClasificaciones: 'microservicio-peliculas/clasificaciones',
    createClasificacion: 'microservicio-peliculas/clasificacion/new',
    updateClasificacion: (id: number) => `microservicio-peliculas/clasificacion/${id}`,
    //estados
    getEstadoById: (id: number) => `microservicio-peliculas/estado-pelicula/${id}`,
    getEstados: 'microservicio-peliculas/estados-pelicula',
    createEstado: 'microservicio-peliculas/estado-pelicula/new',
    updateEstado: (id: number) => `microservicio-peliculas/estado-pelicula/${id}`,
  },
  APIVentasUrls: {
    baseUrl: 'http://localhost:3000',
    getVentas: 'microservicio-ventas/ventas',
    getHorariosMasElegidosMesActual:
      'microservicio-ventas/venta/reportes/horarios-mas-elegidos/actual',
    getEntradasPorDiaSemanaMesActual: '/venta/reportes/entradas-por-dia-semana/actual',
  },
};
