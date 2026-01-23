import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { Register } from './pages/register/register';
import { RegistrarPelicula } from './pages/pantallas peliculas/registrar-pelicula/registrar-pelicula';
import { EditPeliculaComponent } from './pages/pantallas peliculas/editar-pelicula/editar-pelicula';
import { RegistrarEstadoPeliculaComponent } from './pages/lista estado pelicula/registrar-estado-p/registrar-estado-p';
import { EditarEstadoPelicula } from './pages/lista estado pelicula/editar-estado-pelicula/editar-estado-pelicula';

import { RegistrarPromocion } from './pages/pantallas promocion/registrar-promocion/registrar-promocion';
import { EditarPromocion } from './pages/pantallas promocion/editar-promocion/editar-promocion';
import { RegistrarTipoCliente } from './pages/pantallas tipo-cliente/registrar-tipo-cliente/registrar-tipo-cliente';
import { EditarTipoCliente } from './pages/pantallas tipo-cliente/editar-tipo-cliente/editar-tipo-cliente';

import { EstadosPeliculas } from './pages/lista estado pelicula/estados-peliculas/estados-peliculas';
import { Promociones } from './pages/pantallas promocion/promociones/promociones';
import { Ventas } from './pages/ventas/ventas';
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

import { Principal } from './pages/principal/principal';
import { ListaFuncion } from './pages/funcion/lista-funcion/lista-funcion';
import { RegistrarFuncion } from './pages/funcion/registrar-funcion/registrar-funcion';
import { EditarFuncion } from './pages/funcion/editar-funcion/editar-funcion';
import { Pelicula } from './pages/pantallas peliculas/pelicula/pelicula';
import { Home } from './pages/home/home';
import { Reportes } from './pages/reportes/reportes';
import { ListaSala } from './pages/sala/lista-sala/lista-sala';
import { RegistrarSala } from './pages/sala/registrar-sala/registrar-sala';
import { EditarsalaComponent } from './pages/sala/editar-sala/editar-sala';
import { ListaFormatoComponent } from './pages/formato/lista-formato/lista-formato';
import { RegistrarFormato } from './pages/formato/registrar-formato/registrar-formato';
import { EditarFormatoComponent } from './pages/formato/editar-formato/editar-formato';
import { MiUsuarioComponent } from './pages/miUsuario/mi-usuario';

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // login

  { path: 'principal', component: Home }, //pantalla principal
  { path: 'home', component: Principal }, //menu principal administrar
  { path: 'registrar/empleado', component: Register },
  { path: 'reportes', component: Reportes },

  //estados peliculas
  { path: 'estado-pelicula/registrar', component: RegistrarEstadoPeliculaComponent },
  { path: 'estado-pelicula/editar/:id', component: EditarEstadoPelicula },
  { path: 'estado-pelicula/lista', component: EstadosPeliculas },
  //peliculas
  { path: 'pelicula/registrar', component: RegistrarPelicula },
  { path: 'pelicula/editar/:id', component: EditPeliculaComponent },
  { path: 'pelicula/lista', component: Pelicula },
  //promociones
  { path: 'promocion/registrar', component: RegistrarPromocion },
  { path: 'promocion/editar/:id', component: EditarPromocion },
  { path: 'promocion/lista', component: Promociones },
  //tipos cliente
  { path: 'tipo-cliente/registrar', component: RegistrarTipoCliente },
  { path: 'tipo-cliente/editar/:id', component: EditarTipoCliente },
  { path: 'tipo-cliente/lista', component: TiposCliente },

  { path: 'ventas', component: Ventas },

  { path: 'genero/lista', component: ListaGeneroComponent },
  { path: 'genero/registrar', component: RegistrarGeneroComponent },
  { path: 'genero/editar/:id', component: EditarGeneroComponent },

  { path: 'idioma/lista', component: ListaIdiomaComponent },
  { path: 'idioma/registrar', component: RegistrarIdiomaComponent },
  { path: 'idioma/editar/:id', component: EditarIdiomaComponent },

  { path: 'clasificacion/lista', component: ListaClasificacionComponent },
  { path: 'clasificacion/registrar', component: RegistrarClasificacionComponent },
  { path: 'clasificacion/editar/:id', component: EditarClasificacionComponent },
  { path: 'funcion/lista', component: ListaFuncion },
  { path: 'funcion/registrar', component: RegistrarFuncion },
  { path: 'funcion/editar/:id', component: EditarFuncion },
  { path: 'sala/lista', component: ListaSala },
  { path: 'sala/registrar', component: RegistrarSala },
  { path: 'sala/editar/:id', component: EditarsalaComponent },
  { path: 'formato/lista', component: ListaFormatoComponent },
  { path: 'formato/registrar', component: RegistrarFormato },
  { path: 'formato/editar/:id', component: EditarFormatoComponent },
  { path: 'mi-usuario', component: MiUsuarioComponent },
  { path: '**', redirectTo: 'login' }, // cualquier ruta desconocida redirige al principal
];
