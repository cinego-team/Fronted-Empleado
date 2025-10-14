import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component'
import { Register } from './pages/register/register';
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
import { ListaGeneroComponent } from './pages/Genero/ListaGenero/lista-genero/lista-genero';
import { RegistrarGeneroComponent } from './pages/Genero/RegistrarGenero/registrar-genero/registrar-genero';
import { EditarGeneroComponent } from './pages/Genero/EditarGenero/editar-genero/editar-genero';
import { ListaIdiomaComponent } from './pages/Idioma/ListaIdioma/lista-idioma/lista-idioma';
import { RegistrarIdiomaComponent } from './pages/Idioma/RegistrarIdioma/registrar-idioma/registrar-idioma';
import { EditarIdiomaComponent } from './pages/Idioma/EditarIdioma/editar-idioma/editar-idioma';
import { ListaFilaComponent } from './pages/Fila/ListaFila/lista-fila/lista-fila';
import { RegistrarFilaComponent } from './pages/Fila/RegistrarFila/registrar-fila/registrar-fila';
import { EditarFilaComponent } from './pages/Fila/EditarFila/editar-fila/editar-fila';
import { ListaClasificacionComponent } from './pages/Clasificacion/ListaClasificacion/lista-clasificacion/lista-clasificacion';
import { RegistrarClasificacionComponent } from './pages/Clasificacion/RegistrarClasificacion/registar-clasificacion/registrar-clasificacion';
import { EditarClasificacionComponent } from './pages/Clasificacion/EditarClasificacion/editar-clasificacion/editar-clasificacion';
import { ListaDiaComponent } from './pages/Dia/ListaDia/lista-dia/lista-dia';
import { RegistrarDiaComponent } from './pages/Dia/RegistrarDia/registrar-dia/registrar-dia';
import { EditarDiaComponent } from './pages/Dia/EditarDia/editar-dia/editar-dia';
import { ListaPermisoComponent } from './pages/Permiso/ListaPermiso/lista-permiso/lista-permiso';
import { RegistrarPermisoComponent } from './pages/Permiso/RegistrarPermiso/registrar-permiso/registrar-permiso';
import { EditarPermisoComponent } from './pages/Permiso/EditarPermiso/editar-permiso/editar-permiso';
import { ListaRolComponent } from './pages/Rol/ListaRol/lista-rol/lista-rol';
import { RegistrarRolComponent } from './pages/Rol/RegistrarRol/registrar-rol/registrar-rol';
import { EditarRolComponent } from './pages/Rol/EditarRol/editar-rol/editar-rol';
import { RegistrarButacaComponent } from './pages/Butaca/RegistrarButaca/registrar-butaca/registrar-butaca';
import { EditarButacaComponent } from './pages/Butaca/EditarButaca/editar-butaca/editar-butaca';
import { ButacaComponent } from './pages/Butaca/Butaca/butaca/butaca';
import { Principal } from './pages/principal/principal';

export const routes: Routes = [
  { path: '', component: LoginComponent }, // 👈 esta será tu pantalla principal
  
  { path: 'home', component: Principal },
  { path:'registrar-empleado', component:Register },
  { path :'registrar-pelicula', component:RegistrarPelicula },
  { path:'editar-pelicula', component:EditarPelicula },
  { path:'registrar-estado-pelicula', component:RegistrarEstadoPeliculaComponent },
  { path:'editar-estado-pelicula', component:EditarEstadoPelicula },
  { path:'registrar-entrada', component:RegistrarEntrada },
  { path:'editar-entrada', component:EditarEntrada },
  { path:'registrar-promocion', component:RegistrarPromocion },
  { path:'editar-promocion', component:EditarPromocion },
  { path:'registrar-tipo-cliente', component:RegistrarTipoCliente },
  { path:'editar-tipo-cliente', component:EditarTipoCliente },
  { path:'registrar-tipo-dni', component:RegistrarTipoDni },
  { path:'editar-tipo-dni', component:EditarTipoDni },
  { path:'pelicula', component:Pelicula },
  { path:'tipos-dni', component:TiposDni },
  { path:'tipos-cliente', component:TiposCliente },
  { path:'estados-peliculas', component:EstadosPeliculas },
  { path:'promociones', component:Promociones },
  { path:'ventas', component:Ventas },
  { path:'peliculas', component:PeliculaListaComponent },
  { path:'entradas', component:Entradas },

  { path: 'genero/lista', component: ListaGeneroComponent },
  { path: 'genero/registrar', component: RegistrarGeneroComponent },
  { path: 'genero/editar', component: EditarGeneroComponent },

  { path: 'idioma/lista', component: ListaIdiomaComponent },
  { path: 'idioma/registrar', component: RegistrarIdiomaComponent },
  { path: 'idioma/editar', component: EditarIdiomaComponent },

  { path: 'fila/lista', component: ListaFilaComponent },
  { path: 'fila/registrar', component: RegistrarFilaComponent },
  { path: 'fila/editar', component: EditarFilaComponent },
  
  { path: 'clasificacion/lista', component: ListaClasificacionComponent },
  { path: 'clasificacion/registrar', component: RegistrarClasificacionComponent },
  { path: 'clasificacion/editar', component: EditarClasificacionComponent },

  { path: 'dia/lista', component: ListaDiaComponent },
  { path: 'dia/registrar', component: RegistrarDiaComponent },
  { path: 'dia/editar', component: EditarDiaComponent },

  { path: 'permiso/lista', component: ListaPermisoComponent },
  { path: 'permiso/registrar', component: RegistrarPermisoComponent },
  { path: 'permiso/editar', component: EditarPermisoComponent },
  
  { path: 'rol/lista', component: ListaRolComponent },
  { path: 'rol/registrar', component: RegistrarRolComponent },
  { path: 'rol/editar', component: EditarRolComponent },
  
  { path: 'butaca/registrar', component: RegistrarButacaComponent },
  { path: 'butaca/editar', component: EditarButacaComponent },
  { path: 'butaca/butaca', component: ButacaComponent },

  { path: '**', redirectTo: '' } // cualquier ruta desconocida redirige al principal
];
