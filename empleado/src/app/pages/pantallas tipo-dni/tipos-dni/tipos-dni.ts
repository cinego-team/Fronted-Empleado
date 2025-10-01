import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { GlobalStatusService } from '../../../services/global-status.service';

@Component({
  selector: 'app-tipos-dni',
  imports: [],
  templateUrl: './tipos-dni.html',
  styleUrl: './tipos-dni.css'
})
export class TiposDni {
constructor(
    private router: Router,
    private readonly apiService: ApiService,
    private readonly globalStatusService: GlobalStatusService
   
  ) { }
  tiposDni: Array<{
    id:number;
    denominacion: string;
  }> =[];
   selectedRow: number | null = null;
  actualPage: number = 1;
  ngOnInit(): void {
    this.initialization();
  }
   async initialization(): Promise<void> {
    this.globalStatusService.setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); //Decorativo
    const data = await this.apiService.getTiposDni();
    if (data.length === 0) {
      alert('No hay tipos dni para mostrar.');
      this.globalStatusService.setLoading(false);
      this.actualPage --;
      return;
    }
    this.tiposDni = data;
    this.globalStatusService.setLoading(false);
  }
  selectRow(rowId: number) {
    this.selectedRow = rowId;
  }

  onNew() {
    this.router.navigate(['/registrar-tipo-dni']);
  }

  onEdit() {
    if (this.selectedRow === null) {
      alert('Seleccioná un tipo dni primero.');
      return;
    }
    const selectedTipoDni = this.tiposDni[this.selectedRow];
    this.router.navigate(['/editar-tipo-dni', selectedTipoDni.id]);
  }

  onDelete() {
    if (this.selectedRow === null) {
      alert('Seleccioná un tipo dni primero.');
      return;
    }
    const selectedTipoDni = this.tiposDni[this.selectedRow];
    if (confirm(`¿Estás seguro de que querés eliminar el tipo dni ${selectedTipoDni.denominacion} (ID: ${selectedTipoDni.id})?`)) {
      this.apiService.deleteTipoDni(selectedTipoDni.id).then(() => {
        alert('Tipo dni eliminado correctamente.');
        this.tiposDni.splice(this.selectedRow!, 1);
        this.selectedRow = null;
      })
    }
  }
}

