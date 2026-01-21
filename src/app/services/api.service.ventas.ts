import { Injectable } from '@angular/core';
import { config } from '../axios_service/env';
import { axiosAPIVentas } from '../axios_service/axios.client';
@Injectable({ providedIn: 'root' })
export class ApiServiceVentas {
  constructor() {}
  async getVentas(): Promise<any[]> {
    const response = await axiosAPIVentas.get(config.APIVentasUrls.getVentas);

    const datos = response.data;

    return datos.map((item: any) => ({
      nroVenta: item.nroVenta,
      fecha: new Date(item.fecha),
      total: item.total,
      promocion: item.promocion
        ? {
            id: item.promocion.id,
            nombre: item.promocion.nombre,
            porcentajeDescuento: item.promocion.porcentajeDescuento,
          }
        : undefined,
      cliente: {
        id: item.cliente.id,
        nombre: item.cliente.nombre,
        apellido: item.cliente.apellido,
        email: item.cliente.email,
      },
      estadoVenta: {
        nombre: item.estadoVenta.nombre,
      },
      entradas: item.entradas.map((e: any) => ({
        id: e.id,
        esUsado: e.esUsado,
      })),
    }));
  }

  async getHorariosMasElegidosMesActual() {
    const response = await axiosAPIVentas.get(config.APIVentasUrls.getHorariosMasElegidosMesActual);
    return response.data;
  }
  async getEntradasPorDiaSemanaMesActual() {
    const response = await axiosAPIVentas.get(
      config.APIVentasUrls.getEntradasPorDiaSemanaMesActual,
    );

    return response.data;
  }
  async getPeliculasPorRangoTrimestral(trimestre: number, anio: number) {
    const response = await axiosAPIVentas.get(config.APIVentasUrls.getPeliculasPorRangoTrimestral, {
      params: {
        trimestre,
        anio,
      },
    });

    return response.data;
  }
}
