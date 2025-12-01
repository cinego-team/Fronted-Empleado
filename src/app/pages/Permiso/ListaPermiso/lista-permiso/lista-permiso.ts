import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-lista-permiso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-permiso.html',
  styleUrls: ['./lista-permiso.css'],
})
export class ListaPermisoComponent {
  constructor(private router: Router, private readonly apiService: ApiService) {}
  permisos: Array<{
    id: number;
    nombre: string;
  }> = [];
  selec: number | null = null;

  ngOnInit(): void {
    this.initialization();
  }
  async initialization(): Promise<void> {
    const data = await this.apiService.getAllPermisos();
    if (data.length === 0) {
      alert('No hay permisos para mostrar.');
      return;
    }
    this.permisos = data;
  }
  seleccionar(rowId: number) {
    this.selec = rowId;
  }

  eliminar() {
    if (this.selec === null) {
      alert('Seleccioná un permiso  primero.');
      return;
    }

    const selectedC = this.permisos[this.selec];

    if (confirm(`¿Estás seguro de que querés eliminar ?`)) {
      this.apiService
        .deleteGenero(selectedC.id)
        .then(() => {
          alert('Permiso eliminado correctamente.');
          this.permisos.splice(this.selec!, 1);
          this.selec = null;
        })
        .catch((error) => {
          console.error('Error al eliminar', error);
          alert('Ocurrió un error al eliminar');
        });
    }
  }

  nuevo() {
    this.router.navigate(['/permiso/registrar']);
  }

  volver() {
    this.router.navigate(['/home']);
  }
  inicio() {
    this.router.navigate(['/home']);
  }
}
