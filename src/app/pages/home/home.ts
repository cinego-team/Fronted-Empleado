import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Header } from '../../shared/header/header';

@Component({
  selector: 'app-home',
  imports: [Header],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private router: Router) {}
  onRegister() {
    this.router.navigate(['/registrar/empleado']);
  }
  onAdministrar() {
    this.router.navigate(['/administracion']);
  }
  onReportes() {
    this.router.navigate(['/reportes']);
  }
  onVentas() {
    this.router.navigate(['/venta/lista']);
  }
}
