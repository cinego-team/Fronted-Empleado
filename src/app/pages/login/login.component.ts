import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TokenTimeoutService } from '../../services/tokeTimeout.service';
import { ApiServiceUsuario } from '../../services/api.service.usuario';
declare const grecaptcha: any;
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formulario: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  captchaToken: string | null = null;
  mostrarPassword = false;
  private captchaId: number | null = null;

  constructor(
    private authService: ApiServiceUsuario,
    private router: Router,
    private tokenTimeoutService: TokenTimeoutService,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    (window as any).onCaptchaSuccess = (token: string) => {
      this.captchaToken = token;
    };
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
  OnLogin() {
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
      .login(
        {
          email: this.formulario.value.email,
          password: this.formulario.value.password,
        },
        this.captchaToken
      )
      .then(() => {
        this.tokenTimeoutService.startCountdown();
        this.router.navigate(['/h']);
      })
      .catch((error) => {
        alert('Login fallido. Verifica tus credenciales.');
        (window as any).grecaptcha.reset();
        this.captchaToken = null;
      });
  }
}
