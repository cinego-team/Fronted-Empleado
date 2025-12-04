import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalStatusService } from '../../services/global-status.service';
import { ApiServiceVentas } from '../../services/api.service.ventas';

@Component({
  selector: 'app-ventas',
  imports: [],
  templateUrl: './ventas.html',
  styleUrl: './ventas.css',
})
export class Ventas {
  constructor(
    private router: Router,
    private readonly apiService: ApiServiceVentas,
    private readonly globalStatusService: GlobalStatusService
  ) {}
  ventas: Array<{
    nroVenta: number;
    fecha: Date;
    hora: Date;
    total: number;
    promocionId?: number;
  }> = [];
  selectedRow: number | null = null;
  actualPage: number = 1;
  ngOnInit(): void {
    this.initialization();
  }
  async initialization(): Promise<void> {
    this.globalStatusService.setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500)); //Decorativo

    try {
      const data = await this.apiService.getVentas();

      if (data.length === 0) {
        alert('No hay ventas para mostrar.');
        this.globalStatusService.setLoading(false);
        this.actualPage--;
        return;
      }

      this.ventas = data;
    } catch (error) {
      console.error('Error al cargar ventas:', error);
      alert('Error al cargar las ventas. Por favor intente nuevamente.');
    } finally {
      this.globalStatusService.setLoading(false);
    }
  }
  selectRow(rowId: number) {
    this.selectedRow = rowId;
  }
  OnBack() {
    this.router.navigate(['/home']);
  }
  inicio() {
    this.router.navigate(['/home']);
  }
}
