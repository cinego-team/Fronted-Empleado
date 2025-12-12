import { Injectable } from '@angular/core';
import { config } from '../axios_service/env';
import { axiosAPIFuncionesYsalas } from '../axios_service/axios.client';
import { SalaInput } from '../pages/sala/sala-dto';
import { FormatoInput, FormatoOutput } from '../pages/formato/formato.dto';
import { EditFuncion, FuncionInput } from '../pages/funcion/funcion-dto';
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
  async getSalas(): Promise<
    Array<{
      id: number;
      nroSala: number;
    }>
  > {
    try {
      const response = await axiosAPIFuncionesYsalas.get(config.APIFuncionesUrls.getSalas);
      const datos = response.data;
      return datos.map((item: any) => ({
        id: item.id,
        nroSala: item.numeroSala,
      }));
    } catch (error) {
      console.error('Error al obtener salas:', error);
      return [];
    }
  }

  async getAllSalas(): Promise<
    Array<{
      id: number;
      numero: number;
      disponibilidad: boolean;
      cantFilas: number;
      capacidad: number;
    }>
  > {
    try {
      const response = await axiosAPIFuncionesYsalas.get(config.APIFuncionesUrls.getAllSalas);
      const datos = response.data;

      return datos.map((item: any) => ({
        id: item.id,
        numero: item.numero,
        disponibilidad: item.disponibilidad === 'true',

        cantFilas: item.cantFilas,
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
    cantFilas: number;
    cantButacasPorFila: number;
  }): Promise<void> {
    await axiosAPIFuncionesYsalas.post(config.APIFuncionesUrls.createSalas, salaData);
  }

  async updateSala(sala: SalaInput): Promise<void> {
    const data: SalaInput = {
      numero: sala.numero,
      disponibilidad: sala.disponibilidad,
      cantFilas: sala.cantFilas,
      cantButacasPorFila: sala.cantButacasPorFila,
    };
    await axiosAPIFuncionesYsalas.put(`${config.APIFuncionesUrls.updateSala(sala.id!)}`, data);
  }
  async deleteSala(id: number): Promise<void> {
    await axiosAPIFuncionesYsalas.delete(config.APIFuncionesUrls.getSalaById(id));
  }
  //funciones

  async getFunciones(): Promise<
    Array<{
      id: number;
      peliculaId: number;
      fecha: Date;
      estaDisponible: string;
      idioma: {
        id: number;
        nombre: string;
      };
      sala: {
        id: number;
        nroSala: number;
      };
      formato: {
        id: number;
        nombre: string;
        precio: number;
      };
    }>
  > {
    try {
      const response = await axiosAPIFuncionesYsalas.get(config.APIFuncionesUrls.getFunciones);
      const datos = response.data;

      return datos.map(
        (item: {
          id: any;
          peliculaId: any;
          fecha: any;
          estaDisponible: any;
          idioma: { id: any; nombre: any };
          sala: { id: any; numeroSala: any };
          formato: { id: any; nombre: any; precio: any };
        }) => ({
          id: item.id,
          peliculaId: item.peliculaId,
          fecha: item.fecha,
          estaDisponible: item.estaDisponible,
          idioma: {
            id: item.idioma.id,
            nombre: item.idioma.nombre,
          },
          sala: {
            id: item.sala.id,
            nroSala: item.sala.numeroSala, // <-- 🔥 CORREGIDO
          },
          formato: {
            id: item.formato.id,
            nombre: item.formato.nombre,
            precio: item.formato.precio,
          },
        })
      );
    } catch (error) {
      console.error('Error al obtener funciones:', error);
      return [];
    }
  }

  async getFuncById(id: number): Promise<{
    id: number;
    peliculaId: number;
    fecha: Date;
    estaDisponible: string;
    sala: {
      id: number;
      nroSala: number;
    };
    idioma: {
      id: number;
      nombre: string;
    };
    formato: {
      id: number;
      nombre: string;
      precio: number;
    };
  }> {
    const item = (await axiosAPIFuncionesYsalas.get(config.APIFuncionesUrls.getFuncById(id))).data;
    return {
      id: item.id,
      peliculaId: item.peliculaId,
      fecha: item.fecha,
      estaDisponible: item.estaDisponible,
      sala: {
        id: item.sala.id,
        nroSala: item.sala.numeroSala,
      },
      idioma: {
        id: item.idioma.id,
        nombre: item.idioma.nombre,
      },
      formato: {
        id: item.formato.id,
        nombre: item.formato.nombre,
        precio: item.formato.precio,
      },
    };
  }

  async createFuncion(formulario: any): Promise<void> {
    const nuevaFuncion: EditFuncion = {
      peliculaId: formulario.get('peliculaId').value,
      fecha: formulario.get('fecha').value,
      estaDisponible: formulario.get('estaDisponible').value,
      sala: {
        id: formulario.get('sala').value.id,
        nroSala: formulario.get('sala').value.nroSala,
      },
      formato: {
        id: formulario.get('formato').value.id,
        nombre: formulario.get('formato').value.nombre,
        precio: formulario.get('formato').value.precio,
      },
      idioma: {
        id: formulario.get('idioma').value.id,
        nombre: formulario.get('idioma').value.nombre,
      },
    };
    await axiosAPIFuncionesYsalas.post(config.APIFuncionesUrls.createFuncion, nuevaFuncion);
  }
  async updateFuncion(funcion: Partial<FuncionInput> & { id: number }): Promise<void> {
    const data: any = { ...funcion };

    // Convertir fecha SOLO si vino como string
    if (typeof data.fecha === 'string') {
      data.fecha = new Date(data.fecha);
    }

    // Asegurar boolean correcto (por si vino "true"/"false" como string)
    if (typeof data.estaDisponible === 'string') {
      data.estaDisponible = data.estaDisponible === 'true';
    }

    await axiosAPIFuncionesYsalas.put(`${config.APIFuncionesUrls.updateFuncion(funcion.id)}`, data);
  }
  async deleteFuncion(id: number): Promise<void> {
    await axiosAPIFuncionesYsalas.delete(config.APIFuncionesUrls.getFuncById(id));
  }
}
