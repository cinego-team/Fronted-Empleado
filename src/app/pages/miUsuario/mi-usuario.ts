import { Component } from '@angular/core';
import { ApiServiceUsuario } from '../../services/api.service.usuario';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalStatusService } from '../../services/global-status.service';

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: string;
  nroTelefono: string;
  legajo: number;
  role: {
    id: number;
    name: string;
  };
  permissions: {
    id: number;
    code: string;
  }[];
}

@Component({
  selector: 'app-mi-usuario',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mi-usuario.html',
  styleUrl: './mi-usuario.css',
})
export class MiUsuarioComponent {
  userData: Usuario | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private authService: ApiServiceUsuario,
    private readonly globalStatusService: GlobalStatusService,
  ) {}

  ngOnInit(): void {
    this.initialization();
  }

  async initialization(): Promise<void> {
    this.globalStatusService.setLoading(true);
    const data = await this.authService.getDatosEmpleado();
    this.userData = data;
    this.globalStatusService.setLoading(false);
  }

  logout(): void {
    this.authService.logout();
  }
}
