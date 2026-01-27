import { Component, OnInit } from '@angular/core';
import { ApiServiceVentas } from '../../services/api.service.ventas';
import { Chart } from 'chart.js/auto';
import { Header } from '../../shared/header/header';

@Component({
  selector: 'app-reportes',
  imports: [Header],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css',
})
export class Reportes implements OnInit {
  // Datos
  horariosMasElegidos: any[] = [];
  entradasPorDia: any[] = [];
  peliculasTrimestral: any[] = [];

  // Gráficos
  chartHorarios: any;
  chartDias: any;
  chartPeliculas: any;

  constructor(private ventasService: ApiServiceVentas) {}

  async ngOnInit() {
    await this.cargarReporteHorarios();
    await this.cargarReporteEntradasPorDia();
    await this.cargarReportePeliculasTrimestral();

    this.generarGraficoHorarios();
    this.generarGraficoEntradasPorDia();
    this.generarGraficoPeliculasTrimestral();
  }
  getTrimestreActual(): number {
    const mes = new Date().getMonth() + 1; // 1–12
    return Math.ceil(mes / 3);
  }

  getAnioActual(): number {
    return new Date().getFullYear();
  }

  //   Cargar datos del API
  async cargarReporteHorarios() {
    this.horariosMasElegidos = await this.ventasService.getHorariosMasElegidosMesActual();
  }

  async cargarReporteEntradasPorDia() {
    this.entradasPorDia = await this.ventasService.getEntradasPorDiaSemanaMesActual();
  }

  async cargarReportePeliculasTrimestral() {
    const trimestre = this.getTrimestreActual();
    const anio = this.getAnioActual();

    this.peliculasTrimestral = await this.ventasService.getPeliculasPorRangoTrimestral(
      trimestre,
      anio,
    );
  }

  //   Gráfico 1 — Horarios más elegidos
  generarGraficoHorarios() {
    if (!this.horariosMasElegidos?.length) return;

    if (this.chartHorarios) this.chartHorarios.destroy();

    const labels = this.horariosMasElegidos.map((x) => `${x.hora}:00`);  // Cambiado: x.horaFuncion -> x.hora
    const data = this.horariosMasElegidos.map((x) => Number(x.cantidad));  // Agregado: Number()

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

    const labels = this.entradasPorDia.map((x) => x.dia_semana);  // Cambiado: x.dia -> x.dia_semana
    const data = this.entradasPorDia.map((x) => Number(x.cantidad_entradas));  // Cambiado: x.cantidad -> x.cantidad_entradas + Number()

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
  //greafico 2-- Peliculas por rango trimestral
  generarGraficoPeliculasTrimestral() {
    if (!this.peliculasTrimestral?.length) return;
    if (this.chartPeliculas) this.chartPeliculas.destroy();

    const labels = this.peliculasTrimestral.map((x) => x.rango);
    const data = this.peliculasTrimestral.map((x) => Number(x.cantidad_ventas));  // Cambiado: x.cantidad_peliculas -> x.cantidad_ventas

    this.chartPeliculas = new Chart('graficoPeliculas', {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
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
      maintainAspectRatio: false,
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
