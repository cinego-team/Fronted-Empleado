import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ApiServiceFunciones } from '../../../services/api.service.funciones';

@Component({
  selector: 'app-lista-formato',
  templateUrl: './lista-formato.html',
  styleUrls: ['./lista-formato.css'],
  imports: [CommonModule],
})
export class ListaFormatoComponent {
  constructor(private router: Router, private readonly apiService: ApiServiceFunciones) {}
  formatos: Array<{
    id: number;
    nombre: string;
    precio: number;
  }> = [];
  selec: number | null = null;

  ngOnInit(): void {
    this.initialization();
  }

  async initialization(): Promise<void> {
    const data = await this.apiService.findAll();
    if (data.length === 0) {
      alert('No hay formatos para mostrar.');
      return;
    }
    this.formatos = data;
  }

  seleccionar(rowId: number) {
    this.selec = rowId;
  }

  eliminar() {
    if (this.selec === null) {
      alert('Seleccioná un formato  primero.');
      return;
    }

    const selectedF = this.formatos[this.selec];

    if (confirm(`¿Estás seguro de que querés eliminar ?`)) {
      this.apiService
        .delete(selectedF.id)
        .then(() => {
          alert('Formato eliminado correctamente.');
          this.formatos.splice(this.selec!, 1);
          this.selec = null;
        })
        .catch((error) => {
          console.error('Error al eliminar', error);
          alert('Ocurrió un error al eliminar');
        });
    }
  }

  nuevo() {
    this.router.navigate(['/formato/registrar']);
  }

  editar() {
    if (this.selec === null) {
      alert('Seleccioná uno primero.');
      return;
    }
    const selected = this.formatos[this.selec];
    this.router.navigate(['/formato/editar', selected.id]);
  }

  volver() {
    this.router.navigate(['/home']);
  }
}
