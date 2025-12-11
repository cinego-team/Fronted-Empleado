import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalStatusService } from '../../../services/global-status.service';
import { ApiServicePromociones } from '../../../services/api.service.promociones';
import { ApiServiceUsuario } from '../../../services/api.service.usuario';
@Component({
  selector: 'app-promociones',
  imports: [],
  templateUrl: './promociones.html',
  styleUrl: './promociones.css',
})
export class Promociones {
  constructor(
    private router: Router,
    private readonly apiService: ApiServicePromociones,
    private readonly globalStatusService: GlobalStatusService,
    private readonly apiService2: ApiServiceUsuario
  ) {}
  promociones: Array<{
    id: number;
    nombre: string;
    porcentajeDescuento: number;
    tipoClienteId: number;
    dia: string;
  }> = [];
  selectedRow: number | null = null;
  actualPage: number = 1;
  tiposCliente: any[] = []; // lista de {id, nombre}

  ngOnInit(): void {
    this.initialization();
  }

  async initialization(): Promise<void> {
    this.globalStatusService.setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500)); //Decorativo
    this.tiposCliente = await this.apiService2.getAllTiposClientes();
    const data = await this.apiService.getPromociones();
    if (data.length === 0) {
      alert('No hay promociones para mostrar.');
      this.globalStatusService.setLoading(false);
      this.actualPage--;
      return;
    }
    this.promociones = data;
    this.globalStatusService.setLoading(false);
  }

  selectRow(rowId: number) {
    this.selectedRow = rowId;
  }
  //funcion para conseguir el nombre de las promociones por el ID
  getTipoClienteNombre(id: number): string {
    const tipo = this.tiposCliente.find((t) => t.id === id);
    return tipo ? tipo.nombre : 'Desconocido';
  }
  onNew() {
    this.router.navigate(['/promocion/registrar']);
  }

  onEdit() {
    if (this.selectedRow === null) {
      alert('Seleccioná un promocion primero.');
      return;
    }
    const selectedPromocion = this.promociones[this.selectedRow];
    this.router.navigate(['/promocion/editar', selectedPromocion.id]);
  }

  onDelete() {
    if (this.selectedRow === null) {
      alert('Seleccioná una promocion primero.');
      return;
    }
    const selectedPromocion = this.promociones[this.selectedRow];
    if (
      confirm(
        `¿Estás seguro de que querés eliminar la promocion ${selectedPromocion.nombre} (ID: ${selectedPromocion.id})?`
      )
    ) {
      this.apiService.deletePromocion(selectedPromocion.id).then(() => {
        alert('Promocion eliminado correctamente.');
        this.promociones.splice(this.selectedRow!, 1);
        this.selectedRow = null;
      });
    }
  }

  onBack() {
    this.router.navigate(['/home']);
  }

  inicio() {
    this.router.navigate(['/home']);
  }
}
