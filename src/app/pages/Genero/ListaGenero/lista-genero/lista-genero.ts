import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../services/api.service';

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
  constructor(private router: Router, private readonly apiService: ApiService) {}
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

  onDelete() {
    if (this.selec === null) {
      alert('Seleccioná un genero  primero.');
      return;
    }

    const selectedC = this.generos[this.selec];

    if (confirm(`¿Estás seguro de que querés eliminar ?`)) {
      this.apiService
        .deleteGenero(selectedC.id)
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

  onEdit() {
    if (this.selec === null) {
      alert('Seleccioná uno primero.');
      return;
    }
    const selected = this.generos[this.selec];
    this.router.navigate(['/editar-estado-pelicula', selected.id]);
  }

  volver() {
    this.router.navigate(['/home']);
  }
  inicio() {
    this.router.navigate(['/home']);
  }
}
