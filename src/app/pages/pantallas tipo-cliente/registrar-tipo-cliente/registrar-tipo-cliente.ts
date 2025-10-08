import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-tipo-cliente',
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: './registrar-tipo-cliente.html',
  styleUrl: './registrar-tipo-cliente.css'
})
export class RegistrarTipoCliente implements OnInit {
form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Inicializamos el formulario con un campo "codigo"
    this.form = this.fb.group({
      codigo: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Getter para acceder fácilmente a los controles desde el HTML
  get f() {
    return this.form.controls;
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Marca errores
      return;
    }

    const codigo = this.form.value.codigo;
    console.log('Código ingresado:', codigo);

    // Aquí podrías hacer la llamada a tu servicio API para validar o registrar la entrada
    // this.miServicio.registrarEntrada(codigo).subscribe(...);

    this.form.reset(); // Limpiamos el formulario después de registrar
  }
}


