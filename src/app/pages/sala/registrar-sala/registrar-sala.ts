import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-sala',
  imports: [],
  standalone: true,
  templateUrl: './registrar-sala.html',
  styleUrl: './registrar-sala.css'
})
export class RegistrarSala {
 constructor(private router: Router) {}

  registrar() {
    // Aquí va la lógica para guardar el nuevo formato
    console.log('Sala registrada');

    // Redirigir a la lista
    this.router.navigate(['/lista-sala']);
  }
}
