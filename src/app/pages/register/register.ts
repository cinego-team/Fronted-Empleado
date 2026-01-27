import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceUsuario } from '../../services/api.service.usuario';
import { Header } from '../../shared/header/header';
import { OnInit, AfterViewInit, OnDestroy } from '@angular/core';
interface RegisterResponse {
  message?: string;
  access_token?: string;
}
declare const grecaptcha: any;
@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, Header],
  templateUrl: './register.html',
  styleUrl: './register.css',
  standalone: true,
})
export class Register implements OnInit, AfterViewInit, OnDestroy {
  formulario: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  captchaToken: string | null = null;
  mostrarPassword = false;
  private captchaId: number | null = null;
  roles: {
    id: number;
    name: string;
  }[] = [];
  dias = Array.from({ length: 31 }, (_, i) => i + 1);

  meses = [
    { label: 'Enero', value: 1 },
    { label: 'Febrero', value: 2 },
    { label: 'Marzo', value: 3 },
    { label: 'Abril', value: 4 },
    { label: 'Mayo', value: 5 },
    { label: 'Junio', value: 6 },
    { label: 'Julio', value: 7 },
    { label: 'Agosto', value: 8 },
    { label: 'Septiembre', value: 9 },
    { label: 'Octubre', value: 10 },
    { label: 'Noviembre', value: 11 },
    { label: 'Diciembre', value: 12 },
  ];

  anios = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  constructor(
    private authService: ApiServiceUsuario,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      contrasena: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\S.*\S$/),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/),
        ],
      ],
      dia: ['', Validators.required],
      mes: ['', Validators.required],
      anio: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.minLength(6)]],
      rol: [null, Validators.required],
    });
  }
  async cargarRoles() {
    this.roles = await this.authService.getAllRoles();
    console.log(this.roles);
  }

  ngOnInit() {
    (window as any).onCaptchaSuccess = (token: string) => {
      const event = new CustomEvent('captcha-success', { detail: token });
      window.dispatchEvent(event);
    };

    window.addEventListener('captcha-success', (e: any) => {
      this.captchaToken = e.detail;
    });
    this.cargarRoles();
  }

  onRegister() {
    console.log('Submit disparado');
    if (this.formulario.invalid) {
      alert('Por favor, completa todos los campos correctamente.');
      this.formulario.markAllAsTouched();
      return;
    }
    if (!this.captchaToken) {
      alert('Por favor completa el captcha');
      return;
    }
    this.authService
      .register(
        {
          nombre: this.formulario.value.nombre,
          apellido: this.formulario.value.apellido,
          email: this.formulario.value.email,
          contrasena: this.formulario.value.contrasena,
          dd: this.formulario.value.dia,
          mm: this.formulario.value.mes,
          aaaa: this.formulario.value.anio,
          nroTelefono: `+54${this.formulario.value.telefono.replace(/\D/g, '')}`,
          rol: {
            id: this.formulario.value.rol.id,
            nombre: this.formulario.value.rol.nombre,
          },
        },
        this.captchaToken,
      )
      .then(() => {
        this.successMessage = 'Registro exitoso. Redirigiendo...';
        setTimeout(() => {
          this.router.navigate(['/principal']);
        }, 1500);
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
  volver() {
    this.router.navigate(['/principal']);
  }
  ngAfterViewInit() {
    const interval = setInterval(() => {
      if (typeof grecaptcha !== 'undefined') {
        clearInterval(interval);

        this.captchaId = grecaptcha.render('captcha', {
          sitekey: '6LcICREsAAAAAKHWBF39boQk9uCQ__y6iFi7mbb2',
          callback: (token: string) => {
            this.captchaToken = token;
          },
        });
      }
    }, 100);
  }
  ngOnDestroy() {
    if (this.captchaId !== null && typeof grecaptcha !== 'undefined') {
      grecaptcha.reset(this.captchaId);
    }
  }
}
