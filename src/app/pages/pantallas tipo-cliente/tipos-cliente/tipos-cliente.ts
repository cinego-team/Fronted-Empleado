import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalStatusService } from '../../../services/global-status.service';
import { ApiServiceUsuario } from '../../../services/api.service.usuario';
import { Header } from '../../../shared/header/header';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tipos-cliente',
  standalone: true,
  imports: [CommonModule, Header],
  templateUrl: './tipos-cliente.html',
  styleUrl: './tipos-cliente.css',
})
export class TiposCliente {
  constructor(
    private router: Router,
    private readonly apiService: ApiServiceUsuario,
    private readonly globalStatusService: GlobalStatusService,
  ) {}
  tiposCliente: Array<{
    id: number;
    denominacion: string;
    descripcion: string;
  }> = [];
  selectedIndex: number | null = null;

  actualPage: number = 1;

  ngOnInit(): void {
    if (history.state.reload) {
      this.initialization();
    } else {
      // Opcional: cargar solo si no hay datos cargados
      if (!this.tiposCliente || this.tiposCliente.length === 0) {
        this.initialization();
      }
    }
  }

  async initialization(): Promise<void> {
    try {
      this.globalStatusService.setLoading(true);

      const data = await this.apiService.getAllTiposClientes();
      console.log('DATA RECIBIDA:', data);

      if (data.length === 0) {
        alert('No hay tipos cliente para mostrar.');
        return;
      }

      this.tiposCliente = data;
      this.selectedIndex = null;
    } catch (error) {
      console.error(error);
      alert('Error al cargar tipos de cliente');
    } finally {
      this.globalStatusService.setLoading(false);
    }
  }

  selectRow(index: number) {
    this.selectedIndex = index;
  }

  onNew() {
    this.router.navigate(['/tipo-cliente/registrar']);
  }
  onEdit() {
    if (this.selectedIndex === null) {
      alert('Seleccioná uno primero.');
      return;
    }

    const selected = this.tiposCliente[this.selectedIndex];

    this.router.navigate(['/tipo-cliente/editar', selected.id], {
      state: { tipoCliente: selected },
    });
  }

  onDelete(): void {
    if (this.selectedIndex === null) {
      alert('Seleccioná un tipo cliente primero.');
      return;
    }
    const selectedTiposCliente = this.tiposCliente[this.selectedIndex];
    if (
      confirm(
        `¿Estás seguro de que querés eliminar el tipo cliente ${selectedTiposCliente.denominacion} (ID: ${selectedTiposCliente.id})?`,
      )
    ) {
      this.apiService.deleteTipoCliente(selectedTiposCliente.id).then(() => {
        alert('Tipo cliente eliminado correctamente.');
        this.tiposCliente.splice(this.selectedIndex!, 1);
        this.selectedIndex = null;
      });
    }
  }
  onBack() {
    this.router.navigate(['/home']);
  }
}
