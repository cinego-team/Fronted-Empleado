import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../services/api.service';

interface GeneroRow {
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
  constructor(private router: Router, private readonly apiService: ApiService) {}
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

  onDelete() {
    if (this.selec === null) {
      alert('Seleccioná un idioma  primero.');
      return;
    }

    const selectedC = this.idiomas[this.selec];

    if (confirm(`¿Estás seguro de que querés eliminar ?`)) {
      this.apiService
        .deleteIdioma(selectedC.id)
        .then(() => {
          alert('Genero eliminada correctamente.');
          this.idiomas.splice(this.selec!, 1);
          this.selec = null;
        })
        .catch((error) => {
          console.error('Error al eliminar', error);
          alert('Ocurrió un error al eliminar');
        });
    }
  }
  onEdit() {
    if (this.selec === null) {
      alert('Seleccioná uno primero.');
      return;
    }
    const selectedIdioma = this.idiomas[this.selec];
    this.router.navigate(['/editar-estado-pelicula', selectedIdioma.id]);
  }

  nuevo() {
    this.router.navigate(['/idioma/registrar']);
  }

  volver() {
    this.router.navigate(['/home']);
  }
  inicio() {
    this.router.navigate(['/home']);
  }
}
