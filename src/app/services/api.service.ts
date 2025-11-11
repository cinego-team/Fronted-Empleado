import { Injectable } from '@angular/core';
import { axiosService } from './axiosClient';
import { config } from '../axios_service/env';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}
  async getVentaById(id: number): Promise<{
    nroVenta: number;
    fecha: Date;
    hora: Date;
    total: number;
    promocionId?: number;
    entradas: {
      id: number;
      codigoSeguridad: string;
      disponibilidaButaca: number;
    }[];
  }> {
    const datos = (await axiosService.get(`${config.urls.getVentas}/${id}`)).data;
    return {
      nroVenta: datos.id,
      fecha: datos.fecha,
      hora: datos.hora,
      total: datos.total,
      promocionId: datos.promocionId,
      entradas: datos.entradas.map((entrada: any) => ({
        id: entrada.id,
        codigoSeguridad: entrada.codigoSeguridad,
        disponibilidadButaca: entrada.disponibilidadButaca,
      })),
    };
  }
  async getPeliculaById(id: number): Promise<{
    id: number;
    titulo: string;
    estado: string;
    duracion: number;
    clasificacion: string;
    fechaEstreno: Date;
    genero: string;
    idioma: string;
    sinopsis: string;
  }> {
    const datos = (await axiosService.get(`${config.urls.getPeliculas}/${id}`)).data;
    return {
      id: datos.id,
      titulo: datos.titulo,
      estado: datos.estado,
      duracion: datos.duracion,
      clasificacion: datos.clasificacion,
      fechaEstreno: datos.fechaEstreno,
      genero: datos.genero,
      idioma: datos.idioma,
      sinopsis: datos.sinopsis,
    };
  }
  async getTiposDni(): Promise<Array<{ id: number; denominacion: string }>> {
    const datos = (await axiosService.get(config.urls.getTiposDni, {})).data;
    const respuesta = datos.map((item: { id: any; denominacion: any }) => ({
      id: item.id,
      denominacion: item.denominacion,
    }));
    return respuesta;
  }
  async deleteTipoDni(id: number): Promise<void> {
    await axiosService.delete(`${config.urls.getTipoDniById(id)}`);
  }
  async getTiposCliente(): Promise<Array<{ id: number; nombre: string }>> {
    const datos = (await axiosService.get(config.urls.getTiposCliente, {})).data;
    const respuesta = datos.map((item: { id: any; nombre: any }) => ({
      id: item.id,
      nombre: item.nombre,
    }));
    return respuesta;
  }
  async deleteTipoCliente(id: number): Promise<void> {
    await axiosService.delete(`${config.urls.getTipoClienteById(id)}`);
  }
  async getEstadosPeliculas(): Promise<Array<{ id: number; nombre: string }>> {
    const datos = (await axiosService.get(config.urls.getEstadosPeliculas, {})).data;
    const respuesta = datos.map((item: { id: any; nombre: any }) => ({
      id: item.id,
      nombre: item.nombre,
    }));
    return respuesta;
  }
  async deleteEstadoPelicula(id: number): Promise<void> {
    await axiosService.delete(`${config.urls.getEstadoPeliculaById(id)}`);
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
    const datos = (await axiosService.get(config.urls.getPromociones, {})).data;
    const respuesta = datos.map(
      (item: {
        id: any;
        nombre: any;
        porcentajeDescuento: any;
        tipoClienteId: any;
        diaId: any;
      }) => ({
        id: item.id,
        nombre: item.nombre,
        procentajeDescuento: item.porcentajeDescuento,
        tipoClienteId: item.tipoClienteId,
        diaId: item.diaId,
      })
    );
    return respuesta;
  }
  async deletePromocion(id: number): Promise<void> {
    await axiosService.delete(`${config.urls.getPromocionById(id)}`);
  }
  async getVentas(): Promise<
    Array<{ nroVenta: number; fecha: Date; hora: Date; total: number; promocionId?: number }>
  > {
    const datos = (await axiosService.get(config.urls.getVentas, {})).data;
    const respuesta = datos.map(
      (item: { nroVenta: any; fecha: any; hora: any; total: any; promocionId?: any }) => ({
        nroVenta: item.nroVenta,
        fecha: item.fecha,
        hora: item.hora,
        total: item.total,
        promocionId: item.promocionId,
      })
    );
    return respuesta;
  }
  async getPeliculas(): Promise<
    Array<{
      id: number;
      titulo: string;
      sinopsis: string;
      director: string;
      duracion: number;
      fechaEsterno: string;
      idioma: string;
      genero: string;
      clasificación: string;
      estado: string;
    }>
  > {
    const datos = (await axiosService.get(config.urls.getPeliculas, {})).data;
    const respuesta = datos.map(
      (item: {
        id: any;
        titulo: any;
        sinopsis: any;
        director: any;
        duracion: any;
        fechaEsterno: any;
        idioma: any;
        genero: any;
        clasificación: any;
        estado: any;
      }) => ({
        id: item.id,
        titulo: item.titulo,
        sinopsis: item.sinopsis,
        director: item.director,
        duracion: item.duracion,
        fechaEsterno: item.fechaEsterno,
        idioma: item.idioma,
        genero: item.genero,
        clasificación: item.clasificación,
        estado: item.estado,
      })
    );
    return respuesta;
  }
  async deletePelicula(id: number): Promise<void> {
    await axiosService.delete(`${config.urls.getPeliculaById(id)}`);
  }
  async getEntradas(): Promise<Array<{ id: number; codigoSeguridad: string }>> {
    const datos = (await axiosService.get(config.urls.getEntradas, {})).data;
    const respuesta = datos.map((item: { id: any; codigoSeguridad: any }) => ({
      id: item.id,
      codigoSeguridad: item.codigoSeguridad,
    }));
    return respuesta;
  }
  async deleteEntrada(id: number): Promise<void> {
    await axiosService.delete(`${config.urls.getEntradaById(id)}`);
  }
}
