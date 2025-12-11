import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { ApiServicePromociones } from '../../../services/api.service.promociones';
import { ApiServiceUsuario } from '../../../services/api.service.usuario';

@Component({
  selector: 'app-registrar-promocion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-promocion.html',
  styleUrl: './registrar-promocion.css',
})
export class RegistrarPromocion implements OnInit {
  form!: FormGroup;
  error: string | null = null;

  dias: any[] = [];
  tiposCliente: any[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiServicePromociones,
    private apiService2: ApiServiceUsuario,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      dia: ['', Validators.required],
      porcentajeDescuento: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      tipoClienteId: ['', Validators.required],
    });

    this.cargarDias();
    this.cargarTiposCliente();
  }

  cargarDias() {
    this.apiService.getAllDias().then((r) => (this.dias = r));
  }

  cargarTiposCliente() {
    this.apiService2.getAllTiposClientes().then((r) => (this.tiposCliente = r));
  }

  onSave() {
    if (this.form.invalid) {
      alert('Por favor, completa los campos correctamente.');
      return;
    }
    const v = this.form.value;
    const dto = {
      nombre: v.nombre,
      porcentajeDescuento: v.porcentajeDescuento,
      dia: v.dia,
      tipoClienteId: v.tipoClienteId,
    };
    this.apiService
      .createPromocion(dto)
      .then(() => {
        alert('Promoción creada correctamente.');
        this.router.navigate(['/promocion/lista']);
      })
      .catch((err) => {
        console.error('Error al crear la promoción:', err);
        alert('Error al crear la promoción. Por favor, inténtalo de nuevo más tarde.');
      });
  }

  volver() {
    this.router.navigate(['/promocion/lista']);
  }
}
