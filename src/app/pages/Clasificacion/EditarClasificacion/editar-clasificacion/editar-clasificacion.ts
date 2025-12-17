import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ApiServicePelicula } from '../../../../services/api.service.pelicula';
import { Header } from '../../../../shared/header/header';
@Component({
  selector: 'app-editar-clasificacion',
  standalone: true,
  imports: [CommonModule, FormsModule, Header],
  templateUrl: './editar-clasificacion.html',
  styleUrls: ['./editar-clasificacion.css'],
})
export class EditarClasificacionComponent implements OnInit {
  clasificacion: any = {};
  originalClasificacion: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiServicePelicula
  ) {}

  ngOnInit() {
    // Recuperar el state desde la navegación
    const navState =
      (this.router.getCurrentNavigation()?.extras.state as any)?.clasificacion ??
      (history.state as any)?.clasificacion;

    if (!navState) {
      // Si no hay state, no se puede editar porque no hay datos
      alert('No se encontró la clasificación. Volvé al listado.');
      this.router.navigate(['/clasificacion/lista']);
      return;
    }

    // Setear datos
    this.clasificacion = { ...navState };
    this.originalClasificacion = { ...navState };
  }

  onSave() {
    if (this.clasificacion.nombre === this.originalClasificacion.nombre) {
      alert('No se cambió ningún dato.');
      return;
    }

    try {
      this.apiService.updateClasificacion(this.clasificacion);
      alert('Clasificación actualizada correctamente.');
      this.router.navigate(['/clasificacion/lista']);
    } catch (error) {
      console.error('Error al actualizar la clasificación:', error);
      alert('Error al actualizar la clasificación.');
    }
  }

  volver() {
    this.router.navigate(['/clasificacion/lista']);
  }

  inicio() {
    this.router.navigate(['/home']);
  }
}
