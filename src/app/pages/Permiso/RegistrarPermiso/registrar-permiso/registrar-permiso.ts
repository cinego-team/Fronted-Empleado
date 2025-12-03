import { Component} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar-permiso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-permiso.html',
  styleUrls: ['./registrar-permiso.css'],
})
export class RegistrarPermisoComponent {
  form: FormGroup;
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
        .createPermiso(nombre)
        .then(() => {
          alert('Permiso creado correctamente.');
          this.router.navigate(['/permisos']);
        })
        .catch((error) => {
          console.error('Error al crear el permiso:', error);
          alert('Error al crear el permiso. Por favor, inténtalo de nuevo más tarde.');
        });
    }
  }

  volver() {
    this.router.navigate(['/permisos']);
  }
}
