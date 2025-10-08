import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-editar-funcion',
  standalone: true,
  templateUrl: './editar-funcion.html',
  styleUrl: './editar-funcion.css',
  imports: [CommonModule],
})

export class EditarFuncion {
 constructor(private router: Router) {}

  editar() {
    // Aquí va la lógica para guardar el nuevo formato
    console.log('funcion editada');

    // Redirigir a la lista
    this.router.navigate(['/lista-funcion']);
  }
}
