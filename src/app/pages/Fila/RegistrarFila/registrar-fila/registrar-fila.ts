import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar-fila',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-fila.html',  
  styleUrls: ['./registrar-fila.css']     
})

export class RegistrarFilaComponent {
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
    console.log('Registrando fila:', payload);

    // Reseteo opcional
    this.form.reset();
  }
}
