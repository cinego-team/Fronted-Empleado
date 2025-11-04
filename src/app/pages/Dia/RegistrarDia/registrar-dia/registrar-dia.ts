import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-dia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-dia.html',  
  styleUrls: ['./registrar-dia.css']     
})

export class RegistrarDiaComponent {
  constructor(private router: Router) {}
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
    console.log('Registrando dia:', payload);

    this.form.reset();
  }
  volver(){
    this.router.navigate(['/dia/lista']);
  }
  inicio() {
    this.router.navigate(['/home']);
  }
}
