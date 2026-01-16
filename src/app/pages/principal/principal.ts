import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Header } from '../../shared/header/header';

@Component({
  selector: 'app-principal',
  imports: [Header],
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

  onPromociones() {
    this.router.navigate(['/promocion/lista']);
  }
  onEstado() {
    this.router.navigate(['/estado-pelicula/lista']);
  }
  onSalas() {
    this.router.navigate(['/sala/lista']);
  }
  onFormatos() {
    this.router.navigate(['/formato/lista']);
  }
  onTipoCliente() {
    this.router.navigate(['/tipo-cliente/lista']);
  }
  onVolver() {
    this.router.navigate(['/principal']);
  }
}
