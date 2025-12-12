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
      total: number;
      promocion?: {
        id: number;
        nombre: string;
        porcentajeDescuento: number;
      };
      cliente: {
        id: number;
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
    }>
  > {
    try {
      const response = await axiosAPIVentas.get(config.APIVentasUrls.getVentas);
      const datos = response.data;

      return datos.map((item: any) => ({
        nroVenta: item.nroVenta,
        fecha: new Date(item.fecha),
        total: item.total,
        promocion: {
          id: item.promocion?.id,
          nombre: item.promocion?.nombre,
          porcentajeDescuento: item.promocion?.porcentajeDescuento,
        },
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
