import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-ver-funcion',
  standalone: true,
  templateUrl: './ver-funcion.html',
  styleUrl: './ver-funcion.css',
  imports: [CommonModule],
})

export class VerFuncion {
 constructor(private router: Router) {}

  volver() {
    // Aquí va la lógica para guardar el nuevo formato
    console.log('Regreando a la lista...');

    // Redirigir a la lista
    this.router.navigate(['/funciones']);
  }
  inicio() {
    this.router.navigate(['/home']);
  }
}
