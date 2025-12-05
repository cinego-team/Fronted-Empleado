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
    tipoCliente: string;
  }> {
    const datos = (await axiosAPIPromociones.get(config.APIPromocionesUrls.getPromocionById(id)))
      .data;
    return {
      id: datos.id,
      nombre: datos.nombre,
      porcentajeDescuento: datos.porcentajeDescuento,
      dia: datos.dia,
      tipoCliente: datos.tipoCliente,
    };
  }
  async getPromociones(): Promise<
    Array<{
      id: number;
      nombre: string;
      porcentajeDescuento: number;
      tipoCliente: string;
      dia: string;
    }>
  > {
    const datos = (await axiosAPIPromociones.get(config.APIPromocionesUrls.getPromociones)).data;
    const respuesta = datos.map(
      (item: { id: any; nombre: any; porcentajeDescuento: any; tipoCliente: any; dia: any }) => ({
        id: item.id,
        nombre: item.nombre,
        porcentajeDescuento: item.porcentajeDescuento,
        tipoCliente: item.tipoCliente,
        dia: item.dia,
      })
    );
    return respuesta;
  }
  async deletePromocion(id: number): Promise<void> {
    await axiosAPIPromociones.delete(config.APIPromocionesUrls.getPromocionById(id));
  }
  async createPromocion(formulario: any): Promise<void> {
    const nuevaPromocion: EditPromocionOutput = {
      nombre: formulario.get('nombre').value,
      porcentajeDescuento: formulario.get('porcentajeDescuento').value,
      dia: formulario.get('dia').value,
      tipoCliente: formulario.get('tipoCliente').value,
    };
    await axiosAPIPromociones.post(config.APIPromocionesUrls.createPromocion, nuevaPromocion);
  }
  async updatePromocion(promocion: EditPromocionInput): Promise<void> {
    const data: EditPromocionOutput = {
      nombre: promocion.nombre,
      porcentajeDescuento: promocion.porcentajeDescuento,
      dia: promocion.dia,
      tipoCliente: promocion.tipoCliente,
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
