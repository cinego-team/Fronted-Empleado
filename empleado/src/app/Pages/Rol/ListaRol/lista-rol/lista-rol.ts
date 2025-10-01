import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface GeneroRow {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-lista-rol',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-rol.html',
  styleUrls: ['./lista-rol.css']
})
export class ListaRolComponent {
  generos: GeneroRow[] = [
    { id: 1, nombre: 'Empleado' }
  ];

  seleccion?: GeneroRow;

  constructor(private router: Router) {}

  seleccionar(row: GeneroRow) {
    this.seleccion = row;
  }

  nuevo() {
    this.router.navigate(['/rol/registrar']);
  }

  editar() {
    
    this.router.navigate(['rol/editar']);
  }

  eliminar() {
    
  }
}

