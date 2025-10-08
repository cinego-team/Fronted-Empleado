import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-formato',
  imports: [],
  standalone: true,
  templateUrl: './registrar-formato.html',
  styleUrl: './registrar-formato.css'
})
export class RegistrarFormato {
 constructor(private router: Router) {}

  registrar() {
    // Aquí va la lógica para guardar el nuevo formato
    console.log('Formato registrado');

    // Redirigir a la lista
    this.router.navigate(['/']);
  }
}
