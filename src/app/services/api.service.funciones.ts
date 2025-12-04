import { Injectable } from '@angular/core';
import { config } from '../axios_service/env';
import { axiosAPIFuncionesYsalas } from '../axios_service/axios.client';
import { SalaInput } from '../pages/sala/sala-dto';
import { FormatoInput, FormatoOutput } from '../pages/formato/formato.dto';
import { FuncionInput } from '../pages/funcion/funcion-dto';
@Injectable({ providedIn: 'root' })
export class ApiServiceFunciones {
  constructor() {}
  //formato
  async findOne(id: number): Promise<{
    id: number;
    nombre: string;
    precio: number;
  }> {
    const datos = (await axiosAPIFuncionesYsalas.get(config.APIFuncionesUrls.findOne(id))).data;
    return {
      id: datos.id,
      nombre: datos.nombre,
      precio: datos.precio,
    };
  }
  async findAll(): Promise<
    Array<{
      id: number;
      nombre: string;
      precio: number;
    }>
  > {
    const datos = (await axiosAPIFuncionesYsalas.get(config.APIFuncionesUrls.findAll)).data;

    const respuesta = datos.map((item: { id: number; nombre: string; precio: number }) => ({
      id: item.id,
      nombre: item.nombre,
      precio: item.precio,
    }));

    return respuesta;
  }
  async delete(id: number): Promise<void> {
    await axiosAPIFuncionesYsalas.delete(config.APIFuncionesUrls.findOne(id));
  }
  async create(formulario: any): Promise<void> {
    const nuevoFormato: FormatoInput = {
      nombre: formulario.get('nombre').value,
      precio: formulario.get('precio').value,
    };
    await axiosAPIFuncionesYsalas.post(config.APIFuncionesUrls.create, nuevoFormato);
  }
  async update(formato: FormatoOutput): Promise<void> {
    const data: FormatoInput = {
      nombre: formato.nombre,
      precio: formato.precio,
    };
    await axiosAPIFuncionesYsalas.put(`${config.APIFuncionesUrls.update(formato.id!)}`, data);
  }
  //salas
  async getAllSalas(): Promise<
    Array<{
      id: number;
      numero: number;
      disponibilidad: string;
      fila: number;
      capacidad: number;
    }>
  > {
    try {
      const response = await axiosAPIFuncionesYsalas.get(config.APIFuncionesUrls.getAllSalas);
      const datos = response.data;

      return datos.map((item: any) => ({
        id: item.id,
        numero: item.numero,
        disponibilidad: item.disponibilidad,
        fila: item.fila,
        capacidad: item.capacidad,
      }));
    } catch (error) {
      console.error('Error al obtener salas:', error);
      return [];
    }
  }
  async getSalaById(id: number): Promise<{
    id: number;
    numero: number;
    disponibilidad: string;
    fila: number;
    butaca: number;
  }> {
    const item = (await axiosAPIFuncionesYsalas.get(config.APIFuncionesUrls.getSalaById(id))).data;
    return {
      id: item.id,
      numero: item.numero,
      disponibilidad: item.disponibilidad,
      fila: item.fila,
      butaca: item.butaca,
    };
  }

  async createSala(salaData: {
    numero: number;
    disponibilidad: string;
    fila: number;
    butaca: number;
  }): Promise<void> {
    await axiosAPIFuncionesYsalas.post(config.APIFuncionesUrls.createSalas, salaData);
  }

  async updateSala(sala: SalaInput): Promise<void> {
    const data: SalaInput = {
      numero: sala.numero,
      disponibilidad: sala.disponibilidad,
      fila: sala.fila,
      butaca: sala.butaca,
    };
    await axiosAPIFuncionesYsalas.put(`${config.APIFuncionesUrls.updateSala(sala.id!)}`, data);
  }
  async deleteSala(id: number): Promise<void> {
    await axiosAPIFuncionesYsalas.delete(config.APIFuncionesUrls.getSalaById(id));
  }

  //funciones
  async getAllFunciones(): Promise<
    Array<{
      id: number;
      pelicula: string;
      fecha: Date;
      hora: Date;
      disponible: string;
      sala: number;
      formato: string;
    }>
  > {
    try {
      const response = await axiosAPIFuncionesYsalas.get(config.APIFuncionesUrls.getFunciones);
      const datos = response.data;

      return datos.map((item: any) => ({
        id: item.id,
        pelicula: item.pelicula,
        fecha: item.fecha,
        hora: item.fecha,
        disponible: item.disponible,
        sala: item.sala,
        formato: item.formato,
      }));
    } catch (error) {
      console.error('Error al obtener funciones:', error);
      return [];
    }
  }
  async getFuncionById(id: number): Promise<{
    id: number;
    pelicula: string;
    fecha: Date;
    hora: Date;
    disponible: string;
    sala: number;
    formato: string;
  }> {
    const item = (await axiosAPIFuncionesYsalas.get(config.APIFuncionesUrls.getFuncionById(id)))
      .data;
    return {
      id: item.id,
      pelicula: item.pelicula,
      fecha: item.fecha,
      hora: item.fecha,
      disponible: item.disponible,
      sala: item.sala,
      formato: item.formato,
    };
  }

  async createFuncion(funcionData: {
    pelicula: string;
    fecha: Date;
    hora: Date;
    disponible: string;
    sala: number;
    formato: string;
  }): Promise<void> {
    await axiosAPIFuncionesYsalas.post(config.APIFuncionesUrls.createFuncion, funcionData);
  }

  async updateFuncion(funcion: FuncionInput): Promise<void> {
    const data: FuncionInput = {
      pelicula: funcion.pelicula,
      fecha: funcion.fecha,
      hora: funcion.hora,
      disponible: funcion.disponible,
      sala: funcion.sala,
      formato: funcion.formato,
    };
    await axiosAPIFuncionesYsalas.put(
      `${config.APIFuncionesUrls.updateFuncion(funcion.id!)}`,
      data
    );
  }
}
