import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ApiServicePelicula } from '../../../../services/api.service.pelicula';

interface Idioma {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-lista-idioma',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-idioma.html',
  styleUrls: ['./lista-idioma.css'],
})
export class ListaIdiomaComponent {
  constructor(private router: Router, private readonly apiService: ApiServicePelicula) {}
  idiomas: Array<{
    id: number;
    nombre: string;
  }> = [];
  selec: number | null = null;

  ngOnInit(): void {
    this.initialization();
  }

  async initialization(): Promise<void> {
    const data = await this.apiService.getAllIdiomas();
    if (data.length === 0) {
      alert('No hay idiomas para mostrar.');
      return;
    }
    this.idiomas = data;
  }

  seleccionar(rowId: number) {
    this.selec = rowId;
  }

  eliminar(): void {
    if (this.selec === null) {
      alert('Seleccioná un idioma  primero.');
      return;
    }

    const selectedC = this.idiomas[this.selec];

    if (confirm(`¿Estás seguro de que querés eliminar ?`)) {
      this.apiService
        .deleteIdioma(selectedC.id)
        .then(() => {
          alert('Idioma eliminada correctamente.');
          this.idiomas.splice(this.selec!, 1);
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
    const selected = this.idiomas[this.selec];
    this.router.navigate(['/idioma/editar', selected.id], {
      state: {
        idioma: selected,
      },
    });
  }

  nuevo() {
    this.router.navigate(['/idioma/registrar']);
  }

  volver() {
    this.router.navigate(['/home']);
  }
}
