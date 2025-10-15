import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"
import { ApiService } from "../../../services/api.service"
import { Router } from '@angular/router';

@Component({
  selector: "app-pelicula",
  standalone: true, // si tu proyecto usa standalone components
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./pelicula.html",
  styleUrls: ["./pelicula.css"], // ✅ corregido (plural)
})
export class Pelicula implements OnInit {
  peliculaForm!: FormGroup
  peliculaId!: number
  pelicula: any = {} // ✅ agregado para usar en el template

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    // 1. Obtener ID desde la ruta
    this.peliculaId = Number(this.route.snapshot.paramMap.get("id"))

    // 2. Inicializar formulario vacío
    this.peliculaForm = this.fb.group({
      id: [""],
      titulo: [""],
      estado: [""],
      duracion: [""],
      clasificacion: [""],
      fechaEstreno: [""],
      genero: [""],
      director: [""],
      idioma: [""],
      sinopsis: [""],
      imagen: [""], // ✅ agregué imagen porque en tu HTML la usás
    })

    // 3. Llamar al servicio
    try {
      this.pelicula = await this.apiService.getPeliculaById(this.peliculaId)

      // Actualizar el form también (por si luego querés edición)
      this.peliculaForm.patchValue(this.pelicula)
    } catch (err) {
      console.error("Error cargando la película", err)
    }
  }

 onBack() {
    this.router.navigate(['/peliculas']);
  }
}
