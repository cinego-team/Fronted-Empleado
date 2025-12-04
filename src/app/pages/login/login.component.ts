import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TokenTimeoutService } from '../../services/tokeTimeout.service';
import { ApiServiceUsuario } from '../../services/api.service.usuario';
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private apiService: ApiServiceUsuario,
    private router: Router,
    private tokenTimeoutService: TokenTimeoutService
  ) {}

  onLogin() {
    this.apiService
      .login({ email: this.email, password: this.password })
      .then(() => {
        this.tokenTimeoutService.startCountdown();
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        alert('Login fallido. Verifica tus credenciales.');
      });
  }
}
