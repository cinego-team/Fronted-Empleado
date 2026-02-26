import { Injectable } from '@angular/core';
import { config } from '../axios_service/env';
import { axiosAPIFuncionesYsalas } from '../axios_service/axios.client';
import { SalaInput } from '../pages/sala/sala-dto';
import { FormatoInput, FormatoOutput } from '../pages/formato/formato.dto';
import { EditFuncion, FuncionInput } from '../pages/funcion/funcion-dto';
import { EditIdioma, IdiomaInput } from '../pages/Idioma/idioma.dto';
import { Pelicula } from '../pages/pantallas peliculas/pelicula/pelicula';
@Injectable({ providedIn: 'root' })
export class ApiServiceFunciones {
  constructor() {}
  //formato
  async findOneAdmin(id: number): Promise<{
    id: number;
    nombre: string;
    precio: number;
  }> {
    const datos = (await axiosAPIFuncionesYsalas.get(config.APIFuncionesUrls.findOneAdmin(id)))
      .data;
    return {
      id: datos.id,
      nombre: datos.nombre,
      precio: datos.precio,
    };
  }
  async findAllAdmin(): Promise<
    Array<{
      id: number;
      nombre: string;
      precio: number;
    }>
  > {
    const datos = (await axiosAPIFuncionesYsalas.get(config.APIFuncionesUrls.findAllAdmin)).data;

    const respuesta = datos.map((item: { id: number; nombre: string; precio: number }) => ({
      id: item.id,
      nombre: item.nombre,
      precio: item.precio,
    }));

    return respuesta;
  }
  async delete(id: number): Promise<void> {
    await axiosAPIFuncionesYsalas.delete(config.APIFuncionesUrls.findOneAdmin(id));
  }
  async create(formato: FormatoInput): Promise<void> {
    await axiosAPIFuncionesYsalas.post(config.APIFuncionesUrls.create, formato);
  }

