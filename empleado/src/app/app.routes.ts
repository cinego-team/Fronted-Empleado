import { Routes } from '@angular/router';
import { RegistrarGeneroComponent } from './Pages/Genero/RegistrarGenero/registrar-genero/registrar-genero';
import { EditarGeneroComponent } from './Pages/Genero/EditarGenero/editar-genero/editar-genero';
import { ListaGeneroComponent } from './Pages/Genero/ListaGenero/lista-genero/lista-genero';
import { RegistrarIdiomaComponent } from './Pages/Idioma/RegistrarIdioma/registrar-idioma/registrar-idioma';
import { EditarIdiomaComponent } from './Pages/Idioma/EditarIdioma/editar-idioma/editar-idioma';
import { ListaIdiomaComponent } from './Pages/Idioma/ListaIdioma/lista-idioma/lista-idioma';
import { RegistrarFilaComponent } from './Pages/Fila/RegistrarFila/registrar-fila/registrar-fila';
import { ListaFilaComponent } from './Pages/Fila/ListaFila/lista-fila/lista-fila';
import { EditarFilaComponent } from './Pages/Fila/EditarFila/editar-fila/editar-fila';
import { RegistrarClasificacionComponent } from './Pages/Clasificacion/RegistrarClasificacion/registar-clasificacion/registrar-clasificacion';
import { ListaClasificacionComponent } from './Pages/Clasificacion/ListaClasificacion/lista-clasificacion/lista-clasificacion';
import { EditarClasificacionComponent } from './Pages/Clasificacion/EditarClasificacion/editar-clasificacion/editar-clasificacion';
import { RegistrarDiaComponent } from './Pages/Dia/RegistrarDia/registrar-dia/registrar-dia';
import { ListaDiaComponent } from './Pages/Dia/ListaDia/lista-dia/lista-dia';
import { EditarDiaComponent } from './Pages/Dia/EditarDia/editar-dia/editar-dia';
import { RegistrarPermisoComponent } from './Pages/Permiso/RegistrarPermiso/registrar-permiso/registrar-permiso';
import { ListaPermisoComponent } from './Pages/Permiso/ListaPermiso/lista-permiso/lista-permiso';
import { EditarPermisoComponent } from './Pages/Permiso/EditarPermiso/editar-permiso/editar-permiso';
import { RegistrarRolComponent } from './Pages/Rol/RegistrarRol/registrar-rol/registrar-rol';
import { ListaRolComponent } from './Pages/Rol/ListaRol/lista-rol/lista-rol';
import { EditarRolComponent } from './Pages/Rol/EditarRol/editar-rol/editar-rol';
import { RegistrarButacaComponent } from './Pages/Butaca/RegistrarButaca/registrar-butaca/registrar-butaca';
import { EditarButacaComponent } from './Pages/Butaca/EditarButaca/editar-butaca/editar-butaca';
import { ButacaComponent } from './Pages/Butaca/Butaca/butaca/butaca';


export const routes: Routes = [
  { path: '', redirectTo: 'genero/lista', pathMatch: 'full' },
  { path: 'genero/lista',     component: ListaGeneroComponent },
  { path: 'genero/registrar', component: RegistrarGeneroComponent },
  { path: 'genero/editar', component: EditarGeneroComponent },

  { path: '', redirectTo: 'idioma/lista', pathMatch: 'full' },
  { path: 'idioma/lista',     component: ListaIdiomaComponent },
  { path: 'idioma/registrar', component: RegistrarIdiomaComponent },
  { path: 'idioma/editar', component: EditarIdiomaComponent },

  { path: '', redirectTo: 'fila/lista', pathMatch: 'full' },
  { path: 'fila/lista',     component: ListaFilaComponent },
  { path: 'fila/registrar', component: RegistrarFilaComponent },
  { path: 'fila/editar', component: EditarFilaComponent },
  
  { path: '', redirectTo: 'clasificacion/lista', pathMatch: 'full' },
  { path: 'clasificacion/lista',     component: ListaClasificacionComponent },
  { path: 'clasificacion/registrar', component: RegistrarClasificacionComponent },
  { path: 'clasificacion/editar', component: EditarClasificacionComponent },

  { path: '', redirectTo: 'dia/lista', pathMatch: 'full' },
  { path: 'dia/lista',     component: ListaDiaComponent },
  { path: 'dia/registrar', component: RegistrarDiaComponent },
  { path: 'dia/editar', component: EditarDiaComponent },

  { path: '', redirectTo: 'permiso/lista', pathMatch: 'full' },
  { path: 'permiso/lista',     component: ListaPermisoComponent },
  { path: 'permiso/registrar', component: RegistrarPermisoComponent },
  { path: 'permiso/editar', component: EditarPermisoComponent },
  
  { path: '', redirectTo: 'rol/lista', pathMatch: 'full' },
  { path: 'rol/lista',     component: ListaRolComponent },
  { path: 'rol/registrar', component: RegistrarRolComponent },
  { path: 'rol/editar', component: EditarRolComponent },
  
  { path: '', redirectTo: 'Butaca/butaca', pathMatch: 'full' },
  { path: 'butaca/registrar', component: RegistrarButacaComponent },
  { path: 'butaca/editar', component: EditarButacaComponent },
  { path: 'Butaca/butaca', component: ButacaComponent },

  { path: '**', redirectTo: 'genero/lista' },

];
