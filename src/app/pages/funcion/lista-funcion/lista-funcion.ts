import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceFunciones } from '../../../services/api.service.funciones';
import { Header } from '../../../shared/header/header';

@Component({
    selector: 'app-lista-funcion',
    templateUrl: './lista-funcion.html',
    styleUrls: ['./lista-funcion.css'],
    imports: [CommonModule, Header],
})
export class ListaFuncion implements OnInit {
    funciones: Array<{
        id: number;
        estaDisponible: boolean;
        pelicula: string;
        peliculaId: number;
        fecha: Date;
        hora: string;
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
        empleado: {
            nombre: string;
            apellido: string;
        };
    }> = [];

    selectedIndex: number | null = null;
    isLoading = true;
    errorMessage = '';

    // Paginacion
    currentPage = 1;
    pageSize = 5;
    hasMore = true;

    constructor(
        private router: Router,
        private apiService: ApiServiceFunciones,
    ) { }

    async ngOnInit() {
        await this.cargarFunciones();
    }

    async cargarFunciones() {
        try {
            this.isLoading = true;
            this.errorMessage = '';

            const funcionesBackend = await this.apiService.getFunciones(this.currentPage, this.pageSize);
            if (funcionesBackend.length === 0 && this.currentPage === 1) {
                alert('No hay funciones para mostrar.');
                return;
            }

            // Transformar datos del backend al formato del componente
            this.funciones = funcionesBackend.map((funcion) => ({
                id: funcion.id,
                estaDisponible: funcion.estaDisponible,
                pelicula: funcion.peliculaNombre,
                peliculaId: funcion.peliculaId,
                fecha: funcion.fecha,
                hora: funcion.hora,
                idioma: { id: funcion.idioma.id, nombre: funcion.idioma.nombre },
                sala: { id: funcion.sala.id, nroSala: funcion.sala.nroSala },
                formato: {
                    id: funcion.formato.id,
                    nombre: funcion.formato.nombre,
                    precio: funcion.formato.precio,
                },
                empleado: {
                    nombre: funcion.empleado.nombre,
                    apellido: funcion.empleado.apellido,
                },
            }));
            this.hasMore = funcionesBackend.length === this.pageSize;
        } catch (error) {
            console.error('Error al cargar funciones:', error);
            this.errorMessage = 'Error al cargar las funciones. Por favor, intenta nuevamente.';
            this.funciones = [];
        } finally {
            this.isLoading = false;
        }
    }

    nextPage(): void {
        if (this.hasMore) {
            this.currentPage++;
            this.selectedIndex = null;
            this.cargarFunciones();
        }
    }

    prevPage(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.selectedIndex = null;
            this.cargarFunciones();
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
