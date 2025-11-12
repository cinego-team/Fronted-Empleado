import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { GlobalStatusService } from '../../../services/global-status.service';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './peliculas.html',
  styleUrls: ['./peliculas.css'],
})
export class PeliculaListaComponent {
  constructor(
    private router: Router,
    private readonly apiService: ApiService,
    private readonly globalStatusService: GlobalStatusService
  ) {}

  peliculas: Array<{
    id: number;
    titulo: string;
    sinopsis: string;
    director: string;
    duracion: number;
    fechaEsterno: string;
    idioma: string;
    genero: string;
    clasificación: string;
    estado: string;
  }> = [];
  selectedRow: number | null = null;
  actualPage: number = 1;

  ngOnInit(): void {
    this.initialization();
  }
  async initialization(): Promise<void> {
    this.globalStatusService.setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500)); // decorativo
    const data = await this.apiService.getPeliculas(); // ✅ pedir películas
    if (data.length === 0) {
      alert('No hay películas para mostrar.');
      this.globalStatusService.setLoading(false);
      this.actualPage--;
      return;
    }
    this.peliculas = data;
    this.globalStatusService.setLoading(false);
  }

  isLoading(): boolean {
    return this.globalStatusService.isLoading();
  }

  selectRow(rowId: number) {
    this.selectedRow = rowId;
  }

  onNew() {
    this.router.navigate(['/registrar-pelicula']);
  }

  onEdit() {
    if (this.selectedRow === null) {
      alert('Seleccioná un restaurante primero.');
      return;
    }
    const selectedRestaurant = this.peliculas[this.selectedRow];
    this.router.navigate(['/pelicula/edit', selectedRestaurant.id]);
  }
  onView(): void {
    if (this.selectedRow === null) {
      alert('Seleccioná una película primero.');
      return;
    }
    const selectedPelicula = this.peliculas[this.selectedRow];
    this.router.navigate(['/pelicula', selectedPelicula.id]);
  }

  onDelete(): void {
    if (this.selectedRow === null) {
      alert('Seleccioná una película primero.');
      return;
    }
    const selectedPelicula = this.peliculas[this.selectedRow];
    if (confirm(`¿Estás seguro de que querés eliminar ${selectedPelicula.titulo}?`)) {
      this.apiService.deletePelicula(selectedPelicula.id).then(() => {
        this.peliculas.splice(this.selectedRow!, 1);
        this.selectedRow = null;
        alert('Película eliminada correctamente.');
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
