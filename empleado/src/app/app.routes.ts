import { Routes } from '@angular/router';
import { LoginComponent }    from './pages/login/login.component'
import { Register } from './pages/register/register';
import { Component } from '@angular/core';
import { RegistrarPelicula } from './pages/pantallas peliculas/registrar-pelicula/registrar-pelicula';
import { EditarPelicula } from './pages/pantallas peliculas/editar-pelicula/editar-pelicula';
import { RegistrarEstadoPeliculaComponent } from './pages/lista estado pelicula/registrar-estado-p/registrar-estado-p';
import { EditarEstadoPelicula } from './pages/lista estado pelicula/editar-estado-pelicula/editar-estado-pelicula';
import { RegistrarEntrada } from './pages/entrada/registrar-entrada/registrar-entrada';
import { EditarEntrada } from './pages/entrada/editar-entrada/editar-entrada';
import { RegistrarPromocion } from './pages/pantallas promocion/registrar-promocion/registrar-promocion';
import { EditarPromocion } from './pages/pantallas promocion/editar-promocion/editar-promocion';
import { RegistrarTipoCliente } from './pages/pantallas tipo-cliente/registrar-tipo-cliente/registrar-tipo-cliente';
import { EditarTipoCliente } from './pages/pantallas tipo-cliente/editar-tipo-cliente/editar-tipo-cliente';
import { RegistrarTipoDni } from './pages/pantallas tipo-dni/registrar-tipo-dni/registrar-tipo-dni';
import { EditarTipoDni } from './pages/pantallas tipo-dni/editar-tipo-dni/editar-tipo-dni';

import { Pelicula } from './pages/pantallas peliculas/pelicula/pelicula';
import { TiposDni } from './pages/pantallas tipo-dni/tipos-dni/tipos-dni';

import { EstadosPeliculas } from './pages/lista estado pelicula/estados-peliculas/estados-peliculas';
import { Promociones } from './pages/pantallas promocion/promociones/promociones';
import { Ventas } from './pages/ventas/ventas';
import { Entradas } from './pages/entrada/entradas/entradas';
import { PeliculaListaComponent } from './pages/pantallas peliculas/peliculas/peliculas';
import { TiposCliente } from './pages/pantallas tipo-cliente/tipos-cliente/tipos-cliente';


export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path:'registrar-empleado',component:Register},
    {path :'registrar-pelicula', component:RegistrarPelicula},
    {path:'editar-pelicula',component:EditarPelicula},
    {path:'registrar-estado-pelicula',component:RegistrarEstadoPeliculaComponent},
    {path:'editar-estado-pelicula', component:EditarEstadoPelicula},
    {path:'registrar-entrada',component:RegistrarEntrada},
    {path:'editar-entrada',component:EditarEntrada},
    {path:'registrar-promocion',component:RegistrarPromocion},
    {path:'editar-promocion',component:EditarPromocion},
    {path:'registrar-tipo-cliente',component:RegistrarTipoCliente},
    {path:'editar-tipo-cliente',component:EditarTipoCliente},
    {path:'registrar-tipo-dni',component:RegistrarTipoDni},
    {path:'editar-tipo-dni',component:EditarTipoDni},
    {path:'pelicula',component:Pelicula},
    {path:'tipos-dni',component:TiposDni},
    {path:'tipos-cliente',component:TiposCliente},
    {path:'estados-peliculas',component:EstadosPeliculas},
    {path:'promociones', component:Promociones},
    {path:'ventas',component:Ventas},
    {path:'peliculas',component:PeliculaListaComponent},
    {path:'entradas',component:Entradas},



  
    
];
