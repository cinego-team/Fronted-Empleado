import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-promocion',
  imports: [],
  templateUrl: './editar-promocion.html',
  styleUrl: './editar-promocion.css'
})
export class EditarPromocion {
  constructor( private router: Router,) {
    
   }
  volver(){
    this.router.navigate(['/promociones']);
  }
}
