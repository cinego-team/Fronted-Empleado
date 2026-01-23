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
  const modifiedKeys = Object.keys(this.clasificacion).filter(
    (key) => key !== 'id' && this.clasificacion[key] !== this.originalClasificacion[key]
  );
  
  if (modifiedKeys.length === 0) {
    alert('No se cambio ningun dato.');
    this.router.navigate(['/clasificacion/lista']);
    return;
  }
  
  // Si hay cambios, actualizar y ESPERAR a que termine antes de navegar
  this.apiService
    .updateClasificacion(this.clasificacion)
    .then(() => {
      alert('clasificacion actualizado correctamente.');
      this.router.navigate(['/clasificacion/lista']);  // Mover DENTRO del then()
    })
    .catch((error) => {
      console.error('Error al actualizar el clasificacion:', error);
      alert('Error al actualizar el clasificacion.');
    });
}

  volver() {
    this.router.navigate(['/clasificacion/lista']);
  }

  inicio() {
    this.router.navigate(['/home']);
  }
}
