import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { ApiServicePromociones } from '../../../services/api.service.promociones';

@Component({
  selector: 'app-registrar-promocion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-promocion.html',
  styleUrl: './registrar-promocion.css',
})
export class RegistrarPromocion {
  form: FormGroup;
  promocion: any;
  error: string | null = null;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiServicePromociones,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      diaId: ['', [Validators.required]],
      descuento: ['', [Validators.required]],
      cliente: ['', [Validators.required]],
    });
  }

  onSave() {
    if (this.form.invalid) {
      alert('Por favor, completa  los campos correctamente.');
      return;
    } else if (this.form.valid) {
      const nombre: string = (this.form.get('nombre')?.value ?? '').toString();
      const diaId: number = Number(this.form.get('diaId')?.value ?? '');
      const descuento: number = Number(this.form.get('descuento')?.value ?? '');
      const cliente: number = Number(this.form.get('cliente')?.value ?? '');

      this.apiService
        .createPromocion(nombre)
        .then(() => {
          alert('Promoción creada correctamente.');
          this.router.navigate(['/promocion/lista']);
        })
        .catch((error) => {
          console.error('Error al crear la promoción:', error);
          alert('Error al crear la promoción. Por favor, inténtalo de nuevo más tarde.');
        });
    }
  }

  volver() {
    this.router.navigate(['/promocion/lista']);
  }
}
