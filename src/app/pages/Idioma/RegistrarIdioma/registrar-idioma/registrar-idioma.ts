import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiServicePelicula } from '../../../../services/api.service.pelicula';

@Component({
  selector: 'app-registrar-idioma',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-idioma.html',
  styleUrls: ['./registrar-idioma.css'],
})
export class RegistrarIdiomaComponent {
  form: FormGroup;
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
        .createIdioma(nombre)
        .then(() => {
          alert('Idioma creado correctamente.');
          this.router.navigate(['/idioma/lista']);
        })
        .catch((error) => {
          console.error('Error al crear el idioma:', error);
          alert('Error al crear el idioma. Por favor, inténtalo de nuevo más tarde.');
        });
    }
  }

  volver() {
    this.router.navigate(['/idioma/lista']);
  }

  inicio() {
    this.router.navigate(['/home']);
  }
}
