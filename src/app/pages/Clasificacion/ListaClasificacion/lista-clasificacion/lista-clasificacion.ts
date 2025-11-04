import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface GeneroRow {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-lista-clasificacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-clasificacion.html',
  styleUrls: ['./lista-clasificacion.css']
})
export class ListaClasificacionComponent {
  generos: GeneroRow[] = [
    { id: 1, nombre: 'ATP' },
    { id: 2, nombre: '+16' }
  ];

  seleccion?: GeneroRow;

  constructor(private router: Router) {}

  seleccionar(row: GeneroRow) {
    this.seleccion = row;
  }

  nuevo() {
    this.router.navigate(['/clasificacion/registrar']);
  }

  editar() {
    
    this.router.navigate(['clasificacion/editar']);
  }

  eliminar() {
    
  }
  volver(){
    this.router.navigate(['/home']);
  }
  inicio() {
    this.router.navigate(['/home']);
  }
}
