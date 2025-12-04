import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ApiServicePelicula } from '../../../services/api.service.pelicula';

@Component({
  selector: 'app-registrar-estado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-estado-p.html',
  styleUrl: './registrar-estado-p.css',
})
export class RegistrarEstadoPeliculaComponent {
  form: FormGroup;
  estado: any;
  error: string | null = null;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiServicePelicula,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  onSave() {
    if (this.form.invalid) {
      alert('Por favor, completa  los campos correctamente.');
      return;
    } else if (this.form.valid) {
      const nombre: string = (this.form.get('nombre')?.value ?? '').toString();

      this.apiService
        .createEstado(nombre)
        .then(() => {
          alert('Estado creado correctamente.');
          this.router.navigate(['/estado-pelicula/lista']);
        })
        .catch((error) => {
          console.error('Error al crear el estado:', error);
          alert('Error al crear el estado. Por favor, inténtalo de nuevo más tarde.');
        });
    }
  }

  volver() {
    this.router.navigate(['/estado-pelicula/lista']);
  }
}
