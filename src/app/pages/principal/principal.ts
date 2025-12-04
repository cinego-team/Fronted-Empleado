import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  imports: [],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal {
  constructor(private router: Router) {}
  onPelicula() {
    this.router.navigate(['/pelicula/lista']);
  }
  onFunciones() {
    this.router.navigate(['/funcion/lista']);
  }

  onIdiomas() {
    this.router.navigate(['/idioma/lista']);
  }
  onGenero() {
    this.router.navigate(['/genero/lista']);
  }
  onClasificacion() {
    this.router.navigate(['/clasificacion/lista']);
  }
  onVentas() {
    this.router.navigate(['/venta/lista']);
  }
  onPromociones() {
    this.router.navigate(['/promocion/lista']);
  }
  onEstado() {
    this.router.navigate(['/estado-pelicula/lista']);
  }
  onSalas() {
    this.router.navigate(['/sala/lista']);
  }

  inicio() {
    this.router.navigate(['/home']);
  }
}
