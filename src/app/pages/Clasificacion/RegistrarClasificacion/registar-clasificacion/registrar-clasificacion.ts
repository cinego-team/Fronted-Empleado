import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-clasificacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-clasificacion.html',  
  styleUrls: ['./registrar-clasificacion.css']     
})

export class RegistrarClasificacionComponent {
  constructor() {
  }
  private router = inject(Router);

  private fb = inject(FormBuilder);

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
  });

  get f() { return this.form.controls; }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = { nombre: this.form.value.nombre?.trim() };
    // TODO: llamar a tu servicio HTTP para crear el género
    console.log('Registrando Clasificacion:', payload);

    // Reseteo opcional
    this.form.reset();
  }
  volver(){
    this.router.navigate(['/clasificacion/lista']);
  }
  inicio() {
    this.router.navigate(['/home']);
  }
}
