import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { FormBuilder, type FormGroup, Validators } from "@angular/forms"
import { ApiService } from "../../../services/api.service"

@Component({
  selector: "app-registrar-sala",
  imports: [],
  standalone: true,
  templateUrl: "./registrar-sala.html",
  styleUrl: "./registrar-sala.css",
})
export class RegistrarSala {
  salaForm: FormGroup
  loading = false
  errorMessage = ""

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService,
  ) {
    this.salaForm = this.fb.group({
      nroSala: ["", [Validators.required, Validators.min(1)]],
      capacidad: ["", [Validators.required, Validators.min(1)]],
      estaDisponible: [true],
    })
  }

  registrar() {
    if (this.salaForm.invalid) {
      alert('Por favor, completa  los campos correctamente.');
      return;
    } else if (this.salaForm.valid) {

      this.apiService
        .createSala(this.salaForm.value)
        .then(() => {
          alert('Sala creado correctamente.');
          this.router.navigate(['/sala']);
        })
        .catch((error) => {
          console.error('Error al crear el sala:', error);
          alert('Error al crear el sala. Por favor, inténtalo de nuevo más tarde.');
        });
    }
  }
}
