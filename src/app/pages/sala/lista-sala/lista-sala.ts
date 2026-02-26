import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceFunciones } from '../../../services/api.service.funciones';
import { Header } from '../../../shared/header/header';

@Component({
    selector: 'app-lista-sala',
    templateUrl: './lista-sala.html',
    styleUrls: ['./lista-sala.css'],
    imports: [CommonModule, Header],
})
export class ListaSala implements OnInit {
    salas: Array<{
        id: number;
        numero: number;
        disponibilidad: boolean;
        cantFilas: number;

        capacidad: number;
    }> = [];

    selectedIndex: number | null = null;
    isLoading = true;
    errorMessage = '';

    constructor(
        private router: Router,
        private apiService: ApiServiceFunciones,
    ) { }

    async ngOnInit() {
        await this.cargarSalas();
    }

    async cargarSalas() {
        try {
            this.isLoading = true;
            this.errorMessage = '';

            const salasBackend = await this.apiService.getAllSalas();

            // Transformar datos del backend al formato del componente
            this.salas = salasBackend.map((sala) => ({
                id: sala.id,
                numero: sala.numero,
                disponibilidad: sala.disponibilidad,
                cantFilas: sala.cantFilas,
                capacidad: sala.capacidad,
            }));

        } catch (error) {
            console.error(' Error al cargar salas:', error);
            this.errorMessage = 'Error al cargar las salas. Por favor, intenta nuevamente.';
            this.salas = [];
        } finally {
            this.isLoading = false;
        }
    }

    selectRow(index: number) {
        this.selectedIndex = index;
    }

    editar() {
        if (this.selectedIndex === null) {
            alert('Seleccioná uno primero.');
            return;
        }
        const selected = this.salas[this.selectedIndex];
        this.router.navigate(['/sala/editar', selected.id], {
            state: {
                sala: selected,
            },
        });
    }

    nuevaSala() {
        this.router.navigate(['sala/registrar']);
    }

    volver() {
        this.router.navigate(['/home']);
    }
}
