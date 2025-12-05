import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiServicePelicula } from '../../../services/api.service.pelicula';
@Component({
  selector: 'app-pelicula',
  standalone: true, // si tu proyecto usa standalone components
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pelicula.html',
  styleUrls: ['./pelicula.css'], // ✅ corregido (plural)
})
export class Pelicula {
  selectedPelicula: any | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiServicePelicula,
    private router: Router
  ) {}

  selectRow(p: any) {
    this.selectedPelicula = p;
  }
  peliculas: Array<{
    id: number; // obligatorio para update
    titulo: string;
    sinopsis: string;
    director: string;
    duracion: number;
    fechaEstreno: string;
    idioma: string; // nombre
    genero: string; // nombre
    clasificacion: string; // nombre
    estado: string; // nombre
    empleado: {
      nombre: string;
      apellido: string;
    };
    urlImagen: string;
  }> = [];
  selec: number | null = null;

  ngOnInit(): void {
    this.initialization();
  }

  async initialization(): Promise<void> {
    const data = await this.apiService.getPeliculas();
    if (data.length === 0) {
      alert('No hay Peliculas para mostrar.');
      return;
    }
    this.peliculas = data;
  }

  onEdit() {
    if (!this.selectedPelicula) {
      alert('Seleccioná una película primero.');
      return;
    }
    this.router.navigate(['/pelicula/editar', this.selectedPelicula.id]); // ruta con :id
  }

  onBack() {
    this.router.navigate(['/pelicula/lista']);
  }

  inicio() {
    this.router.navigate(['/home']);
  }
  onNew() {
    this.router.navigate(['/pelicula/registrar']);
  }

  eliminar() {
    if (this.selec === null) {
      alert('Seleccioná una película  primero.');
      return;
    }

    const selectedC = this.peliculas[this.selec];

    if (confirm(`¿Estás seguro de que querés eliminar ?`)) {
      this.apiService
        .deletePelicula(selectedC.id)
        .then(() => {
          alert('Película eliminada correctamente.');
          this.peliculas.splice(this.selec!, 1);
          this.selec = null;
        })
        .catch((error) => {
          console.error('Error al eliminar', error);
          alert('Ocurrió un error al eliminar');
        });
    }
  }
}
