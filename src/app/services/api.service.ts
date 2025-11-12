import { Injectable } from '@angular/core';
import { config } from '../axios_service/env';
import { axiosAPIPeliculas } from '../axios_service/axios.client';
import { EditPeliculaOutput } from '../pages/pantallas peliculas/editar-pelicula/editar-pelicula.dto';
import { EditPeliculaInput } from '../pages/pantallas peliculas/editar-pelicula/editar-pelicula.dto';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}
  //peliculas
  async getPeliculaById(id: number): Promise<{
    urlImagen: string;
    id: number;
    titulo: string;
    sinopsis: string;
    director: string;
    duracion: number;
    fechaEstreno: string;
    idioma: string;
    genero: string;
    clasificacion: string;
    estado: string;
  }> {
    const datos = (await axiosAPIPeliculas.get(config.APIPeliculasUrls.getPeliculaById(id))).data;
    return {
      id: datos.id,
      titulo: datos.titulo,
      sinopsis: datos.sinopsis,
      director: datos.director,
      duracion: datos.duracion,
      fechaEstreno: datos.fechaEstreno,
      idioma: datos.idioma,
      genero: datos.genero,
      clasificacion: datos.clasficiacion,
      estado: datos.estado,
      urlImagen: datos.urlImagen,
    };
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
    const datos = (await axiosAPIPeliculas.get(config.APIPeliculasUrls.getPeliculas)).data;
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
        id: datos.id,
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
    await axiosAPIPeliculas.delete(config.APIPeliculasUrls.getPeliculaById(id));
  }
  async createPelicula(formulario: any): Promise<void> {
    const nuevaPelicula: EditPeliculaOutput = {
      idioma: formulario.get('idiomaId').value,
      genero: formulario.get('generoId').value,
      clasificacion: formulario.get('clasificacionId').value,
      estado: formulario.get('estadoId').value,
      titulo: formulario.get('titulo').value,
      sinopsis: formulario.get('sinopsis').value,
      director: formulario.get('director').value,
      duracion: formulario.get('duracion').value,
      fechaEstreno: formulario.get('fechaEstreno').value,
    };
    await axiosAPIPeliculas.post(config.APIPeliculasUrls.createPelicula, nuevaPelicula);
  }
  async updatePelicula(pelicula: EditPeliculaInput): Promise<void> {
    const data: EditPeliculaOutput = {
      titulo: pelicula.titulo,
      sinopsis: pelicula.sinopsis,
      director: pelicula.director,
      duracion: pelicula.duracion,
      fechaEstreno: pelicula.fechaEstreno,
      idioma: pelicula.idioma,
      genero: pelicula.genero,
      clasificacion: pelicula.clasificacion,
      estado: pelicula.estado,
    };
    await axiosAPIPeliculas.put(`${config.APIPeliculasUrls.updatePelicula(pelicula.id!)}`, data);
  }
  //idiomas
  async getIdiomaById(id: number): Promise<{
    id: number;
    nombre: string;
  }> {
    const datos = (await axiosAPIPeliculas.get(config.APIPeliculasUrls.getIdiomaById(id))).data;
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
    const datos = (await axiosAPIPeliculas.get(config.APIPeliculasUrls.getIdiomas)).data;

    const respuesta = datos.map((item: { id: number; nombre: string }) => ({
      id: item.id,
      nombre: item.nombre,
    }));

    return respuesta;
  }
  async deleteIdioma(id: number): Promise<void> {
    await axiosAPIPeliculas.delete(config.APIPeliculasUrls.getIdiomaById(id));
  }
  async createIdioma(nombre: string): Promise<void> {
    await axiosAPIPeliculas.post(config.APIPeliculasUrls.createIdioma, { nombre });
  }
  async updateIdioma(id: number, nombre: string): Promise<void> {
    await axiosAPIPeliculas.put(`${config.APIPeliculasUrls.updateIdioma(id)}`, { nombre });
  }
  //genero
  async getGeneroById(id: number): Promise<{
    id: number;
    nombre: string;
  }> {
    const datos = (await axiosAPIPeliculas.get(config.APIPeliculasUrls.getGeneroById(id))).data;
    return {
      id: datos.id,
      nombre: datos.nombre,
    };
  }
  async getAllGeneros(): Promise<
    Array<{
      id: number;
      nombre: string;
    }>
  > {
    const datos = (await axiosAPIPeliculas.get(config.APIPeliculasUrls.getGeneros)).data;

    const respuesta = datos.map((item: { id: number; nombre: string }) => ({
      id: item.id,
      nombre: item.nombre,
    }));

    return respuesta;
  }
  async deleteGenero(id: number): Promise<void> {
    await axiosAPIPeliculas.delete(config.APIPeliculasUrls.getGeneroById(id));
  }
  async createGenero(nombre: string): Promise<void> {
    await axiosAPIPeliculas.post(config.APIPeliculasUrls.createIdioma, { nombre });
  }
  async updateGenero(id: number, nombre: string): Promise<void> {
    await axiosAPIPeliculas.put(`${config.APIPeliculasUrls.updateGenero(id)}`, { nombre });
  }
  //clasificacion
  async getClasificacionById(id: number): Promise<{
    id: number;
    nombre: string;
  }> {
    const datos = (await axiosAPIPeliculas.get(config.APIPeliculasUrls.getClasificacionById(id)))
      .data;
    return {
      id: datos.id,
      nombre: datos.nombre,
    };
  }
  async getAllClasificaciones(): Promise<
    Array<{
      id: number;
      nombre: string;
    }>
  > {
    const datos = (await axiosAPIPeliculas.get(config.APIPeliculasUrls.getClasificaciones)).data;

    const respuesta = datos.map((item: { id: number; nombre: string }) => ({
      id: item.id,
      nombre: item.nombre,
    }));

    return respuesta;
  }
  async deleteClasificacion(id: number): Promise<void> {
    await axiosAPIPeliculas.delete(config.APIPeliculasUrls.getClasificacionById(id));
  }
  async createClasificacion(nombre: string): Promise<void> {
    await axiosAPIPeliculas.post(config.APIPeliculasUrls.createIdioma, { nombre });
  }
  async updateClasificacion(id: number, nombre: string): Promise<void> {
    await axiosAPIPeliculas.put(`${config.APIPeliculasUrls.updateClasificacion(id)}`, { nombre });
  }
  //estados
  async getEstadosById(id: number): Promise<{
    id: number;
    nombre: string;
  }> {
    const datos = (await axiosAPIPeliculas.get(config.APIPeliculasUrls.getEstadoById(id))).data;
    return {
      id: datos.id,
      nombre: datos.nombre,
    };
  }
  async getAllEstados(): Promise<
    Array<{
      id: number;
      nombre: string;
    }>
  > {
    const datos = (await axiosAPIPeliculas.get(config.APIPeliculasUrls.getEstados)).data;

    const respuesta = datos.map((item: { id: number; nombre: string }) => ({
      id: item.id,
      nombre: item.nombre,
    }));

    return respuesta;
  }
  async deleteEstado(id: number): Promise<void> {
    await axiosAPIPeliculas.delete(config.APIPeliculasUrls.getEstadoById(id));
  }
  async createEstado(nombre: string): Promise<void> {
    await axiosAPIPeliculas.post(config.APIPeliculasUrls.createIdioma, { nombre });
  }
  async updateEstado(id: number, nombre: string): Promise<void> {
    await axiosAPIPeliculas.put(`${config.APIPeliculasUrls.updateEstado(id)}`, { nombre });
  }
}
