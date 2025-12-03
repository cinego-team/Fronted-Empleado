import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
interface RegisterResponse {
  message?: string;
  access_token?: string;
}
@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  form: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required, Validators.minLength(3)]],

      dia: ['', Validators.required],
      mes: ['', Validators.required],
      anio: ['', Validators.required],

      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{6,15}$/)]],

      rolId: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/), // solo números enteros positivos
        ],
      ],
    });
  }
  dias: number[] = [];
  meses = [
    { valor: 1, nombre: 'Enero' },
    { valor: 2, nombre: 'Febrero' },
    { valor: 3, nombre: 'Marzo' },
    { valor: 4, nombre: 'Abril' },
    { valor: 5, nombre: 'Mayo' },
    { valor: 6, nombre: 'Junio' },
    { valor: 7, nombre: 'Julio' },
    { valor: 8, nombre: 'Agosto' },
    { valor: 9, nombre: 'Septiembre' },
    { valor: 10, nombre: 'Octubre' },
    { valor: 11, nombre: 'Noviembre' },
    { valor: 12, nombre: 'Diciembre' },
  ];
  anios: number[] = [];

  ngOnInit() {
    this.cargarDias();
    this.cargarAnios();
  }

  cargarDias() {
    this.dias = Array.from({ length: 31 }, (_, i) => i + 1);
  }

  cargarAnios() {
    const anioActual = new Date().getFullYear();
    for (let año = 1950; año <= anioActual; año++) {
      this.anios.push(año);
    }
  }
  onRegister() {
    if (this.form.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      this.form.markAllAsTouched();
      return;
    }
    const nombre = this.form.value.nombre;
    const apellido = this.form.value.apellido;

    const email = this.form.value.email;
    const password= this.form.value.password;
    const dia = this.form.value.dia;
    const mes = this.form.value.mes;
    const anio = this.form.value.anio;
    const telefono = this.form.value.telefono;
    const roleId = this.form.value.roleId;
    console.log('Email:', email);
    console.log('Constraseña:', password);
    console.log('Nombre:', nombre);
    console.log('Apellido:', apellido);
    console.log('Día:', dia);
    console.log('Mes:', mes);
    console.log('Año:', anio);
    console.log('Teléfono:', telefono);
    console.log('Rol:', roleId);

    this.apiService
      .register({ email, password, nombre, apellido, dia, mes, anio, telefono, roleId })
      .then(() => {
        this.successMessage = 'Registro exitoso. Redirigiendo...';
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 4000);
      })
      .catch((err) => {
        if (err.status === 409) {
          this.errorMessage = 'El correo ya está registrado.';
        } else if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Error inesperado. Intenta más tarde.';
        }
      });
  }
}
