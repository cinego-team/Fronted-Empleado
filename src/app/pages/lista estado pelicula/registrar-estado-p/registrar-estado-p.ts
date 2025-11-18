import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from './../../../services/api.service';

@Component({
  selector: 'app-registrar-estado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-estado-p.html',
  styleUrl: './registrar-estado-p.css',
})
export class RegistrarEstadoPeliculaComponent {
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
    this.router.navigate(['/estados-peliculas']);
  }
}
