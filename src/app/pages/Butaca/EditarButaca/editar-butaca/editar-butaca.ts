import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-butaca',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-butaca.html',
  styleUrls: ['./editar-butaca.css']
})
export class EditarButacaComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);

  // Form con ID deshabilitado (solo lectura)
  form = this.fb.group({
    id: [{ value: '', disabled: true }],
    numero: [
      '',
      [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1)]
    ],
    fila: [
      '',
      [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1)]
    ]
  });

  get f() { return this.form.controls; }

  constructor() {
    // Ejemplo: precargar con params o datos traídos de tu servicio
    const id = this.route.snapshot.paramMap.get('id') ?? '1';
    // TODO: reemplazar por fetch al backend -> this.butacaService.get(id)
    const butacaMock = { id, numero: 12, fila: 5 };

    // setValue en id (aunque esté disabled) usando getRawValue/patchValue
    this.form.patchValue({
      id: butacaMock.id,
      numero: String(butacaMock.numero),
      fila: String(butacaMock.fila),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // getRawValue para incluir el id deshabilitado
    const raw = this.form.getRawValue();
    const payload = {
      id: raw.id,
      numero: Number(raw.numero),
      fila: Number(raw.fila)
    };

    console.log('Guardando Butaca:', payload);
    // TODO: llamar a tu servicio HTTP para actualizar la butaca

    // Opcional: feedback / navegación
    // this.router.navigate(['/butacas']);
  }
}

//probando
