import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface GeneroRow {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-lista-dia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-dia.html',
  styleUrls: ['./lista-dia.css']
})
export class ListaDiaComponent {
  generos: GeneroRow[] = [
    { id: 1, nombre: 'Lunes' },
    { id: 2, nombre: 'Martes' },
    { id: 3, nombre: 'Miercoles' },
    { id: 4, nombre: 'Jueves' }
  ];

  seleccion?: GeneroRow;

  constructor(private router: Router) {}

  seleccionar(row: GeneroRow) {
    this.seleccion = row;
  }

  nuevo() {
    this.router.navigate(['/dia/registrar']);
  }

  editar() {
    
    this.router.navigate(['dia/editar']);
  }

  eliminar() {
    
  }
}

