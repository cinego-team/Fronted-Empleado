import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { FormBuilder, type FormGroup, Validators } from "@angular/forms"
import { ApiService } from "../../../services/api.service"

@Component({
  selector: "app-registrar-funcion",
  imports: [],
  standalone: true,
  templateUrl: "./registrar-funcion.html",
  styleUrl: "./registrar-funcion.css",
})
export class Registrarfuncion {
  funcionForm: FormGroup
  loading = false
  errorMessage = ""

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService,
  ) {
    this.funcionForm = this.fb.group({
      nrofuncion: ["", [Validators.required, Validators.min(1)]],
      capacidad: ["", [Validators.required, Validators.min(1)]],
      estaDisponible: [true],
    })
  }

  registrar() {
    if (this.funcionForm.invalid) {
      alert('Por favor, completa  los campos correctamente.');
      return;
    } else if (this.funcionForm.valid) {

      this.apiService
        .createFuncion(this.funcionForm.value)
        .then(() => {
          alert('funcion creado correctamente.');
          this.router.navigate(['/funcion']);
        })
        .catch((error) => {
          console.error('Error al crear el funcion:', error);
          alert('Error al crear el funcion. Por favor, inténtalo de nuevo más tarde.');
        });
    }
  }
}