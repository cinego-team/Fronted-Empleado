import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiServicePromociones } from '../../../services/api.service.promociones';
import { ApiServiceUsuario } from '../../../services/api.service.usuario';
import { Header } from '../../../shared/header/header';
@Component({
  selector: 'app-editar-promocion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Header],
  templateUrl: './editar-promocion.html',
  styleUrl: './editar-promocion.css',
})
export class EditarPromocion {
  form!: FormGroup;
  originalPromocion: any;
  promocion: any;
  dias: any[] = [];
  tiposCliente: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiServicePromociones,

    private apiService2: ApiServiceUsuario
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
      const navState =
      (this.router.getCurrentNavigation()?.extras.state as any)?.promocion ??
      (history.state as any)?.promocion;

    if (!navState) {
      alert('No se encontró la promoción. Volvé al listado.');
      this.router.navigate(['/promocion/lista']);
      return;
    }

    this.promocion = { ...navState };
    this.originalPromocion = { ...navState };

    this.form = this.fb.group({
      nombre: [this.promocion.nombre, Validators.required],
      porcentajeDescuento: [
        this.promocion.porcentajeDescuento,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      tipoClienteId: [this.promocion.tipoCliente?.id, Validators.required],  
      dia: [this.promocion.dia?.id, Validators.required],
    });
    this.cargarDias();
    this.cargarTiposCliente();
  }
  cargarDias() {
    this.apiService.getAllDias().then((data) => {
      this.dias = data;
    });
  }
  cargarTiposCliente() {
    this.apiService2.getAllTiposClientes().then((data) => {
      this.tiposCliente = data;
    });
  }

  // GUARDAR CAMBIOS

  onSave() {
    if (this.form.invalid) {
      alert('Completa todos los campos.');
      return;
    }

    const formValues = this.form.value;
    const dataActualizada = {
      id: this.promocion.id,
      nombre: formValues.nombre,
      porcentajeDescuento: formValues.porcentajeDescuento,
      tipoClienteId: formValues.tipoClienteId,
      diaId: formValues.dia,
    };

    this.apiService
      .updatePromocion(dataActualizada)
      .then(() => {
        alert('Promoción actualizada correctamente.');
        this.router.navigate(['/promocion/lista']);
      })
      .catch((err) => {
        console.error(err);
        alert('Error al actualizar la promoción.');
      });
  }

  volver() {
    this.router.navigate(['/promocion/lista']);
  }
}
