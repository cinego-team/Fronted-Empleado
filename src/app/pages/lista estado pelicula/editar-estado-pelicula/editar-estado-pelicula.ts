import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiServicePelicula } from '../../../services/api.service.pelicula';
import { Header } from '../../../shared/header/header';

@Component({
  selector: 'app-editar-estado-pelicula',
  standalone: true,
  imports: [CommonModule, FormsModule, Header],
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
    this.router.navigate(['/estado-pelicula/lista']);
    return;
  }
  
  // Si hay cambios, actualizar y ESPERAR a que termine antes de navegar
  this.apiService
    .updateEstado(this.estado)
    .then(() => {
      alert('Estado actualizado correctamente.');
      this.router.navigate(['/estado-pelicula/lista']);  // Mover DENTRO del then()
    })
    .catch((error) => {
      console.error('Error al actualizar el estado:', error);
      alert('Error al actualizar el estado.');
    });
}

  volver() {
    this.router.navigate(['/estado-pelicula/lista']);
  }
}
