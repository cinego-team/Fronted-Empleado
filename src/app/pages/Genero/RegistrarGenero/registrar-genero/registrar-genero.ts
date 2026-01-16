import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiServicePelicula } from '../../../../services/api.service.pelicula';
import { Header } from '../../../../shared/header/header';

@Component({
  selector: 'app-registrar-genero',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Header],
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
      alert('Por favor, completa los campos correctamente.');
      return;
    }

    const nombre = this.form.value.nombre;

    this.apiService
      .createGenero(nombre)
      .then(() => {
        alert('Género creado correctamente.');
        this.router.navigate(['/genero/lista']);
      })
      .catch((error) => {
        console.error('Error al crear el género:', error);
        alert('Error al crear el género.');
      });
  }

  volver() {
    this.router.navigate(['/genero/lista']);
  }

  inicio() {
    this.router.navigate(['/home']);
  }
}
