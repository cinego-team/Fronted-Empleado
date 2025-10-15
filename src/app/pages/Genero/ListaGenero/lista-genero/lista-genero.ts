import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface GeneroRow {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-lista-genero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-genero.html',
  styleUrls: ['./lista-genero.css']
})
export class ListaGeneroComponent {
  generos: GeneroRow[] = [
    { id: 1, nombre: 'comedia' },
    { id: 2, nombre: 'drama' },
    { id: 3, nombre: 'acción' },
    { id: 4, nombre: 'terror' }
  ];

  seleccion?: GeneroRow;

  constructor(private router: Router) {}

  seleccionar(row: GeneroRow) {
    this.seleccion = row;
  }

  nuevo() {
    this.router.navigate(['/genero/registrar']);
  }

  editar() {
    
    this.router.navigate(['genero/editar']);
  }

  eliminar() {
    
  }
    volver() {
    this.router.navigate(['/home']);
  }
}

