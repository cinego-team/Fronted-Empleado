import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormatoInput } from '../formato.dto';
import { ApiServiceFunciones } from '../../../services/api.service.funciones';

@Component({
  selector: 'app-registrar-formato',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './registrar-formato.html',
  styleUrl: './registrar-formato.css',
})
export class RegistrarFormato {
  form: FormGroup;
  formato: any;
  error: string | null = null;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiServiceFunciones,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      precio: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d+(\.\d{1,2})?$/), // números + hasta 2 decimales
        ],
      ],
    });
  }

  onSave() {
    if (this.form.invalid) {
      alert('Por favor, completa  los campos correctamente.');
      return;
    } else if (this.form.valid) {
      const nombre: string = (this.form.get('nombre')?.value ?? '').toString();
      const precio: number = parseFloat(this.form.get('precio')?.value ?? '0');

      this.apiService
        .create(FormatoInput)
        .then(() => {
          alert('Formato creado correctamente.');
          this.router.navigate(['/formatos']);
        })
        .catch((error) => {
          console.error('Error al crear el formato:', error);
          alert('Error al crear el formato. Por favor, inténtalo de nuevo más tarde.');
        });
    }
  }

  volver() {
    this.router.navigate(['/formato/lista']);
  }

  inicio() {
    this.router.navigate(['/home']);
  }
}
