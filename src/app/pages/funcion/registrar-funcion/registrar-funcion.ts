import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-registrar-funcion',
  standalone: true,
  templateUrl: './registrar-funcion.html',
  styleUrl: './registrar-funcion.css',
  imports: [CommonModule],
})

export class RegistrarFuncion {
 constructor(private router: Router) {}

  registrar() {
    // Aquí va la lógica para guardar el nuevo formato
    console.log('funcion registrada');

    // Redirigir a la lista
    this.router.navigate(['/funciones']);
  }
   volver() {
    this.router.navigate(['/funciones']);
  }
}
