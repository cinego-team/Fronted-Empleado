import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface GeneroRow {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-lista-permiso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-permiso.html',
  styleUrls: ['./lista-permiso.css']
})
export class ListaPermisoComponent {
  generos: GeneroRow[] = [
    { id: 1, nombre: 'administrador' },
    { id: 2, nombre: 'usuario' }
  ];

  seleccion?: GeneroRow;

  constructor(private router: Router) {}

  seleccionar(row: GeneroRow) {
    this.seleccion = row;
  }

  nuevo() {
    this.router.navigate(['/permiso/registrar']);
  }

  editar() {
    
    this.router.navigate(['permiso/editar']);
  }

  eliminar() {
    
  }
}
