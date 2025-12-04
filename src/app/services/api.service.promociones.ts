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
    diaId: number;
    tipoClienteId: number;
  }> {
    const datos = (await axiosAPIPromociones.get(config.APIPromocionesUrls.getPromocionById(id)))
      .data;
    return {
      id: datos.id,
      nombre: datos.nombre,
      porcentajeDescuento: datos.porcentajeDescuento,
      diaId: datos.diaId,
      tipoClienteId: datos.tipoClienteId,
    };
  }
  async getPromociones(): Promise<
    Array<{
      id: number;
      nombre: string;
      porcentajeDescuento: number;
      tipoClienteId: number;
      diaId: number;
    }>
  > {
    const datos = (await axiosAPIPromociones.get(config.APIPromocionesUrls.getPromociones)).data;
    const respuesta = datos.map(
      (item: {
        id: any;
        nombre: any;
        porcentajeDescuento: any;
        tipoClienteId: any;
        diaId: any;
      }) => ({
        id: datos.id,
        nombre: item.nombre,
        procentajeDescuento: item.porcentajeDescuento,
        tipoClienteId: item.tipoClienteId,
        diaId: item.diaId,
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
      diaId: formulario.get('diaId').value,
      tipoClienteId: formulario.get('tipoClienteId').value,
    };
    await axiosAPIPromociones.post(config.APIPromocionesUrls.createPromocion, nuevaPromocion);
  }
  async updatePromocion(promocion: EditPromocionInput): Promise<void> {
    const data: EditPromocionOutput = {
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
}
