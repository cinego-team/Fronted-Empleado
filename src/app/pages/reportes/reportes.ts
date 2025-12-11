import { Component, OnInit } from '@angular/core';
import { ApiServiceVentas } from '../../services/api.service.ventas';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-reportes',
  imports: [],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css',
})
export class Reportes implements OnInit {
  // Datos
  horariosMasElegidos: any[] = [];
  entradasPorDia: any[] = [];

  // Gráficos
  chartHorarios: any;
  chartDias: any;

  constructor(private ventasService: ApiServiceVentas) {}

  async ngOnInit() {
    await this.cargarReporteHorarios();
    await this.cargarReporteEntradasPorDia();

    this.generarGraficoHorarios();
    this.generarGraficoEntradasPorDia();
  }

  //   Cargar datos del API

  async cargarReporteHorarios() {
    this.horariosMasElegidos = await this.ventasService.getHorariosMasElegidosMesActual();
  }

  async cargarReporteEntradasPorDia() {
    this.entradasPorDia = await this.ventasService.getEntradasPorDiaSemanaMesActual();
  }

  //   Gráfico 1 — Horarios más elegidos
  generarGraficoHorarios() {
    if (!this.horariosMasElegidos?.length) return;

    if (this.chartHorarios) this.chartHorarios.destroy();

    const labels = this.horariosMasElegidos.map((x) => x.horaFuncion);
    const data = this.horariosMasElegidos.map((x) => x.cantidad);

    this.chartHorarios = new Chart('graficoHorarios', {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: '',
            data,
            backgroundColor: 'rgba(255,245,240,0.9)',
            borderRadius: 6,
            borderSkipped: false,
          },
        ],
      },
      options: this.getDefaultOptions(),
    });
  }
  //   Gráfico 3 — Entradas por día de la semana

  generarGraficoEntradasPorDia() {
    if (!this.entradasPorDia?.length) return;

    if (this.chartDias) this.chartDias.destroy();

    const labels = this.entradasPorDia.map((x) => x.dia); // lunes, martes…
    const data = this.entradasPorDia.map((x) => x.cantidad);

    this.chartDias = new Chart('graficoDias', {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: '',
            data,
            backgroundColor: 'rgba(255,245,240,0.9)',
            borderRadius: 6,
            borderSkipped: false,
          },
        ],
      },
      options: this.getDefaultOptions(),
    });
  }

  //   Opciones comunes
  getDefaultOptions() {
    return {
      responsive: true,
      plugins: {
        legend: { display: false },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: '#f0e8e4',
            font: { size: 12 },
          },
          grid: {
            color: 'rgba(255,255,255,0.15)',
          },
        },
        x: {
          ticks: {
            color: '#f0e8e4',
            font: { size: 12 },
          },
          grid: {
            display: false,
          },
        },
      },
    };
  }
}
