import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceUsuario } from '../../../../services/api.service.usuario';

@Component({
  selector: 'app-lista-rol',
  templateUrl: './lista-rol.html',
  styleUrls: ['./lista-rol.css'],
  imports: [CommonModule],
})
export class ListaRolComponent implements OnInit {
  roles: Array<{
    id: number;
    nombre: string;
  }> = [];

  selectedIndex: number | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(private router: Router, private apiService: ApiServiceUsuario) {}

  async ngOnInit() {
    await this.cargarrols();
  }

  async cargarrols() {
    try {
      this.isLoading = true;
      this.errorMessage = '';

      const rolsBackend = await this.apiService.getAllRoles();

      // Transformar datos del backend al formato del componente
      this.roles = rolsBackend.map((rol) => ({
        id: rol.id,
        nombre: rol.nombre,
      }));

      console.log('[v0] roles cargadas:', this.roles);
    } catch (error) {
      console.error('[v0] Error al cargar roles:', error);
      this.errorMessage = 'Error al cargar las roles. Por favor, intenta nuevamente.';
      this.roles = [];
    } finally {
      this.isLoading = false;
    }
  }

  selectRow(index: number) {
    this.selectedIndex = index;
  }

  editarrol() {
    if (this.selectedIndex !== null) {
      const id = this.roles[this.selectedIndex].id;
      this.router.navigate(['/editar-rol', id]);
    } else {
      alert('Selecciona una rol primero');
    }
  }

  nuevarol() {
    this.router.navigate(['/registrar-rol']);
  }

  irListaFuncion() {
    this.router.navigate(['/lista-funcion']);
  }
}
