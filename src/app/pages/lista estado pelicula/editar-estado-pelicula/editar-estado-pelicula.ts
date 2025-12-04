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
    const estadoId = this.route.snapshot.paramMap.get('id');
    this.initialization(estadoId);
  }

  async initialization(estadoId: string | null): Promise<void> {
    if (!estadoId) {
      alert('No se proporcionó un ID de estado válido.');
      return;
    }
    try {
      const fetched = await this.apiService.getEstadosById(+estadoId);
      console.log('Estado obtenido:', fetched);
      this.estado = { ...fetched };
      this.originalEstado = { ...fetched };
    } catch (error) {
      alert('Error al obtener el estado:');
    }
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
