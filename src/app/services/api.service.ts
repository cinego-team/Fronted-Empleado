import { Injectable } from '@angular/core';
import { config } from '../axios_service/env';
import { axiosAPIPeliculas } from '../axios_service/axios.client';
import { EditPeliculaOutput } from '../pages/pantallas peliculas/editar-pelicula/editar-pelicula.dto';
import { EditPeliculaInput } from '../pages/pantallas peliculas/editar-pelicula/editar-pelicula.dto';
import { EditGenero, GeneroInput } from '../pages/Genero/genero.dto';
import { EditIdioma, IdiomaInput } from '../pages/Idioma/idioma.dto';
import { EditEstado, EstadoInput } from '../pages/lista estado pelicula/estado-pelicula.dto';
import { EditClasificacion, ClasificacionInput } from '../pages/Clasificacion/clasificacion.dto';
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
  async createIdioma(formulario: any): Promise<void> {
    const nuevoIdioma: EditIdioma = {
      nombre: formulario.get('nombre').value,
    };
    await axiosAPIPeliculas.post(config.APIPeliculasUrls.createIdioma, nuevoIdioma);
  }
  async updateIdioma(idioma: IdiomaInput): Promise<void> {
    const data: IdiomaInput = {
      nombre: idioma.nombre,
    };
    await axiosAPIPeliculas.put(`${config.APIPeliculasUrls.updateIdioma(idioma.id!)}`, data);
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
  async createGenero(formulario: any): Promise<void> {
    const nuevoGenero: EditGenero = {
      nombre: formulario.get('nombre').value,
    };
    await axiosAPIPeliculas.post(config.APIPeliculasUrls.createGenero, nuevoGenero);
  }
  async updateGenero(genero: GeneroInput): Promise<void> {
    const data: GeneroInput = {
      nombre: genero.nombre,
    };
    await axiosAPIPeliculas.put(`${config.APIPeliculasUrls.updateGenero(genero.id!)}`, data);
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
  async createClasificacion(formulario: any): Promise<void> {
    const nuevaClasificacion: EditClasificacion = {
      nombre: formulario.get('nombre').value,
    };
    await axiosAPIPeliculas.post(config.APIPeliculasUrls.createClasificacion, nuevaClasificacion);
  }
  async updateClasificacion(clasificacion: ClasificacionInput): Promise<void> {
    const data: ClasificacionInput = {
      nombre: clasificacion.nombre,
    };
    await axiosAPIPeliculas.put(
      `${config.APIPeliculasUrls.updateClasificacion(clasificacion.id!)}`,
      data
    );
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
  async createEstado(formulario: any): Promise<void> {
    const nuevoEstado: EditEstado = {
      nombre: formulario.get('nombre').value,
    };
    await axiosAPIPeliculas.post(config.APIPeliculasUrls.createEstado, nuevoEstado);
  }
  async updateEstado(estado: EstadoInput): Promise<void> {
    const data: EstadoInput = {
      nombre: estado.nombre,
    };
    await axiosAPIPeliculas.put(`${config.APIPeliculasUrls.updateEstado(estado.id!)}`, data);
  }
}
