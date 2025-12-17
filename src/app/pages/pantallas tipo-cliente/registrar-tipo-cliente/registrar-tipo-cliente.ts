import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceUsuario } from '../../../services/api.service.usuario';
import { EditTipoCliente } from '../tipos-cliente.dto';
import { Header } from '../../../shared/header/header';

@Component({
  selector: 'app-registrar-tipo-cliente',
  imports: [CommonModule, ReactiveFormsModule, Header],
  templateUrl: './registrar-tipo-cliente.html',
  styleUrl: './registrar-tipo-cliente.css',
})
export class RegistrarTipoCliente {
  form: FormGroup;
  tipoCliente: any;
  error: string | null = null;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiServiceUsuario,
    private router: Router
  ) {
    this.form = this.fb.group({
      denominacion: ['', [Validators.required, Validators.minLength(2)]],
      descripcion: ['', [Validators.required]],
    });
  }

  onSave() {
    if (this.form.invalid) {
      alert('Por favor, completa  los campos correctamente.');
      return;
    }
    const dto: EditTipoCliente = {
      Denominacion: this.form.value.denominacion,
      Descripcion: this.form.value.descripcion,
    };
    this.apiService
      .createTipoCliente(dto)
      .then(() => {
        alert('Tipo Cliente creado correctamente.');
        this.router.navigate(['/tipo-cliente/lista']);
      })
      .catch((error) => {
        console.error('Error al crear el tipo cliente:', error);
        alert('Error al crear el tipo cliente. Por favor, inténtalo de nuevo más tarde.');
      });
  }

  volver() {
    this.router.navigate(['/tipo-cliente/lista']);
  }

  inicio() {
    this.router.navigate(['/home']);
  }
}
