import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceFunciones } from '../../../services/api.service.funciones';
import { Header } from '../../../shared/header/header';
@Component({
  selector: 'app-registrar-sala',
  imports: [CommonModule, ReactiveFormsModule, Header],
  standalone: true,
  templateUrl: './registrar-sala.html',
  styleUrl: './registrar-sala.css',
})
export class RegistrarSala {
  form: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiServiceFunciones,
  ) {
    this.form = this.fb.group({
      numero: ['', [Validators.required, Validators.min(1)]],
      disponibilidad: [true, Validators.required],
      cantFilas: ['', [Validators.required, Validators.min(1)]],
      cantButacasPorFila: ['', [Validators.required, Validators.min(1)]],
    });
  }
  disponibilidadOpciones = [
    { label: 'Disponible', value: true },
    { label: 'No disponible', value: false },
  ];

  registrar() {
    if (this.form.invalid) {
      alert('Por favor, completa los campos correctamente.');
      return;
    }

    const formValue = this.form.value as {
      numero: number;
      disponibilidad: boolean;
      cantFilas: number;
      cantButacasPorFila: number;
    };

    this.apiService
      .createSala(formValue)
      .then(() => {
        alert('Sala creada correctamente.');
        this.router.navigate(['/sala/lista']);
      })
      .catch((error) => {
        console.error('Error al crear la sala:', error);
        alert('Error al crear la sala.');
      });
  }

  volver() {
    this.router.navigate(['/sala/lista']);
  }
}
