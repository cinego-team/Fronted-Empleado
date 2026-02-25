import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiServicePelicula } from '../../../../services/api.service.pelicula';
import { Header } from '../../../../shared/header/header';

@Component({
    selector: 'app-lista-genero',
    standalone: true,
    imports: [CommonModule, Header],
    templateUrl: './lista-genero.html',
    styleUrls: ['./lista-genero.css'],
})
export class ListaGeneroComponent {
    constructor(private router: Router, private readonly apiService: ApiServicePelicula) { }

    generos: Array<{ id: number; nombre: string }> = [];
    selec: number | null = null;

    // Paginacion
    currentPage = 1;
    pageSize = 10;
    hasMore = true;

    ngOnInit(): void {
        this.loadGeneros();
    }

    async loadGeneros(): Promise<void> {
        const data = await this.apiService.getAllGeneros(this.currentPage, this.pageSize);
        if (data.length === 0 && this.currentPage === 1) {
            alert('No hay generos para mostrar.');
            return;
        }
        this.generos = data;
        // Si devuelve menos de pageSize, no hay mas paginas
        this.hasMore = data.length === this.pageSize;
    }

    nextPage(): void {
        if (this.hasMore) {
            this.currentPage++;
            this.selec = null;
            this.loadGeneros();
        }
    }

    prevPage(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.selec = null;
            this.loadGeneros();
        }
    }

    seleccionar(rowId: number) {
        this.selec = rowId;
    }

    eliminar(): void {
        if (this.selec === null) {
            alert('Selecciona un genero primero.');
            return;
        }
        const selectedG = this.generos[this.selec];
        if (confirm(`¿Estas seguro de que queres eliminar?`)) {
            this.apiService
                .deleteGenero(selectedG.id)
                .then(() => {
                    alert('Genero eliminado correctamente.');
                    this.loadGeneros();  // Recargar la pagina actual
                    this.selec = null;
                })
                .catch((error) => {
                    console.error('Error al eliminar', error);
                    alert('Ocurrio un error al eliminar');
                });
        }
    }

    nuevo() {
        this.router.navigate(['/genero/registrar']);
    }

    editar() {
        if (this.selec === null) {
            alert('Selecciona uno primero.');
            return;
        }
        const selected = this.generos[this.selec];
        this.router.navigate(['/genero/editar', selected.id], {
            state: { genero: selected },
        });
    }

    volver() {
        this.router.navigate(['/home']);
    }
}