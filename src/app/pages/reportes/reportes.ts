import { Component, AfterViewInit } from '@angular/core';
import { ApiServiceVentas } from '../../services/api.service.ventas';
import { Chart } from 'chart.js/auto';
import { Header } from '../../shared/header/header';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reportes',
  imports: [Header],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css',
})
export class Reportes implements AfterViewInit {
  datosHorarios: any[] = [];
  datosDiasSemana: any[] = [];
  datosTrimestral: any[] = [];

  chartHorarios: any;
  chartDias: any;
  chartPeliculas: any;

  constructor(
    private ventasService: ApiServiceVentas,
    private router: Router,
  ) {}

  async ngAfterViewInit() {
    await this.cargarDatos();
  }

  async cargarDatos() {
    try {
      this.datosDiasSemana = await this.ventasService.getHorariosMasElegidosMesActual();
      this.datosHorarios = await this.ventasService.getEntradasPorDiaSemanaMesActual();

      const anio = this.getAnioActual();
      // Pasamos trimestre 1 pero el backend ahora ignora este parámetro y devuelve todos
      this.datosTrimestral = await this.ventasService.getPeliculasPorRangoTrimestral(1, anio);

      this.generarGraficoHorarios();
      this.generarGraficoEntradasPorDia();
      this.generarGraficoPeliculasTrimestral();
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  }

  getTrimestreActual(): number {
    const mes = new Date().getMonth() + 1;
    return Math.ceil(mes / 3);
  }

  getAnioActual(): number {
    return new Date().getFullYear();
  }

  getChartOptions(rotateLabels: boolean) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: '#f5e6e0',
            font: { size: 12, weight: 'bold' as const },
            padding: 20,
          },
        },
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          padding: 12,
          cornerRadius: 8,
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#f5e6e0',
            font: { size: 10 },
            maxRotation: rotateLabels ? 90 : 0,
            minRotation: rotateLabels ? 45 : 0,
          },
          grid: { display: false },
          border: { color: 'rgba(255,255,255,0.2)' },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: '#f5e6e0',
            font: { size: 11 },
            stepSize: 1,
          },
          grid: { color: 'rgba(255,255,255,0.1)' },
          border: { color: 'rgba(255,255,255,0.2)' },
        },
      },
    };
  }

  createGradient(ctx: CanvasRenderingContext2D, chartArea: any) {
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, '#e8b4b4');
    gradient.addColorStop(1, '#fde8e8');
    return gradient;
  }

  // Gráfico 1 — Horarios (etiquetas rotadas)
  generarGraficoHorarios() {
    if (this.chartHorarios) this.chartHorarios.destroy();

    const todasLasHoras: string[] = [];
    for (let h = 0; h < 24; h++) {
      todasLasHoras.push(`${h.toString().padStart(2, '0')}:00`);
      todasLasHoras.push(`${h.toString().padStart(2, '0')}:30`);
    }

    // Crear un mapa con los datos del API
    const ventasPorHora: { [key: string]: number } = {};
    this.datosHorarios.forEach((x) => {
      // El API ahora devuelve la hora completa (ej: "19:30")
      // Solo necesitamos asegurarnos de que tenga el formato correcto HH:MM
      let horaFormateada = x.hora;

      // Si la hora no tiene los 2 dígitos al inicio, agregar el 0
      if (horaFormateada.length === 4) {
        horaFormateada = '0' + horaFormateada; // "9:30" -> "09:30"
      }

      ventasPorHora[horaFormateada] = (ventasPorHora[horaFormateada] || 0) + Number(x.cantidad);
    });

    console.log('[v0] ventasPorHora:', ventasPorHora);

    // Asignar 0 a las horas sin ventas
    const data = todasLasHoras.map((hora) => ventasPorHora[hora] || 0);

    const canvas = document.getElementById('graficoHorarios') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;

    this.chartHorarios = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: todasLasHoras,
        datasets: [
          {
            label: 'Ventas por horario',
            data,
            backgroundColor: (context) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;
              if (!chartArea) return '#fde8e8';
              return this.createGradient(ctx, chartArea);
            },
            borderRadius: 4,
            borderSkipped: false,
          },
        ],
      },
      options: this.getChartOptions(true),
    });
  }

  // Gráfico 2 — Trimestres (etiquetas SIN rotar)
  // Gráfico 2 — Trimestres
  generarGraficoPeliculasTrimestral() {
    if (this.chartPeliculas) this.chartPeliculas.destroy();

    const trimestres = ['1er Trimestre', '2do Trimestre', '3er Trimestre', '4to Trimestre'];

    // El API ahora devuelve [{trimestre: '1', cantidad_ventas: '10'}, ...]
    const ventasPorTrimestre: { [key: string]: number } = {};
    this.datosTrimestral.forEach((x) => {
      ventasPorTrimestre[x.trimestre] = Number(x.cantidad_ventas);
    });

    // Mapear a los 4 trimestres
    const data = [
      ventasPorTrimestre['1'] || 0,
      ventasPorTrimestre['2'] || 0,
      ventasPorTrimestre['3'] || 0,
      ventasPorTrimestre['4'] || 0,
    ];

    const canvas = document.getElementById('graficoPeliculas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;

    this.chartPeliculas = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: trimestres,
        datasets: [
          {
            label: 'Entradas vendidas',
            data,
            backgroundColor: (context) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;
              if (!chartArea) return '#fde8e8';
              return this.createGradient(ctx, chartArea);
            },
            borderRadius: 6,
            borderSkipped: false,
          },
        ],
      },
      options: this.getChartOptions(false),
    });
  }

  // Gráfico 3 — Días de la semana (etiquetas rotadas)
  generarGraficoEntradasPorDia() {
    if (this.chartDias) this.chartDias.destroy();

    const diasSemana = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
    const mapaDias: { [key: string]: string } = {
      Monday: 'Lun',
      Tuesday: 'Mar',
      Wednesday: 'Mie',
      Thursday: 'Jue',
      Friday: 'Vie',
      Saturday: 'Sab',
      Sunday: 'Dom',
    };

    const ventasPorDia: { [key: string]: number } = {};
    this.datosDiasSemana.forEach((x) => {
      const diaNormalizado = mapaDias[x.dia_semana] || x.dia_semana;
      ventasPorDia[diaNormalizado] = Number(x.cantidad_entradas);
    });

    const data = diasSemana.map((dia) => ventasPorDia[dia] || 0);

    const canvas = document.getElementById('graficoDias') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;

    this.chartDias = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: diasSemana,
        datasets: [
          {
            label: 'Entradas vendidas',
            data,
            backgroundColor: (context) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;
              if (!chartArea) return '#fde8e8';
              return this.createGradient(ctx, chartArea);
            },
            borderRadius: 6,
            borderSkipped: false,
          },
        ],
      },
      options: this.getChartOptions(true), // Rotadas
    });
  }
  onBack() {
    this.router.navigate(['/principal']);
  }
}
