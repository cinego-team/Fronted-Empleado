import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-funcion',
  templateUrl: './lista-funcion.html',
  styleUrls: ['./lista-funcion.css'],
  imports: [CommonModule],
})

export class ListaFuncion {
  
  funciones = [
    { id: 1, pelicula: 'Superman', fecha: "15/09", hora: "17:30", disponible: "Disponible", sala: 1, formato: "2D" },
    { id: 1, pelicula: 'Superman', fecha: "16/09", hora: "20:30", disponible: "Proximamente", sala: 4, formato: "3D" },
  ];

  selectedIndex: number | null = null;

  constructor(private router: Router) {}

  selectRow(index: number) {
    this.selectedIndex = index;
  }

  editarFuncion() {
    if (this.selectedIndex !== null) {
      const id = this.funciones[this.selectedIndex].id;
      this.router.navigate(['/editar-funcion', id]);
    } else {
      alert('Selecciona una funcion primero');
    }
  }
  nuevaFuncion() {
  this.router.navigate(['/registrar-funcion']);
  }
  ver() {
    if (this.selectedIndex !== null) {
      const id = this.funciones[this.selectedIndex].id;
      this.router.navigate(['/ver-funcion', id]);
    } else {
      alert('Selecciona una funcion primero');
    }
  }
}
