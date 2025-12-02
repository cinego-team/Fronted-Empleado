import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ActivatedRoute, Router } from "@angular/router"
import { ApiService } from "../../../services/api.service"

@Component({
  selector: "app-ver-funcion",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./ver-funcion.html",
  styleUrls: ["./ver-funcion.css"],
})
export class VerFuncion implements OnInit {
  funcion: {
    id: number
    pelicula: string
    fecha: Date
    hora: Date
    disponible: string
    sala: number
    formato: string
  } | null = null

  isLoading = true
  errorMessage = ""

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    const funcionId = this.route.snapshot.paramMap.get("id")
    if (funcionId) {
      this.cargarFuncion(+funcionId)
    } else {
      this.errorMessage = "No se proporcionó un ID de función válido."
      this.isLoading = false
    }
  }

  async cargarFuncion(id: number): Promise<void> {
    try {
      this.isLoading = true
      this.errorMessage = ""

      this.funcion = await this.apiService.getFuncionById(id)

      console.log("[v0] Función cargada:", this.funcion)
    } catch (error) {
      console.error("[v0] Error al cargar función:", error)
      this.errorMessage = "Error al cargar la función. Por favor, intenta nuevamente."
      this.funcion = null
    } finally {
      this.isLoading = false
    }
  }

  volver() {
    this.router.navigate(["/funcion/lista"])
  }

  inicio() {
    this.router.navigate(["/home"])
  }
}