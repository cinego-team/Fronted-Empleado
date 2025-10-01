export const config= {
BaseUrl: 'http://localhost:3001',
urls: {
    getVentas: '/venta',
    getPeliculas:'/pelicula',
    getTiposDni:'/tipo-dni',
    getTiposCliente:'/tipo-cliente',
    getEstadosPeliculas:'/estados-peliculas',
    getPromociones:'/promocion',
    getEntradas:'/entrada',
    getVentaById: (id: number) => `/venta/${id}`,
    getPeliculaById: (id:number)=>  `/pelicula/${id}`,
    getTipoDniById: (id:number)=> `/tipo-dni/${id}`,
    getTipoClienteById: (id:number)=> `/tipo-cliente/${id}`,
    getEstadoPeliculaById: (id:number)=>`/estados-peliculas/${id}`,
    getPromocionById: (id:number)=> `/promocion/${id}`,
    getEntradaById: (id:number)=> `/entrada/${id}`
}
}
