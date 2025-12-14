export const config = {
  APIPromocionesUrls: {
    baseUrl: 'http://localhost:3000',
    //dia
    getDiaById: (id: number) => `/dias/${id}`,
    getDias: '/dias/',
    createDia: '/dias/new',
    updateDia: (id: number) => `/dias/${id}`,
    //promocion
    getPromocionById: (id: number) => `/promocion/${id}`,
    getPromociones: '/promociones/',
    createPromocion: '/promociones/nueva-promocion',
    updatePromocion: (id: number) => `/promocion/${id}`,
  },
  APIFuncionesUrls: {
    baseUrl: 'http://localhost:3000',
    //formato
    findOne: (id: number) => `/formato/${id}`,
    findAll: '/formatos/',
    create: '/formatos/',
    update: (id: number) => `/formato/${id}`,
    //funcion
    getFunciones: '/funciones/',
    getFuncById: (id: number) => `/funcion/${id}`,
    createFuncion: '/funcion/nueva-funcion',
    updateFuncion: (id: number) => `/funcion/${id}`,
    //salas
    getAllSalas: '/salas/',
    getSalas: 'admin/salas/',
    createSalas: '/salas/new',
    getSalaById: (id: number) => `/salas/${id}`,
    updateSala: (id: number) => `/salas/${id}`,
  },
  APIUsuariosUrls: {
    baseUrl: 'http://localhost:3000/microservicio-usuarios',
    register: '/usuario/register',
    login: '/usuario/login',
    //permiso
    getPermisoById: (id: number) => `/permisos/${id}`,
    getPermisos: '/permisos/',
    createPermiso: '/permisos/new',
    updatePermiso: (id: number) => `/permisos/${id}`,
    //rol
    getAllRoles: '/roles/',
    getRolById: (id: number) => `/roles/${id}`,
    createRol: '/roles/new',
    updateRol: (id: number) => `/roles/${id}`,
    //tipo cliente
    getTipoClienteById: (id: number) => `/tipos-clientes/${id}`,
    getTiposClientes: '/tipos-clientes/',
    createTipoCliente: '/tipos-clientes/new',
    updateTipoCliente: (id: number) => `/tipos-clientes/${id}`,
  },
  APIPeliculasUrls: {
    baseUrl: 'http://localhost:3000/microservicio-peliculas',
    getPeliculaByIdForAdmin: (id: number) => `/pelicula/${id}`,
    getPeliculas: '/peliculas',
    createPelicula: '/pelicula/new',
    updatePelicula: (id: number) => `/pelicula/${id}`,
    //idioma
    getIdiomaById: (id: number) => `/idioma/${id}`,
    getIdiomas: '/idiomas',
    createIdioma: '/idioma/new',
    updateIdioma: (id: number) => `/idioma/${id}`,
    //genero
    getGeneroById: (id: number) => `/genero/${id}`,
    getGeneros: '/generos',
    createGenero: '/genero/new',
    updateGenero: (id: number) => `/genero/${id}`,
    //clasificacion
    getClasificacionById: (id: number) => `/clasificacion/${id}`,
    getClasificaciones: '/clasificaciones',
    createClasificacion: '/clasificacion/new',
    updateClasificacion: (id: number) => `/clasificacion/${id}`,
    //estados
    getEstadoById: (id: number) => `/estado-pelicula/${id}`,
    getEstados: '/estados-pelicula',
    createEstado: '/estado-pelicula/new',
    updateEstado: (id: number) => `/estado-pelicula/${id}`,
  },
  APIVentasUrls: {
    baseUrl: 'http://localhost:3000',
    getVentas: '/venta/',
    getHorariosMasElegidosMesActual: '/venta/reportes/horarios-mas-elegidos/actual',
    getEntradasPorDiaSemanaMesActual: '/venta/reportes/entradas-por-dia-semana/actual',
  },
};
