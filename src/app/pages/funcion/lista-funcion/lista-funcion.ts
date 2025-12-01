import { CommonModule } from "@angular/common"
import { Component, type OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { ApiService } from "../../../services/api.service"

@Component({
  selector: 'app-lista-funcion',
  templateUrl: './lista-funcion.html',
  styleUrls: ['./lista-funcion.css'],
  imports: [CommonModule],
})

export class Listafuncion implements OnInit {
  funciones: Array<{
    id: number;
    pelicula: string; 
    fecha: Date; 
    hora: Date;
    disponible: string; 
    sala: number; 
    formato: string
  }> = []

  selectedIndex: number | null = null
  isLoading = true
  errorMessage = ""

  constructor(
    private router: Router,
    private apiService: ApiService,
  ) {}

  async ngOnInit() {
    await this.cargarfunciones()
  }

  async cargarfunciones() {
    try {
      this.isLoading = true
      this.errorMessage = ""

      const funcionesBackend = await this.apiService.getAllFunciones()

      // Transformar datos del backend al formato del componente
      this.funciones = funcionesBackend.map((funcion) => ({
      id: funcion.id,
      pelicula: funcion.pelicula,
      fecha: funcion.fecha,
      hora: funcion.hora,
      disponible: funcion.disponible,
      sala: funcion.sala,
      formato: funcion.formato
      }))

      console.log("[v0] funciones cargadas:", this.funciones)
    } catch (error) {
      console.error("[v0] Error al cargar funcions:", error)
      this.errorMessage = "Error al cargar las funcions. Por favor, intenta nuevamente."
      this.funciones = []
    } finally {
      this.isLoading = false
    }
  }

  selectRow(index: number) {
    this.selectedIndex = index;
  }

  editarfuncion() {
    if (this.selectedIndex !== null) {
      const id = this.funciones[this.selectedIndex].id;
      this.router.navigate(['/editar-funcion', id]);
    } else {
      alert('Selecciona una funcion primero');
    }
  }
  nuevafuncion() {
  this.router.navigate(['/registrar-funcion']);
  }
  irListaFuncion() {
    this.router.navigate(['/lista-funcion']);
  }
}
