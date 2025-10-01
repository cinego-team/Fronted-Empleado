import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { GlobalStatusService } from '../../../services/global-status.service';

@Component({
  selector: 'app-tipos-cliente',
  imports: [],
  templateUrl: './tipos-cliente.html',
  styleUrl: './tipos-cliente.css'
})
export class TiposCliente {
constructor(
    private router: Router,
    private readonly apiService: ApiService,
    private readonly globalStatusService: GlobalStatusService
   
  ) { }
  tiposCliente: Array<{
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
    const data = await this.apiService.getTiposCliente();
    if (data.length === 0) {
      alert('No hay tipos cliente para mostrar.');
      this.globalStatusService.setLoading(false);
      this.actualPage --;
      return;
    }
    this.tiposCliente = data;
    this.globalStatusService.setLoading(false);
  }
  selectRow(rowId: number) {
    this.selectedRow = rowId;
  }

  onNew() {
    this.router.navigate(['/registrar-tipo-cliente']);
  }

  onEdit() {
    if (this.selectedRow === null) {
      alert('Seleccioná un tipo cliente primero.');
      return;
    }
    const selectedTipoCliente = this.tiposCliente[this.selectedRow];
    this.router.navigate(['/editar-tipo-cliente', selectedTipoCliente.id]);
  }

  onDelete() {
    if (this.selectedRow === null) {
      alert('Seleccioná un tipo dni primero.');
      return;
    }
    const selectedTiposCliente = this.tiposCliente[this.selectedRow];
    if (confirm(`¿Estás seguro de que querés eliminar el tipo cliente ${selectedTiposCliente.nombre} (ID: ${selectedTiposCliente.id})?`)) {
      this.apiService.deleteTipoCliente(selectedTiposCliente.id).then(() => {
        alert('Tipo cliente eliminado correctamente.');
        this.tiposCliente.splice(this.selectedRow!, 1);
        this.selectedRow = null;
      })
    }
  }
}
