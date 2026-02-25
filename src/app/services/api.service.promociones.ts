import { Injectable } from '@angular/core';
import { config } from '../axios_service/env';
import { axiosAPIPromociones } from '../axios_service/axios.client';
import {
  EditPromocionInput,
  EditPromocionOutput,
} from '../pages/pantallas promocion/promocion.dto';
@Injectable({ providedIn: 'root' })
export class ApiServicePromociones {
  constructor() {}
  async getPromocionById(id: number): Promise<{
    id: number;
    nombre: string;
    porcentajeDescuento: number;
    dia: string;
    tipoClienteId: number;
  }> {
    const datos = (await axiosAPIPromociones.get(config.APIPromocionesUrls.getPromocionById(id)))
      .data;
    return {
      id: datos.id,
      nombre: datos.nombre,
      porcentajeDescuento: datos.porcentajeDescuento,
      dia: datos.dia,
      tipoClienteId: datos.tipoClienteId,
    };
  }
  async getPromociones(): Promise<
    Array<{
      id: number;
      nombre: string;
      porcentajeDescuento: number;
      tipoCliente: {
        id: number;
        denominacion: string;
      };
      dia: {
        id: number;
        nombre: string;
      };
    }>
  > {
    const datos = (await axiosAPIPromociones.get(config.APIPromocionesUrls.getPromociones)).data;
    const respuesta = datos.map(
      (item: {
        id: any;
        nombre: any;
        porcentajeDescuento: any;
        tipoCliente: {
          id: any;
          denominacion: any;
        };
        dia: {
          id: any;
          nombre: any;
        };
      }) => ({
        id: item.id,
        nombre: item.nombre,
        porcentajeDescuento: item.porcentajeDescuento,
        tipoCliente: {
          id: item.tipoCliente.id,
          denominacion: item.tipoCliente.denominacion,
        },
        dia: {
          id: item.dia.id,
          nombre: item.dia.nombre,
        },
      })
    );
    return respuesta;
  }
  
  async deletePromocion(id: number): Promise<void> {
    await axiosAPIPromociones.delete(config.APIPromocionesUrls.getPromocionById(id));
  }

  async createPromocion(dto: { nombre: string; porcentajeDescuento: number; diaId: number; tipoClienteId: number }): Promise<void> {
    const nuevaPromocion: EditPromocionOutput = {
      nombre: dto.nombre,
      porcentajeDescuento: dto.porcentajeDescuento,
      diaId: dto.diaId,
      tipoClienteId: dto.tipoClienteId,
    };
    await axiosAPIPromociones.post(config.APIPromocionesUrls.createPromocion, nuevaPromocion);
  }

  async updatePromocion(promocion: EditPromocionInput): Promise<void> {
    const data = {
      nombre: promocion.nombre,
      porcentajeDescuento: promocion.porcentajeDescuento,
      diaId: promocion.diaId,
      tipoClienteId: promocion.tipoClienteId,
    };
    await axiosAPIPromociones.put(
      `${config.APIPromocionesUrls.updatePromocion(promocion.id!)}`,
      data
    );
  }
  async getAllDias(): Promise<
    Array<{
      id: number;
      nombre: string;
    }>
  > {
    const datos = (await axiosAPIPromociones.get(config.APIPromocionesUrls.getDias)).data;

    const respuesta = datos.map((item: { id: number; nombre: string }) => ({
      id: item.id,
      nombre: item.nombre,
    }));

    return respuesta;
  }
}
