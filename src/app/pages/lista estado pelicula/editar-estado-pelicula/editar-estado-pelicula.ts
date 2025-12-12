import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiServicePelicula } from '../../../services/api.service.pelicula';

@Component({
  selector: 'app-editar-estado-pelicula',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-estado-pelicula.html',
  styleUrl: './editar-estado-pelicula.css',
})
export class EditarEstadoPelicula implements OnInit {
  estado: any;
  originalEstado: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiServicePelicula
  ) {}

  ngOnInit() {
    // Recuperar el state desde la navegación
    const navState =
      (this.router.getCurrentNavigation()?.extras.state as any)?.estadoPelicula ??
      (history.state as any)?.estadoPelicula;

    if (!navState) {
      // Si no hay state, no se puede editar porque no hay datos
      alert('No se encontró el estado de pelicula. Volvé al listado.');
      this.router.navigate(['/estado-pelicula/lista']);
      return;
    }

    // Setear datos
    this.estado = { ...navState };
    this.originalEstado = { ...navState };
  }

  onSave() {
    const modifiedKeys = Object.keys(this.estado).filter(
      (key) => key !== 'id' && this.estado[key] !== this.originalEstado[key]
    );
    if (modifiedKeys.length === 0) {
      alert('No se cambió ningún dato.');
    } else if (modifiedKeys.length === Object.keys(this.estado).length - 1) {
      this.apiService
        .updateEstado(this.estado)
        .then(() => {
          alert('Estado actualizado correctamente.');
        })
        .catch((error) => {
          console.error('Error al actualizar el estado:', error);
          alert('Error al actualizar el estado.');
        });
    }

    this.router.navigate(['/estado-pelicula/lista']);
  }

  volver() {
    this.router.navigate(['/estado-pelicula/lista']);
  }
}
