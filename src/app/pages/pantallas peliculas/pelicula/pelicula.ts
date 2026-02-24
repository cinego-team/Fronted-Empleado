import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiServicePelicula } from '../../../services/api.service.pelicula';
import { Header } from '../../../shared/header/header';
@Component({
  selector: 'app-pelicula',
  standalone: true, // si tu proyecto usa standalone components
  imports: [CommonModule, ReactiveFormsModule, Header],
  templateUrl: './pelicula.html',
  styleUrls: ['./pelicula.css'],
})
export class Pelicula {
  selectedPelicula: any | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiServicePelicula,
    private router: Router
  ) {}

  peliculas: Array<{
    id: number;
    titulo: string;
    sinopsis: string;
    director: string;
    duracion: number;
    fechaEstreno: string;
    urlImagen: string;
    genero: {
      id: number;
      nombre: string;
    };

    clasificacion: {
      id: number;
      nombre: string;
    };
    estado: {
      id: number;
      nombre: string;
    };
    empleado: {
      nombre: string;
      apellido: string;
    };
  }> = [];
  selec: number | null = null;

  ngOnInit(): void {
    this.initialization();
  }

  async initialization(): Promise<void> {
    const data = await this.apiService.getPeliculasCompleto();
    if (data.length === 0) {
      alert('No hay Peliculas para mostrar.');
      return;
    }
    this.peliculas = data;
    console.log('[v0] Peliculas cargadas:', this.peliculas);
    console.log('[v0] Primer empleado:', this.peliculas[0]?.empleado);
  }
  selectRow(index: number) {
    this.selec = index;
    this.selectedPelicula = this.peliculas[index];
  }

  editar() {
    if (this.selec === null) {
      alert('Seleccioná uno primero.');
      return;
    }
    const selected = this.peliculas[this.selec];
    this.router.navigate(['/pelicula/editar', selected.id], {
      state: {
        pelicula: selected,
      },
    });
  }

  onBack() {
    this.router.navigate(['/home']);
  }

  inicio() {
    this.router.navigate(['/home']);
  }
  onNew() {
    this.router.navigate(['/pelicula/registrar']);
  }

  eliminar(): void {
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
