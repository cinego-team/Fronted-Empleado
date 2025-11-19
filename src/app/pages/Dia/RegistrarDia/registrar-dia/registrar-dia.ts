import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-registrar-dia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-dia.html',
  styleUrls: ['./registrar-dia.css'],
})
export class RegistrarDiaComponent {
  form: FormGroup;
  dia: any;
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
        .createDia(nombre)
        .then(() => {
          alert('Día creado correctamente.');
          this.router.navigate(['/dia/lista']);
        })
        .catch((error) => {
          console.error('Error al crear el día:', error);
          alert('Error al crear el día. Por favor, inténtalo de nuevo más tarde.');
        });
    }
  }
  volver() {
    this.router.navigate(['/dia/lista']);
  }
}
