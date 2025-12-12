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
    estaDisponible: string;
    peliculaId: number;
    fecha: Date;
    idioma: {
      id: number;
      nombre: string;
    };
    sala: {
      id: number;
      nroSala: number;
    };
    formato: {
      id: number;
      nombre: string;
      precio: number;
    };
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

      const funcionesBackend = await this.apiService.getFunciones();

      // Transformar datos del backend al formato del componente
      this.funciones = funcionesBackend.map((funcion) => ({
        id: funcion.id,
        estaDisponible: funcion.estaDisponible,
        peliculaId: funcion.peliculaId,
        fecha: funcion.fecha,
        idioma: { id: funcion.idioma.id, nombre: funcion.idioma.nombre },
        sala: { id: funcion.sala.id, nroSala: funcion.sala.nroSala },
        formato: {
          id: funcion.formato.id,
          nombre: funcion.formato.nombre,
          precio: funcion.formato.precio,
        },
      }));

      console.log(' funciones cargadas:', this.funciones);
    } catch (error) {
      console.error('Error al cargar funciones:', error);
      this.errorMessage = 'Error al cargar las funciones. Por favor, intenta nuevamente.';
      this.funciones = [];
    } finally {
      this.isLoading = false;
    }
  }

  selectRow(index: number) {
    this.selectedIndex = index;
  }

  editarFuncion() {
    if (this.selectedIndex === null) {
      alert('Seleccioná uno primero.');
      return;
    }
    const selected = this.funciones[this.selectedIndex];
    this.router.navigate(['/funcion/editar', selected.id], {
      state: {
        funcion: selected,
      },
    });
  }

  ver() {
    if (this.selectedIndex !== null) {
      const id = this.funciones[this.selectedIndex].id;
      this.router.navigate(['/funcion/funcion', id]);
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
  eliminar(): void {
    if (this.selectedIndex === null) {
      alert('Seleccioná una función primero.');
      return;
    }

    const selectedC = this.funciones[this.selectedIndex];

    if (confirm(`¿Estás seguro de que querés eliminar ?`)) {
      this.apiService
        .deleteFuncion(selectedC.id)
        .then(() => {
          alert('Función eliminada correctamente.');
          this.funciones.splice(this.selectedIndex!, 1);
          this.selectedIndex = null;
        })
        .catch((error) => {
          console.error('Error al eliminar la función:', error);
          alert('Ocurrió un error al eliminar la función.');
        });
    }
  }
}
