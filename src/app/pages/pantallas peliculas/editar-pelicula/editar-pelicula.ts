import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-pelicula',
  imports: [],
  templateUrl: './editar-pelicula.html',
  styleUrl: './editar-pelicula.css'
})
export class EditarPelicula {
constructor(private router: Router) {}
   onBack() {
    this.router.navigate(['/peliculas']);
  }
}
