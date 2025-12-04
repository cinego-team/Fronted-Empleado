import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiServicePelicula } from '../../../../services/api.service.pelicula';

@Component({
  selector: 'app-registrar-genero',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-genero.html',
  styleUrls: ['./registrar-genero.css'],
})
export class RegistrarGeneroComponent {
  form: FormGroup;
  genero: any;
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
        .createGenero(nombre)
        .then(() => {
          alert('Género creado correctamente.');
          this.router.navigate(['/genero/lista']);
        })
        .catch((error) => {
          console.error('Error al crear el género:', error);
          alert('Error al crear el género. Por favor, inténtalo de nuevo más tarde.');
        });
    }
  }

  volver() {
    this.router.navigate(['/genero/lista']);
  }

  inicio() {
    this.router.navigate(['/home']);
  }
}
