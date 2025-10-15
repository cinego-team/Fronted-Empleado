import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-butaca',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-butaca.html',
  styleUrls: ['./registrar-butaca.css']
})
export class RegistrarButacaComponent {
  constructor(private router: Router) {}
  private fb = inject(FormBuilder);

  form = this.fb.group({
    numero: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.min(1)
      ]
    ],
    fila: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.min(1)
      ]
    ]
  });

  get f() { return this.form.controls; }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      numero: Number(this.form.value.numero),
      fila: Number(this.form.value.fila)
    };

    console.log('Registrando Butaca:', payload);
    // TODO: llamar a tu servicio HTTP para crear la butaca

    this.form.reset();
  }
   onBack() {
    this.router.navigate(['/butaca/butaca']);
  }
}
