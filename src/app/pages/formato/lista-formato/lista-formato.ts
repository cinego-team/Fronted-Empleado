import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-formato',
  templateUrl: './lista-formato.html',
  styleUrls: ['./lista-formato.css'],
  imports: [CommonModule],
})

export class ListaFormato {
  
  formatos = [
    { id: 1, nombre: '2D', precio: 1000 },
    { id: 2, nombre: '3D', precio: 1500 },
  ];

  selectedIndex: number | null = null;

  constructor(private router: Router) {}

  selectRow(index: number) {
    this.selectedIndex = index;
  }

  editarFormato() {
    if (this.selectedIndex !== null) {
      const id = this.formatos[this.selectedIndex].id;
      console.log('Redirigiendo a editar-formato', id);
      this.router.navigate(['/editar-formato', id]);
    } else {
      alert('Selecciona un formato primero');
    }
  }
  nuevoFormato() {
  this.router.navigate(['/registrar-formato']);
  }
  irListaSala() {
    this.router.navigate(['/lista-sala']);
  }
}
