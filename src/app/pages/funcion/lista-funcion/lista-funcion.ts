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
            id: number
            nombre: string;
        }
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

    constructor(private router: Router, private apiService: ApiServiceFunciones) { }

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
                estaDisponible: funcion.estaDisponible,
                peliculaId: funcion.peliculaId,
                fecha: funcion.fecha,
                sala: { numeroSala: funcion.NumeroSala }, // anidado
                formato: { nombre: funcion.formato.nombre, precio: funcion.formato.precio }, // anidado
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
}
