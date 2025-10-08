import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-editar-sala',
  imports: [],
  templateUrl: './editar-sala.html',
  styleUrl: './editar-sala.css' 
})
export class EditarSala implements OnInit {
  salaForm: FormGroup | undefined;
  salaId!: number;

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this.salaForm = this.fb.group({
      id: [''],       // Aquí irá el id
      nombre: [''],
      capacidad: ['']
    });}

  ngOnInit(): void {
    const salaId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.salaForm) {
      this.salaForm.patchValue({ id: salaId });
    }
  }

  guardar() {
    // Aquí podrías agregar la lógica para guardar los cambios
    console.log('Sala guardado', this.salaId);

    // Redirigir a la lista
    this.router.navigate(['/lista-sala']);
  }

}


