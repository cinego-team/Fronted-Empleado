import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { ApiServiceUsuario } from '../../services/api.service.usuario';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  userName: string | null = null;
  constructor(private router: Router, private authService: ApiServiceUsuario) {}
  async ngOnInit() {
    const empleado = await this.authService.getEmpleadoDesdeToken();

    if (empleado) {
      this.userName = `${empleado.nombre} ${empleado.apellido}`;
    }
  }

  inicio() {
    this.router.navigate(['/home']);
  }
}
