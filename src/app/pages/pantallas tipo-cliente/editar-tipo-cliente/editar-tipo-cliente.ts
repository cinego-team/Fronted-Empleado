
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-tipo-cliente',
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: './editar-tipo-cliente.html',
  styleUrl: './editar-tipo-cliente.css'
})
export class EditarTipoCliente implements OnInit {
      form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Inicializamos el formulario con validaciones
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  // Getter para usar f.nombre en el HTML
  get f() {
    return this.form.controls;
  }

  // Método al enviar el formulario
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Muestra errores si hay campos inválidos
      return;
    }

    console.log('Formulario válido, datos:', this.form.value);

    // Aquí podrías enviar al backend y luego resetear
    this.form.reset();
  }
}

