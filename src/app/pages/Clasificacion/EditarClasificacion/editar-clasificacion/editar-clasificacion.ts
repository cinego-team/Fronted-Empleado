import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
@Component({
  selector: 'app-editar-clasificacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-clasificacion.html',
  styleUrls: ['./editar-clasificacion.css'],
})
export class EditarClasificacionComponent implements OnInit {
  clasificacion: any;
  originalClasificacion: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const clasificacionId = this.route.snapshot.paramMap.get('id');
    this.initialization(clasificacionId);
  }

  async initialization(clasificacionId: string | null): Promise<void> {
    if (!clasificacionId) {
      alert('No se proporcionó un ID de genero válido.');
      return;
    }
    try {
      const fetched = await this.apiService.getClasificacionById(+clasificacionId);
      console.log('Clasificación obtenida:', fetched);
      this.clasificacion = { ...fetched };
      this.originalClasificacion = { ...fetched };
    } catch (error) {
      alert('Error al obtener la clasificacion:');
    }
  }
  onSave() {
    const modifiedKeys = Object.keys(this.clasificacion).filter(
      (key) => key !== 'id' && this.clasificacion[key] !== this.originalClasificacion[key]
    );
    if (modifiedKeys.length === 0) {
      alert('No se cambió ningún dato.');
    } else if (modifiedKeys.length === Object.keys(this.clasificacion).length - 1) {
      this.apiService
        .updateClasificacion(this.clasificacion)
        .then(() => {
          alert('Clasificación actualizada correctamente.');
        })
        .catch((error) => {
          console.error('Error al actualizar la clasificación:', error);
          alert('Error al actualizar la clasificación.');
        });
    }

    this.router.navigate(['/clasificacion/lista']);
  }
  volver() {
    this.router.navigate(['/clasificacion/lista']);
  }
}
