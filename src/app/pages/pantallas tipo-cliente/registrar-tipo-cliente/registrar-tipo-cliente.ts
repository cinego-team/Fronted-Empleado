import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-registrar-tipo-cliente',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-tipo-cliente.html',
  styleUrl: './registrar-tipo-cliente.css',
})
export class RegistrarTipoCliente {
  form: FormGroup;
  tipoCliente: any;
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
        .createTipoCliente(nombre)
        .then(() => {
          alert('Tipo Cliente creado correctamente.');
          this.router.navigate(['/tipo-cliente/lista']);
        })
        .catch((error) => {
          console.error('Error al crear el tipo cliente:', error);
          alert('Error al crear el tipo cliente. Por favor, inténtalo de nuevo más tarde.');
        });
    }
  }

  volver() {
    this.router.navigate(['/tipo-cliente/lista']);
  }

  inicio() {
    this.router.navigate(['/home']);
  }
}