  async update(formato: FormatoOutput): Promise<void> {
    const data: FormatoInput = {
      nombre: formato.nombre,
      precio: formato.precio,
    };
    await axiosAPIFuncionesYsalas.put(`${config.APIFuncionesUrls.update(formato.id!)}`, data);
  }
  //salas
  async getSalasForSelec(): Promise<
    Array<{
      id: number;
      nroSala: number;
    }>
  > {
    try {
      console.log('URL usada:', config.APIFuncionesUrls.getSalas);
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
      const token = localStorage.getItem('token');

      const response = await axiosAPIFuncionesYsalas.get(config.APIFuncionesUrls.getAllSalas, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const datos = response.data;

      return datos.map((item: any) => ({
        id: item.id,
        numero: item.nroSala,
        disponibilidad: item.estaDisponible,
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
    disponibilidad: boolean;
    cantFilas: number;
    cantButacasPorFila: number;
  }> {
    const item = (await axiosAPIFuncionesYsalas.get(config.APIFuncionesUrls.getSalaById(id))).data;
    return {
      id: item.id,
      numero: item.nroSala,
      disponibilidad: item.estaDisponible,
      cantFilas: item.cantFilas,
      cantButacasPorFila: item.cantButacasPorFila,
    };
  }

  async createSala(salaData: {
    numero: number;
    disponibilidad: boolean;
    cantFilas: number;
    cantButacasPorFila: number;
  }): Promise<void> {
    const payload = {
      nroSala: Number(salaData.numero),
      estaDisponible: salaData.disponibilidad,
      cantFilas: Number(salaData.cantFilas),
      cantButacasPorFila: Number(salaData.cantButacasPorFila),
    };

    const token = localStorage.getItem('access_token');

    await axiosAPIFuncionesYsalas.post(config.APIFuncionesUrls.createSalas, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async updateSala(sala: SalaInput): Promise<void> {
    const payload = {
      nroSala: Number(sala.numero),
      estaDisponible: sala.disponibilidad,
      cantFilas: Number(sala.cantFilas),
      cantButacasPorFila: Number(sala.cantButacasPorFila),
    };

    const token = localStorage.getItem('access_token');

    await axiosAPIFuncionesYsalas.put(config.APIFuncionesUrls.updateSala(sala.id!), payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async deleteSala(id: number): Promise<void> {
    const token = localStorage.getItem('access_token');

    await axiosAPIFuncionesYsalas.delete(config.APIFuncionesUrls.deleteSalaById(id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  //funciones

  async getFunciones(
    page = 1,
    quantity = 5,
  ): Promise<
    Array<{
      id: number;
      peliculaNombre: string;
      peliculaId: number;
      fecha: Date;
      hora: string;
      estaDisponible: boolean;
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
      empleado: {
        nombre: string;
        apellido: string;
      };
    }>
  > {
    try {
      const response = await axiosAPIFuncionesYsalas.get(config.APIFuncionesUrls.getFunciones, {
        params: { page, quantity },
      });

      const datos = response.data;

      return datos.map((item: any) => ({
        id: item.id,
        peliculaNombre: item.peliculaNombre,
        peliculaId: item.peliculaId,
        hora: item.hora,
        fecha: item.fecha,
        estaDisponible: item.estaDisponible,
        idioma: {
          id: item.idioma.id,
          nombre: item.idioma.nombre,
        },
        sala: {
          id: item.sala.id,
          nroSala: item.sala.nroSala,
        },
        formato: {
          id: item.formato.id,
          nombre: item.formato.nombre,
          precio: item.formato.precio,
        },
        empleado: {
          nombre: item.empleado.nombre,
          apellido: item.empleado.apellido,
        },
      }));
    } catch (error) {
      console.error('Error al obtener funciones:', error);
      return [];
    }
  }

  async getFuncById(id: number): Promise<{
    id: number;
    peliculaId: number;
    fecha: Date;
    estaDisponible: boolean;
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
    usuarioId: number;
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
      usuarioId: item.usuarioId,
    };
  }

  async createFuncionAdmin(dto: {
    peliculaId: number;
    fecha: Date;
    hora: string;
    estaDisponible: boolean;
    sala: { id: number; nroSala: number };
    formato: { id: number; nombre: string; precio: number };
    idioma: { id: number; nombre: string };
  }): Promise<void> {
    await axiosAPIFuncionesYsalas.post(config.APIFuncionesUrls.createFuncionAdmin, dto);
  }
  async updateFuncionAdmin(funcion: Partial<FuncionInput> & { id: number }): Promise<void> {
    const data: any = { ...funcion };

    // Asegurar que 'estaDisponible' sea boolean
    if (typeof data.estaDisponible === 'string') {
      data.estaDisponible = data.estaDisponible === 'true';
    }

    // Llamada PUT al backend con solo los cambios
    await axiosAPIFuncionesYsalas.put(
      `${config.APIFuncionesUrls.updateFuncionAdmin(funcion.id)}`,
      data,
    );
  }

  async deleteFuncion(id: number): Promise<void> {
    await axiosAPIFuncionesYsalas.delete(config.APIFuncionesUrls.getFuncById(id));
  }
  //idiomas
  async getIdiomaById(id: number): Promise<{
    id: number;
    nombre: string;
  }> {
    const datos = (await axiosAPIFuncionesYsalas.get(config.APIFuncionesUrls.getIdiomaById(id)))
      .data;
    return {
      id: datos.id,
      nombre: datos.nombre,
    };
  }
  async getAllIdiomas(): Promise<
    Array<{
      id: number;
      nombre: string;
    }>
  > {
    const datos = (await axiosAPIFuncionesYsalas.get(config.APIFuncionesUrls.getIdiomas)).data;

    const respuesta = datos.map((item: { id: number; nombre: string }) => ({
      id: item.id,
      nombre: item.nombre,
    }));

    return respuesta;
  }
  async deleteIdioma(id: number): Promise<void> {
    await axiosAPIFuncionesYsalas.delete(config.APIFuncionesUrls.getIdiomaById(id));
  }
  async createIdioma(nombre: string): Promise<void> {
    const nuevoIdioma: EditIdioma = {
      nombre,
    };

    await axiosAPIFuncionesYsalas.post(config.APIFuncionesUrls.createIdioma, nuevoIdioma);
  }

  async updateIdioma(idioma: IdiomaInput): Promise<void> {
    const data: IdiomaInput = {
      nombre: idioma.nombre,
    };
    await axiosAPIFuncionesYsalas.put(`${config.APIFuncionesUrls.updateIdioma(idioma.id!)}`, data);
  }
}
