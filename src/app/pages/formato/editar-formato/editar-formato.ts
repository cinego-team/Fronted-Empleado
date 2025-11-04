import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-formato',
  imports: [],
  templateUrl: './editar-formato.html',
  styleUrl: './editar-formato.css'
})
export class EditarFormato implements OnInit {
  formatoId!: number;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.formatoId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID del formato a editar:', this.formatoId);
  }

  guardar() {
    // Aquí podrías agregar la lógica para guardar los cambios
    console.log('Formato guardado', this.formatoId);

    // Redirigir a la lista
    this.router.navigate(['/']);
  }
  inicio() {
    this.router.navigate(['/home']);
  }
}


