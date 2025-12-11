import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiServicePromociones } from '../../../services/api.service.promociones';
import { ApiServiceUsuario } from '../../../services/api.service.usuario';
@Component({
  selector: 'app-editar-promocion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-promocion.html',
  styleUrl: './editar-promocion.css',
})
export class EditarPromocion {
  form!: FormGroup;

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

  async ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      dia: ['', Validators.required],
      porcentajeDescuento: ['', Validators.required],
      tipoCliente: ['', Validators.required],
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    await this.cargarDatos(id);
  }

  // CARGA DE DATOS

  async cargarDatos(id: number) {
    try {
      // Obtener promo
      this.promocion = await this.apiService.getPromocionById(id);

      // Llenar el form
      this.form.patchValue({
        nombre: this.promocion.nombre,
        dia: this.promocion.dia,
        porcentajeDescuento: this.promocion.porcentajeDescuento,
        tipoClienteId: this.promocion.tipoClienteId,
      });

      // Obtener días
      this.dias = await this.apiService.getAllDias();

      // Obtener tipos de cliente
      this.tiposCliente = await this.apiService2.getAllTiposClientes();
    } catch (err) {
      console.error(err);
      alert('Error al cargar los datos de la promoción.');
    }
  }

  // GUARDAR CAMBIOS

  onSave() {
    if (this.form.invalid) {
      alert('Completa todos los campos.');
      return;
    }

    const dataActualizada = {
      id: this.promocion.id,
      nombre: this.promocion.nombre,
      dia: this.promocion.dia,
      porcentajeDescuento: this.promocion.porcentajeDescuento,
      tipoClienteId: this.promocion.tipoClienteId,
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
