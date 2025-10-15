import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-pelicula',
  imports: [],
  templateUrl: './registrar-pelicula.html',
  styleUrl: './registrar-pelicula.css'
})
export class RegistrarPelicula {

 constructor(private router: Router) {}
  OnBack() {
    this.router.navigate(['/peliculas']);
  }
}
