import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceFunciones } from '../../../services/api.service.funciones';

@Component({
    selector: 'app-lista-sala',
    templateUrl: './lista-sala.html',
    styleUrls: ['./lista-sala.css'],
    imports: [CommonModule],
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

    constructor(private router: Router, private apiService: ApiServiceFunciones) { }

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
                disponibilidad: sala.disponibilidad ? 'Disponible' : 'Fuera de servicio',
                fila: sala.fila,
                capacidad: sala.capacidad,
            }));

            console.log('[v0] Salas cargadas:', this.salas);
        } catch (error) {
            console.error('[v0] Error al cargar salas:', error);
            this.errorMessage = 'Error al cargar las salas. Por favor, intenta nuevamente.';
            this.salas = [];
        } finally {
            this.isLoading = false;
        }
    }

    selectRow(index: number) {
        this.selectedIndex = index;
    }

    editarSala() {
        if (this.selectedIndex !== null) {
            const id = this.salas[this.selectedIndex].id;
            this.router.navigate(['sala/editar', id]);
        } else {
            alert('Selecciona una sala primero');
        }
    }

    nuevaSala() {
        this.router.navigate(['sala/registrar']);
    }

    eliminar() {
        if (this.selectedIndex === null) {
            alert('Seleccioná una sala primero.');
            return;
        }

        const selectedC = this.salas[this.selectedIndex];

        if (confirm(`¿Estás seguro de que querés eliminar ?`)) {
            this.apiService
                .deleteSala(selectedC.id)
                .then(() => {
                    alert('Sala eliminada correctamente.');
                    this.salas.splice(this.selectedIndex!, 1);
                    this.selectedIndex = null;
                })
                .catch((error) => {
                    console.error('Error al eliminar', error);
                    alert('Ocurrió un error al eliminar');
                });
        }
    }
    volver() {
        this.router.navigate(['/home']);
    }
}
