import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceFunciones } from '../../../services/api.service.funciones';

@Component({
  selector: 'app-lista-funcion',
  templateUrl: './lista-funcion.html',
  styleUrls: ['./lista-funcion.css'],
  imports: [CommonModule],
})
export class ListaFuncion implements OnInit {
  funciones: Array<{
    id: number;
    pelicula: string;
    fecha: Date;
    hora: Date;
    disponible: string;
    sala: number;
    formato: string;
  }> = [];

  selectedIndex: number | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(private router: Router, private apiService: ApiServiceFunciones) {}

  async ngOnInit() {
    await this.cargarFunciones();
  }

  async cargarFunciones() {
    try {
      this.isLoading = true;
      this.errorMessage = '';

      const funcionesBackend = await this.apiService.getAllFunciones();

      // Transformar datos del backend al formato del componente
      this.funciones = funcionesBackend.map((funcion) => ({
        id: funcion.id,
        pelicula: funcion.pelicula,
        fecha: funcion.fecha,
        hora: funcion.hora,
        disponible: funcion.disponible,
        sala: funcion.sala,
        formato: funcion.formato,
      }));

      console.log('[v0] funciones cargadas:', this.funciones);
    } catch (error) {
      console.error('[v0] Error al cargar funciones:', error);
      this.errorMessage = 'Error al cargar las funciones. Por favor, intenta nuevamente.';
      this.funciones = [];
    } finally {
      this.isLoading = false;
    }
  }

  selectRow(index: number) {
    this.selectedIndex = index;
  }

  editarfuncion() {
    if (this.selectedIndex !== null) {
      const id = this.funciones[this.selectedIndex].id;
      this.router.navigate(['/funcion/editar', id]);
    } else {
      alert('Selecciona una funcion primero');
    }
  }

  ver() {
    if (this.selectedIndex !== null) {
      const id = this.funciones[this.selectedIndex].id;
      this.router.navigate(['/funcion/ver', id]);
    } else {
      alert('Selecciona una funcion primero');
    }
  }

  nuevafuncion() {
    this.router.navigate(['/funcion/registrar']);
  }

  volver() {
    this.router.navigate(['/home']);
  }
}
