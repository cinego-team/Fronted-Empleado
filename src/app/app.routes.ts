import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { Register } from './pages/register/register';
import { RegistrarPelicula } from './pages/pantallas peliculas/registrar-pelicula/registrar-pelicula';
import { EditarPelicula } from './pages/pantallas peliculas/editar-pelicula/editar-pelicula';
import { RegistrarEstadoPeliculaComponent } from './pages/lista estado pelicula/registrar-estado-p/registrar-estado-p';
import { EditarEstadoPelicula } from './pages/lista estado pelicula/editar-estado-pelicula/editar-estado-pelicula';

import { RegistrarPromocion } from './pages/pantallas promocion/registrar-promocion/registrar-promocion';
import { EditarPromocion } from './pages/pantallas promocion/editar-promocion/editar-promocion';
import { RegistrarTipoCliente } from './pages/pantallas tipo-cliente/registrar-tipo-cliente/registrar-tipo-cliente';
import { EditarTipoCliente } from './pages/pantallas tipo-cliente/editar-tipo-cliente/editar-tipo-cliente';

import { EstadosPeliculas } from './pages/lista estado pelicula/estados-peliculas/estados-peliculas';
import { Promociones } from './pages/pantallas promocion/promociones/promociones';
import { Ventas } from './pages/ventas/ventas';

import { PeliculaListaComponent } from './pages/pantallas peliculas/peliculas/peliculas';
import { TiposCliente } from './pages/pantallas tipo-cliente/tipos-cliente/tipos-cliente';
import { ListaGeneroComponent } from './pages/Genero/ListaGenero/lista-genero/lista-genero';
import { RegistrarGeneroComponent } from './pages/Genero/RegistrarGenero/registrar-genero/registrar-genero';
import { EditarGeneroComponent } from './pages/Genero/EditarGenero/editar-genero/editar-genero';
import { ListaIdiomaComponent } from './pages/Idioma/ListaIdioma/lista-idioma/lista-idioma';
import { RegistrarIdiomaComponent } from './pages/Idioma/RegistrarIdioma/registrar-idioma/registrar-idioma';
import { EditarIdiomaComponent } from './pages/Idioma/EditarIdioma/editar-idioma/editar-idioma';

import { ListaClasificacionComponent } from './pages/Clasificacion/ListaClasificacion/lista-clasificacion/lista-clasificacion';
import { RegistrarClasificacionComponent } from './pages/Clasificacion/RegistrarClasificacion/registar-clasificacion/registrar-clasificacion';
import { EditarClasificacionComponent } from './pages/Clasificacion/EditarClasificacion/editar-clasificacion/editar-clasificacion';

import { ListaPermisoComponent } from './pages/Permiso/ListaPermiso/lista-permiso/lista-permiso';
import { RegistrarPermisoComponent } from './pages/Permiso/RegistrarPermiso/registrar-permiso/registrar-permiso';

import { ListaRolComponent } from './pages/Rol/ListaRol/lista-rol/lista-rol';
import { RegistrarRolComponent } from './pages/Rol/RegistrarRol/registrar-rol/registrar-rol';
import { EditarRolComponent } from './pages/Rol/EditarRol/editar-rol/editar-rol';

import { Principal } from './pages/principal/principal';
import { ListaFuncion } from './pages/funcion/lista-funcion/lista-funcion';
import { RegistrarFuncion } from './pages/funcion/registrar-funcion/registrar-funcion';
import { EditarFuncion } from './pages/funcion/editar-funcion/editar-funcion';
import { VerFuncion } from './pages/funcion/ver-funcion/ver-funcion';

export const routes: Routes = [
  { path: '', component: LoginComponent }, // login

  { path: 'home', component: Principal }, //pantalla principal
  { path: 'registrar-empleado', component: Register },

  //estados peliculas
  { path: 'estado-pelicula/registrar', component: RegistrarEstadoPeliculaComponent },
  { path: 'estado-pelicula/editar', component: EditarEstadoPelicula },
  { path: 'estado-pelicula/lista', component: EstadosPeliculas },
  //peliculas
  { path: 'pelicula/registrar', component: RegistrarPelicula },
  { path: 'pelicula/editar', component: EditarPelicula },
  { path: 'pelicula/lista', component: PeliculaListaComponent },
  //promociones
  { path: 'promocion/registrar', component: RegistrarPromocion },
  { path: 'promocion/editar', component: EditarPromocion },
  { path: 'promocion/lista', component: Promociones },
  //tipos cliente
  { path: 'tipo-cliente/registrar', component: RegistrarTipoCliente },
  { path: 'tipo-cliente/editar', component: EditarTipoCliente },

  { path: 'tipo-cliente/lista', component: TiposCliente },

  { path: 'ventas', component: Ventas },

  { path: 'genero/lista', component: ListaGeneroComponent },
  { path: 'genero/registrar', component: RegistrarGeneroComponent },
  { path: 'genero/editar', component: EditarGeneroComponent },

  { path: 'idioma/lista', component: ListaIdiomaComponent },
  { path: 'idioma/registrar', component: RegistrarIdiomaComponent },
  { path: 'idioma/editar', component: EditarIdiomaComponent },

  { path: 'clasificacion/lista', component: ListaClasificacionComponent },
  { path: 'clasificacion/registrar', component: RegistrarClasificacionComponent },
  { path: 'clasificacion/editar', component: EditarClasificacionComponent },

  { path: 'permiso/lista', component: ListaPermisoComponent },
  { path: 'permiso/registrar', component: RegistrarPermisoComponent },

  { path: 'rol/lista', component: ListaRolComponent },
  { path: 'rol/registrar', component: RegistrarRolComponent },
  { path: 'rol/editar', component: EditarRolComponent },

  { path: 'funciones', component: ListaFuncion },
  { path: 'registrar-funcion', component: RegistrarFuncion },
  { path: 'editar-funcion', component: EditarFuncion },
  { path: 'funcion', component: VerFuncion },

  { path: '**', redirectTo: '' }, // cualquier ruta desconocida redirige al principal
];
