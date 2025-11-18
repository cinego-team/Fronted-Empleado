import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-registrar-clasificacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-clasificacion.html',
  styleUrls: ['./registrar-clasificacion.css'],
})
export class RegistrarClasificacionComponent {
  form: FormGroup;
  restaurant: any;
  error: string | null = null;
  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
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
        .createGenero(nombre)
        .then(() => {
          alert('Clasificación creada correctamente.');
          this.router.navigate(['/clasificaciones']);
        })
        .catch((error) => {
          console.error('Error al crear la clasificación:', error);
          alert('Error al crear la clasificación. Por favor, inténtalo de nuevo más tarde.');
        });
    }
  }

  volver() {
    this.router.navigate(['/clasificaciones']);
  }
}
