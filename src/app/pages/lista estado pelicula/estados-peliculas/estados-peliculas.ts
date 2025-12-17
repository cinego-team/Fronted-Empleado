import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServicePelicula } from '../../../services/api.service.pelicula';
import { Header } from '../../../shared/header/header';

@Component({
  selector: 'app-estados-peliculas',
  imports: [Header],
  templateUrl: './estados-peliculas.html',
  styleUrl: './estados-peliculas.css',
})
export class EstadosPeliculas {
  constructor(private router: Router, private readonly apiService: ApiServicePelicula) {}
  estados: Array<{
    id: number;
    nombre: string;
  }> = [];
  selec: number | null = null;

  ngOnInit(): void {
    this.initialization();
  }
  async initialization(): Promise<void> {
    const data = await this.apiService.getAllEstados();
    if (data.length === 0) {
      alert('No hay estados para mostrar.');
      return;
    }
    this.estados = data;
  }

  seleccionar(rowId: number) {
    this.selec = rowId;
  }

  onDelete(): void {
    if (this.selec === null) {
      alert('Seleccioná un estado  primero.');
      return;
    }

    const selectedC = this.estados[this.selec];

    if (confirm(`¿Estás seguro de que querés eliminar ?`)) {
      this.apiService
        .deleteEstado(selectedC.id)
        .then(() => {
          alert('Genero eliminada correctamente.');
          this.estados.splice(this.selec!, 1);
          this.selec = null;
        })
        .catch((error) => {
          console.error('Error al eliminar', error);
          alert('Ocurrió un error al eliminar');
        });
    }
  }

  onNew() {
    this.router.navigate(['/estado-pelicula/registrar']);
  }

  editar() {
    if (this.selec === null) {
      alert('Seleccioná uno primero.');
      return;
    }
    const selected = this.estados[this.selec];
    this.router.navigate(['/estado-pelicula/editar', selected.id], {
      state: {
        estadoPelicula: selected,
      },
    });
  }

  onBack() {
    this.router.navigate(['/home']);
  }

  inicio() {
    this.router.navigate(['/home']);
  }
}
