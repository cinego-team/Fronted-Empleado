import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ApiServicePelicula } from '../../../../services/api.service.pelicula';
import { Header } from '../../../../shared/header/header';

interface ClasificacionRow {
    id: number;
    nombre: string;
}

@Component({
    selector: 'app-lista-clasificacion',
    standalone: true,
    imports: [CommonModule, Header],
    templateUrl: './lista-clasificacion.html',
    styleUrls: ['./lista-clasificacion.css'],
})
export class ListaClasificacionComponent {
    constructor(
        private router: Router,
        private readonly apiService: ApiServicePelicula,
    ) { }
    clasificaciones: Array<{
        id: number;
        nombre: string;
    }> = [];

    ngOnInit(): void {
        this.initialization();
    }

    async initialization(): Promise<void> {
        const data = await this.apiService.getAllClasificaciones();
        if (data.length === 0) {
            alert('No hay clasificaciones para mostrar.');
            return;
        }
        this.clasificaciones = data;
    }
    selec: number | null = null;

    seleccionar(index: number) {
        this.selec = index;
    }

    eliminar(): void {
        if (this.selec === null) {
            alert('Seleccioná una clasificación primero.');
            return;
        }

        const selectedC = this.clasificaciones[this.selec];

        if (confirm(`¿Estás seguro de que querés eliminar ?`)) {

            this.apiService
                .deleteClasificacion(selectedC.id)
                .then(() => {
                    alert('Clasificación eliminada correctamente.');
                    this.clasificaciones.splice(this.selec!, 1);
                    this.selec = null;
                })
                .catch((error) => {
                    console.error('Error al eliminar la clasificación:', error);
                    alert('Ocurrió un error al eliminar la clasificación.');
                });
        }
    }

    nuevo() {
        this.router.navigate(['/clasificacion/registrar']);
    }

    editar() {
        if (this.selec === null) {
            alert('Seleccioná uno primero.');
            return;
        }
        const selected = this.clasificaciones[this.selec];
        this.router.navigate(['/clasificacion/editar', selected.id], {
            state: {
                clasificacion: selected,
            },
        });
    }

    volver() {
        this.router.navigate(['/home']);
    }
}
