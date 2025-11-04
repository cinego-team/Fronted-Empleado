import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-idioma',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-idioma.html',  
  styleUrls: ['./registrar-idioma.css']     
})

export class RegistrarIdiomaComponent {
  private fb = inject(FormBuilder);
  constructor(private router: Router) {}

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
    // TODO: llamar a tu servicio HTTP para crear el idioma
    console.log('Registrando idioma:', payload);

    // Reseteo opcional
    this.form.reset();
  }
   volver() {
    this.router.navigate(['/idioma/lista']);
  }
  inicio() {
    this.router.navigate(['/home']);
  }
}