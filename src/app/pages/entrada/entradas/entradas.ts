import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { GlobalStatusService } from '../../../services/global-status.service';

@Component({
  selector: 'app-entradas',
  imports: [],
  templateUrl: './entradas.html',
  styleUrl: './entradas.css'
})
export class Entradas {
constructor(
    private router: Router,
    private readonly apiService: ApiService,
    private readonly globalStatusService: GlobalStatusService
   
  ) { }
  entradas: Array<{
    id:number;
    codigoSeguridad: string;
  }> =[];
   selectedRow: number | null = null;
  actualPage: number = 1;
  ngOnInit(): void {
    this.initialization();
  }
   async initialization(): Promise<void> {
    this.globalStatusService.setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); //Decorativo
    const data = await this.apiService.getEntradas();
    if (data.length === 0) {
      alert('No hay entradas para mostrar.');
      this.globalStatusService.setLoading(false);
      this.actualPage --;
      return;
    }
    this.entradas = data;
    this.globalStatusService.setLoading(false);
  }
  selectRow(rowId: number) {
    this.selectedRow = rowId;
  }

  onNew() {
    this.router.navigate(['/registrar-entrada']);
  }

  /*onEdit() {
    if (this.selectedRow === null) {
      alert('Seleccioná una entrada primero.');
      return;
    }
    const selectedEntrada = this.entradas[this.selectedRow];
    this.router.navigate(['/editar-entradas', selectedEntrada.id]);
  }
    */
  onEdit() {
    this.router.navigate(['/editar-entrada']);
  }


  onDelete() {
    if (this.selectedRow === null) {
      alert('Seleccioná una entrada primero.');
      return;
    }
    const selectedEntrada = this.entradas[this.selectedRow];
    if (confirm(`¿Estás seguro de que querés eliminar el tipo dni  (ID: ${selectedEntrada.id})?`)) {
      this.apiService.deleteEntrada(selectedEntrada.id).then(() => {
        alert('Tipo dni eliminado correctamente.');
        this.entradas.splice(this.selectedRow!, 1);
        this.selectedRow = null;
      })
    }
  }
  volver(){
    this.router.navigate(['/home']);
  }
  inicio() {
    this.router.navigate(['/home']);
  }
}
