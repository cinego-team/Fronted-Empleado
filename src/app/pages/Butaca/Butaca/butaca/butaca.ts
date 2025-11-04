import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface ButacaRow {
  id: string;      // ej: "10C"
  numero: number;  // ej: 10
  fila: number;    // ej: 3  (A=1, B=2, ... E=5)
  letra: string;   // ej: "C" (para mostrar 10C)
}

@Component({
  selector: 'app-lista-butaca',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'./butaca.html',
  styleUrls: ['./butaca.css']
})


export class ButacaComponent {
  private router = inject(Router);

  // Config de sala (podés traerlo del backend)
  rows: string[] = ['E','D','C','B','A']; // de arriba hacia abajo
  cols = 15;
  aisleAfter: number[] = [3, 7, 11]; // “pasillos” visuales opcionales

  // Estructura por fila (similar a tu arreglo de 'generos')
  seatsByRow: Record<string, ButacaRow[]> = {};

  // selección al estilo de tus listas
  seleccion?: ButacaRow;

  constructor() {
    // Genero las butacas (como si fuese tu array hardcodeado de 'generos')
    for (const letra of this.rows) {
      this.seatsByRow[letra] = [];
      for (let c = 1; c <= this.cols; c++) {
        this.seatsByRow[letra].push({
          id: `${c}${letra}`,
          numero: c,
          fila: this.rowToNumber(letra),
          letra
        });
      }
    }
  }

  private rowToNumber(letra: string): number {
    // A=1, B=2, ... (ajustá si tu backend usa otra convención)
    const index = this.rows.indexOf(letra);
    return index >= 0 ? (this.rows.length - index) : 0;
  }

  isAisle(c: number): boolean {
    return this.aisleAfter.includes(c);
  }

  /** Igual que tu seleccionar(row) */
  seleccionar(b: ButacaRow) {
    this.seleccion = b;
  }
   nuevo() {
    this.router.navigate(['/butaca/registrar']);
  }

  editar() {
    
    this.router.navigate(['butaca/editar']);
  }

  eliminar() {
    
  }
  onBack() {
    this.router.navigate(['/home']);
  }

  inicio() {
    this.router.navigate(['/home']);
  }
  
}


