import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-sala',
  templateUrl: './lista-sala.html',
  styleUrls: ['./lista-sala.css'],
  imports: [CommonModule],
})

export class ListaSala {
  
  salas = [
    { id: 1, numero: '1', disponibilidad: "Disponible", capacidad: 100 },
    { id: 2, numero: '2', disponibilidad: "Fuera de servicio", capacidad: 150 },
  ];

  selectedIndex: number | null = null;

  constructor(private router: Router) {}

  selectRow(index: number) {
    this.selectedIndex = index;
  }

  editarSala() {
    if (this.selectedIndex !== null) {
      const id = this.salas[this.selectedIndex].id;
      this.router.navigate(['/editar-sala', id]);
    } else {
      alert('Selecciona una sala primero');
    }
  }
  nuevaSala() {
  this.router.navigate(['/registrar-sala']);
  }
  irListaFuncion() {
    this.router.navigate(['/lista-funcion']);
  }
}
