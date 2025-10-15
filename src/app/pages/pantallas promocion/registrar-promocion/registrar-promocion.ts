import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-promocion',
  imports: [],
  templateUrl: './registrar-promocion.html',
  styleUrl: './registrar-promocion.css'
})
export class RegistrarPromocion {
 
  constructor( private router: Router,) {
    
   }
  volver(){
    this.router.navigate(['/promociones']);
  }

}
