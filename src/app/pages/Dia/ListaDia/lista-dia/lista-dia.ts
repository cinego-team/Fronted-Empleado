import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../services/api.service';

interface GeneroRow {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-lista-dia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-dia.html',
  styleUrls: ['./lista-dia.css'],
})
export class ListaDiaComponent {
  constructor(private router: Router, private readonly apiService: ApiService) {}
  dias: Array<{
    id: number;
    nombre: string;
  }> = [];
  selec: number | null = null;

  ngOnInit(): void {
    this.initialization();
  }
  async initialization(): Promise<void> {
    const data = await this.apiService.getAllDias();
    if (data.length === 0) {
      alert('No hay dias para mostrar.');
      return;
    }
    this.dias = data;
  }
  seleccionar(rowId: number) {
    this.selec = rowId;
  }

  eliminar() {
    if (this.selec === null) {
      alert('Seleccioná un dia  primero.');
      return;
    }

    const selectedC = this.dias[this.selec];
    if (confirm(`¿Estás seguro de que querés eliminar ?`)) {
      this.apiService
        .deleteDia(selectedC.id)
        .then(() => {
          alert('Dia eliminada correctamente.');
          this.dias.splice(this.selec!, 1);
          this.selec = null;
        })
        .catch((error) => {
          console.error('Error al eliminar', error);
          alert('Ocurrió un error al eliminar');
        });
    }
  }

  editar() {
    if (this.selec === null) {
      alert('Seleccioná uno primero.');
      return;
    }
    const selected = this.dias[this.selec];
    this.router.navigate(['/dia/editar', selected.id]);
  }

  nuevo() {
    this.router.navigate(['/dia/registrar']);
  }

  volver() {
    this.router.navigate(['/home']);
  }
  inicio() {
    this.router.navigate(['/home']);
  }
}
