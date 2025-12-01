import { CommonModule } from "@angular/common"
import { Component, type OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { ApiService } from "../../../services/api.service"

@Component({
  selector: 'app-lista-sala',
  templateUrl: './lista-sala.html',
  styleUrls: ['./lista-sala.css'],
  imports: [CommonModule],
})

export class ListaSala implements OnInit {
  salas: Array<{
    id: number
    numero: number
    disponibilidad: string
    capacidad: number
  }> = []

  selectedIndex: number | null = null
  isLoading = true
  errorMessage = ""

  constructor(
    private router: Router,
    private apiService: ApiService,
  ) {}

  async ngOnInit() {
    await this.cargarSalas()
  }

  async cargarSalas() {
    try {
      this.isLoading = true
      this.errorMessage = ""

      const salasBackend = await this.apiService.getAllSalas()

      // Transformar datos del backend al formato del componente
      this.salas = salasBackend.map((sala) => ({
        id: sala.id,
        numero: sala.numero,
        disponibilidad: sala.disponibilidad ? "Disponible" : "Fuera de servicio",
        capacidad: sala.capacidad,
      }))

      console.log("[v0] Salas cargadas:", this.salas)
    } catch (error) {
      console.error("[v0] Error al cargar salas:", error)
      this.errorMessage = "Error al cargar las salas. Por favor, intenta nuevamente."
      this.salas = []
    } finally {
      this.isLoading = false
    }
  }

  selectRow(index: number) {
    this.selectedIndex = index;
  }

  editarSala() {
    if (this.selectedIndex !== null) {
      const id = this.salas[this.selectedIndex].id;
      this.router.navigate(['/editar-sala', id]);
    } else {
      alert('Selecciona una sala primero');
    }
  }
  nuevaSala() {
  this.router.navigate(['/registrar-sala']);
  }
  irListaFuncion() {
    this.router.navigate(['/lista-funcion']);
  }
}
