import { Injectable } from '@angular/core';
import { config } from '../axios_service/env';
import { axiosAPIVentas } from '../axios_service/axios.client';
@Injectable({ providedIn: 'root' })
export class ApiServiceVentas {
  constructor() {}
  async getVentas(): Promise<
    Array<{
      nroVenta: number;
      fecha: Date;
      hora: Date;
      total: number;
      promocionId?: number;
    }>
  > {
    try {
      const response = await axiosAPIVentas.get(config.APIVentasUrls.getVentas);
      const datos = response.data;

      return datos.map((item: any) => ({
        nroVenta: item.nroVenta,
        fecha: new Date(item.fecha),
        hora: new Date(item.hora),
        total: item.total,
        promocionId: item.promocionId,
      }));
    } catch (error) {
      console.error('Error al obtener ventas:', error);
      return [];
    }
  }
  async getHorariosMasElegidosMesActual() {
    const response = await axiosAPIVentas.get(config.APIVentasUrls.getHorariosMasElegidosMesActual);
    return response.data;
  }
  async getEntradasPorDiaSemanaMesActual() {
    const response = await axiosAPIVentas.get(
      config.APIVentasUrls.getEntradasPorDiaSemanaMesActual
    );

    return response.data;
  }
}
