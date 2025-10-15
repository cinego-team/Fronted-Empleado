import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { GlobalStatusService } from '../../../services/global-status.service';

@Component({
  selector: 'app-estados-peliculas',
  imports: [],
  templateUrl: './estados-peliculas.html',
  styleUrl: './estados-peliculas.css'
})
export class EstadosPeliculas {
constructor(
    private router: Router,
    private readonly apiService: ApiService,
    private readonly globalStatusService: GlobalStatusService
   
  ) { }
  estadosPeliculas: Array<{
    id:number;
    nombre: string;
  }> =[];
   selectedRow: number | null = null;
  actualPage: number = 1;
  ngOnInit(): void {
    this.initialization();
  }
   async initialization(): Promise<void> {
    this.globalStatusService.setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); //Decorativo
    const data = await this.apiService.getEstadosPeliculas();
    if (data.length === 0) {
      alert('No hay estados para mostrar.');
      this.globalStatusService.setLoading(false);
      this.actualPage --;
      return;
    }
    this.estadosPeliculas = data;
    this.globalStatusService.setLoading(false);
  }
  selectRow(rowId: number) {
    this.selectedRow = rowId;
  }

  onNew() {
    this.router.navigate(['/registrar-estado-pelicula']);
  }

  /*onEdit() {
    if (this.selectedRow === null) {
      alert('Seleccioná un tipo cliente primero.');
      return;
    }
    const selectedEstado = this.estadosPeliculas[this.selectedRow];
    this.router.navigate(['/editar-estado-pelicula', selectedEstado.id]);
  }
    */
  onEdit() {
    this.router.navigate(['/editar-estado-pelicula']);
  }

  onDelete() {
    if (this.selectedRow === null) {
      alert('Seleccioná un estado primero.');
      return;
    }
    const selectedEstado = this.estadosPeliculas[this.selectedRow];
    if (confirm(`¿Estás seguro de que querés eliminar el estado ${selectedEstado.nombre} (ID: ${selectedEstado.id})?`)) {
      this.apiService.deleteTipoCliente(selectedEstado.id).then(() => {
        alert('Estado eliminado correctamente.');
        this.estadosPeliculas.splice(this.selectedRow!, 1);
        this.selectedRow = null;
      })
    }
  }
   onBack(){
    this.router.navigate(['/home']);
  }
}
