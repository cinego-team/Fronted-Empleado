import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface GeneroRow {
  id: number;
  numero: string;
}

@Component({
  selector: 'app-lista-Fila',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-fila.html',
  styleUrls: ['./lista-fila.css']
})
export class ListaFilaComponent {
  generos: GeneroRow[] = [
    { id: 1, numero: '1' },
    { id: 2, numero: '2' }
  ];

  seleccion?: GeneroRow;

  constructor(private router: Router) {}

  seleccionar(row: GeneroRow) {
    this.seleccion = row;
  }

  nuevo() {
    this.router.navigate(['/fila/registrar']);
  }

  editar() {
    
    this.router.navigate(['fila/editar']);
  }

  eliminar() {
    
  }
  volver(){
    this.router.navigate(['/home']);
  }
}
