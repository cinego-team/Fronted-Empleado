import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { FormBuilder, type FormGroup, Validators } from "@angular/forms"
import { ApiService } from "../../../../services/api.service"

@Component({
  selector: "app-registrar-rol",
  imports: [],
  standalone: true,
  templateUrl: "./registrar-rol.html",
  styleUrl: "./registrar-rol.css",
})
export class RegistrarRolComponent {
  rolForm: FormGroup
  loading = false
  errorMessage = ""

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService,
  ) {
    this.rolForm = this.fb.group({
      nombre: ["", [Validators.required, Validators.minLength(3)]],
    })
  }

  registrar() {
    if (this.rolForm.invalid) {
      alert('Por favor, completa  los campos correctamente.');
      return;
    } else if (this.rolForm.valid) {

      this.apiService
        .createRol(this.rolForm.value)
        .then(() => {
          alert('rol creado correctamente.');
          this.router.navigate(['/rol']);
        })
        .catch((error) => {
          console.error('Error al crear el rol:', error);
          alert('Error al crear el rol. Por favor, inténtalo de nuevo más tarde.');
        });
    }
  }
}
