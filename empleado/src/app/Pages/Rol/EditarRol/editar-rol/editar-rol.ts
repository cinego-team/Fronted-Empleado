import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-rol',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-rol.html',
  styleUrls: ['./editar-rol.css'],
})
export class EditarRolComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  // TODO: inyectar tu servicio real, ej:
  // private generoSrv = inject(GeneroService);

  form = this.fb.group({
    id: [{ value: '', disabled: true }],        // ID solo lectura
    nombre: ['', [Validators.required, Validators.minLength(2)]],
  });

  get f() { return this.form.controls; }

  ngOnInit(): void {
    // Si vienes con /genero/editar/:id, lo agarramos y precargamos
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.form.patchValue({ id });
      // (Opcional) cargar datos desde backend:
      // this.generoSrv.obtenerPorId(id).subscribe(g =>
      //   this.form.patchValue({ nombre: g.nombre })
      // );
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Como 'id' está disabled, úsalo desde getRawValue()
    const payload = this.form.getRawValue(); // { id, nombre }
    console.log('Guardando género:', payload);

    // TODO: this.generoSrv.actualizar(payload.id!, { nombre: payload.nombre! }).subscribe(...)
  }
}
