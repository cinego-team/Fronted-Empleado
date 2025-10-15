import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface GeneroRow {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-lista-idioma',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-idioma.html',
  styleUrls: ['./lista-idioma.css']
})
export class ListaIdiomaComponent {
  generos: GeneroRow[] = [
    { id: 1, nombre: 'español' },
    { id: 2, nombre: 'ingles' }
  ];

  seleccion?: GeneroRow;

  constructor(private router: Router) {}

  seleccionar(row: GeneroRow) {
    this.seleccion = row;
  }

  nuevo() {
    this.router.navigate(['/idioma/registrar']);
  }

  editar() {
    
    this.router.navigate(['idioma/editar']);
  }

  eliminar() {
    
  }
  volver() {
    this.router.navigate(['/home']);
  }

}
