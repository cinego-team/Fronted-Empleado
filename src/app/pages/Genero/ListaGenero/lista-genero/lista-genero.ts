import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiServicePelicula } from '../../../../services/api.service.pelicula';

interface GeneroRow {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-lista-genero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-genero.html',
  styleUrls: ['./lista-genero.css'],
})
export class ListaGeneroComponent {
  constructor(private router: Router, private readonly apiService: ApiServicePelicula) {}
  generos: Array<{
    id: number;
    nombre: string;
  }> = [];
  selec: number | null = null;

  ngOnInit(): void {
    this.initialization();
  }

  async initialization(): Promise<void> {
    const data = await this.apiService.getAllGeneros();
    if (data.length === 0) {
      alert('No hay generos para mostrar.');
      return;
    }
    this.generos = data;
  }

  seleccionar(rowId: number) {
    this.selec = rowId;
  }

  eliminar(): void {
    if (this.selec === null) {
      alert('Seleccioná un genero  primero.');
      return;
    }

    const selectedG = this.generos[this.selec];

    if (confirm(`¿Estás seguro de que querés eliminar ?`)) {
      this.apiService
        .deleteGenero(selectedG.id)
        .then(() => {
          alert('Genero eliminada correctamente.');
          this.generos.splice(this.selec!, 1);
          this.selec = null;
        })
        .catch((error) => {
          console.error('Error al eliminar', error);
          alert('Ocurrió un error al eliminar');
        });
    }
  }

  nuevo() {
    this.router.navigate(['/genero/registrar']);
  }

  editar() {
    if (this.selec === null) {
      alert('Seleccioná uno primero.');
      return;
    }
    const selected = this.generos[this.selec];
    this.router.navigate(['/genero/editar', selected.id], {
      state: {
        genero: selected,
      },
    });
  }
  volver() {
    this.router.navigate(['/home']);
  }
}
