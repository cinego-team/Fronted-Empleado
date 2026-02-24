import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalStatusService } from '../../services/global-status.service';
import { ApiServiceVentas } from '../../services/api.service.ventas';
import { Header } from '../../shared/header/header';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [Header, CommonModule, FormsModule ],
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
    total: number;
    promocion?: {
      nombre: string;
      porcentajeDescuento: number;
    };
    cliente: {
      nombre: string;
      apellido: string;
      email: string;
    };
    estadoVenta: {
      nombre: string;
    };
    entradas: {
      id: number;
      esUsado: boolean;
    }[];
  }> = [];
  selectedRow: number | null = null;
  actualPage: number = 1;
  searchEmail: string = '';
  ventasOriginal: any[] = [];
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
      this.ventasOriginal = data;

      this.ventas = data
        .map(v => ({
          ...v,
          fecha: new Date(v.fecha)
        }))
        .sort((a, b) => b.nroVenta - a.nroVenta);

      this.ventas = data.map(v => ({...v,fecha: new Date(v.fecha)})).sort((a, b) => b.nroVenta - a.nroVenta); //  orden descendente
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
    this.router.navigate(['/principal']);
  }
  inicio() {
    this.router.navigate(['/principal']);
  }

  buscarPorEmail() {
  if (!this.searchEmail.trim()) {
    this.ventas = [...this.ventasOriginal].sort((a, b) => b.nroVenta - a.nroVenta);
    return;
  }

  this.ventas = this.ventasOriginal
    .filter(v =>
      v.cliente.email.toLowerCase().includes(this.searchEmail.toLowerCase())
    )
    .sort((a, b) => b.nroVenta - a.nroVenta);
  }
}
