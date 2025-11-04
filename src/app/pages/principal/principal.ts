import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  imports: [],
  templateUrl: './principal.html',
  styleUrl: './principal.css'
})
export class Principal {
  constructor(
    private router: Router,){}
  onPelicula(){
     this.router.navigate(['/peliculas']);
  }
  onFunciones(){
     this.router.navigate(['/funciones']);
  }
  onButacas(){
     this.router.navigate(['butaca/butaca']);
  }
  onIdiomas(){
     this.router.navigate(['/idioma/lista']);
  }
   onGenero(){
     this.router.navigate(['/genero/lista']);
  }
   onClasificacion(){
     this.router.navigate(['/clasificacion/lista']);
  }
   onVentas(){
     this.router.navigate(['/ventas']);
  }
   onPromociones(){
     this.router.navigate(['/promociones']);
  }
   onEstado(){
     this.router.navigate(['/estados-peliculas']);
  }
   onFilas(){
     this.router.navigate(['/fila/lista']);
  }
   onEntradas(){
     this.router.navigate(['/entradas']);
  }
   onDias(){
     this.router.navigate(['/dia/lista']);
  }
  inicio() {
    this.router.navigate(['/home']);
  }

}
