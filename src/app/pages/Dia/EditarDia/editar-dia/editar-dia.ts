import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-editar-dia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-dia.html',
  styleUrls: ['./editar-dia.css'],
})
export class EditarDiaComponent implements OnInit {
  dia: any;
  originalDia: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const diaId = this.route.snapshot.paramMap.get('id');
    this.initialization(diaId);
  }

  async initialization(diaId: string | null): Promise<void> {
    if (!diaId) {
      alert('No se proporcionó un ID de genero válido.');
      return;
    }
    try {
      const fetched = await this.apiService.getDiaById(+diaId);
      console.log('Día obtenido:', fetched);
      this.dia = { ...fetched };
      this.originalDia = { ...fetched };
    } catch (error) {
      alert('Error al obtener la dia:');
    }
  }
  onSave() {
    const modifiedKeys = Object.keys(this.dia).filter(
      (key) => key !== 'id' && this.dia[key] !== this.originalDia[key]
    );
    if (modifiedKeys.length === 0) {
      alert('No se cambió ningún dato.');
    } else if (modifiedKeys.length === Object.keys(this.dia).length - 1) {
      this.apiService
        .updateDia(this.dia)
        .then(() => {
          alert('Día actualizado correctamente.');
        })
        .catch((error) => {
          console.error('Error al actualizar el día:', error);
          alert('Error al actualizar el día.');
        });
    }

    this.router.navigate(['/dia/lista']);
  }
  volver() {
    this.router.navigate(['/dia/lista']);
  }
  inicio() {
    this.router.navigate(['/home']);
  }
}
