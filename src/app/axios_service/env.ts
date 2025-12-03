export const config = {
  APIPromocionesUrls: {
    baseUrl: 'http://localhost:3005',
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
    baseUrl: 'http://localhost:3003',
    //formato
    findOne: (id: number) => `/formato/${id}`,
    findAll: '/formatos/',
    create: '/formatos/',
    update: (id: number) => `/formato/${id}`,
    //funcion
    getFunciones: '/funciones/',
    getFuncionById: (id: number) => `/funcion/${id}`,
    createFuncion: '/funcion/nueva-funcion',
    updateFuncion: (id: number) => `/funcion/${id}`,
    //salas
    getAllSalas: '/salas/',
    createSalas: '/salas/new',
    getSalaById: (id: number) => `/salas/${id}`,
    updateSala: (id: number) => `/salas/${id}`,
  },
  APIUsuariosUrls: {
    baseUrl: 'http://localhost:3004',
    register: 'usuario/register',
    login: 'usuario/login',
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
    baseUrl: 'http://localhost:3001',
    getPeliculaById: (id: number) => `/pelicula/${id}`,
    getPeliculas: '/peliculas/',
    createPelicula: '/pelicula/nueva-pelicula',
    updatePelicula: (id: number) => `/pelicula/${id}`,
    //idioma
    getIdiomaById: (id: number) => `/idiomas/${id}`,
    getIdiomas: '/idiomas/',
    createIdioma: '/idiomas/new',
    updateIdioma: (id: number) => `/idiomas/${id}`,
    //genero
    getGeneroById: (id: number) => `/generos/${id}`,
    getGeneros: '/generos/',
    createGenero: '/generos/new',
    updateGenero: (id: number) => `/generos/${id}`,
    //clasificacion
    getClasificacionById: (id: number) => `/clasificaciones/${id}`,
    getClasificaciones: '/clasificaciones/',
    createClasificacion: '/clasificaciones/new',
    updateClasificacion: (id: number) => `/clasificaciones/${id}`,
    //estados
    getEstadoById: (id: number) => `/estados/${id}`,
    getEstados: '/estados/',
    createEstado: '/estados/new',
    updateEstado: (id: number) => `/estados/${id}`,
  },
  APIVentasUrls: {
    baseUrl: 'http://localhost:3002',
    getVentas: '/venta/',
  },
};
