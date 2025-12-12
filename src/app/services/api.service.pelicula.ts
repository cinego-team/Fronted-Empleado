import { Injectable } from '@angular/core';
import { EditPeliculaOutput } from '../pages/pantallas peliculas/editar-pelicula/editar-pelicula.dto';
import { EditPeliculaInput } from '../pages/pantallas peliculas/editar-pelicula/editar-pelicula.dto';
import { EditGenero, GeneroInput } from '../pages/Genero/genero.dto';
import { config } from '../axios_service/env';
import { EditIdioma, IdiomaInput } from '../pages/Idioma/idioma.dto';
import { EditEstado, EstadoInput } from '../pages/lista estado pelicula/estado-pelicula.dto';
import { EditClasificacion, ClasificacionInput } from '../pages/Clasificacion/clasificacion.dto';
import { axiosAPIPeliculas } from '../axios_service/axios.client';
@Injectable({ providedIn: 'root' })
export class ApiServicePelicula {
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
    genero: { id: number; nombre: string };
    clasificacion: { id: number; nombre: string };
    estado: { id: number; nombre: string };
    empleado: { id: number; legajo: number; nombre: string; apellido: string };
  }> {
    const datos = (await axiosAPIPeliculas.get(config.APIPeliculasUrls.getPeliculaById(id))).data;
    return {
      id: datos.id,
      titulo: datos.titulo,
      sinopsis: datos.sinopsis,
      director: datos.director,
      duracion: datos.duracion,
      fechaEstreno: datos.fechaEstreno,
      genero: { id: datos.genero.id, nombre: datos.genero.nombre },
      clasificacion: { id: datos.clasificacion.id, nombre: datos.clasificacion.nombre },
      estado: { id: datos.estado.id, nombre: datos.estado.nombre },
      urlImagen: datos.urlImagen,
      empleado: {
        id: datos.empleado.id,
        legajo: datos.empleado.legajo,
        nombre: datos.empleado.nombre,
        apellido: datos.empleado.apellido,
      },
    };
  }
  async getPeliculasForAdmin(): Promise<
    Array<{
      id: number;
      titulo: string;
    }>
  > {
    const datos = (await axiosAPIPeliculas.get(config.APIPeliculasUrls.getPeliculas)).data;
    const respuesta = datos.map((item: { id: any; titulo: any }) => ({
      id: item.id,
      titulo: item.titulo,
    }));
    return respuesta;
  }

  async getPeliculas(): Promise<
    Array<{
      id: number;
      titulo: string;
      sinopsis: string;
      director: string;
      duracion: number;
      fechaEstreno: string;
      urlImagen: string;
      genero: {
        id: number;
        nombre: string;
      };

      clasificacion: {
        id: number;
        nombre: string;
      };
      estado: {
        id: number;
        nombre: string;
      };
      empleado: {
        id: number;
        legajo: number;
        nombre: string;
        apellido: string;
      };
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
        fechaEstreno: any;
        urlImagen: any;
        genero: {
          id: any;
          nombre: any;
        };

        clasificacion: {
          id: any;
          nombre: any;
        };
        estado: {
          id: any;
          nombre: any;
        };
        empleado: {
          id: any;
          legajo: any;
          nombre: any;
          apellido: any;
        };
      }) => ({
        id: item.id,
        titulo: item.titulo,
        sinopsis: item.sinopsis,
        director: item.director,
        duracion: item.duracion,
        fechaEstreno: item.fechaEstreno,
        urlImagen: item.urlImagen,
        genero: { id: item.genero.id, nombre: item.genero.nombre },
        clasificacion: { id: item.clasificacion.id, nombre: item.clasificacion.nombre },
        estado: { id: item.estado.id, nombre: item.estado.nombre },
        empleado: {
          id: item.empleado.id,
          legajo: item.empleado.legajo,
          nombre: item.empleado.nombre,
          apellido: item.empleado.apellido,
        },
      })
    );
    return respuesta;
  }
  async deletePelicula(id: number): Promise<void> {
    await axiosAPIPeliculas.delete(config.APIPeliculasUrls.getPeliculaById(id));
  }
  async createPelicula(formulario: any): Promise<void> {
    const nuevaPelicula: EditPeliculaOutput = {
      genero: formulario.get('genero').value,
      clasificacion: formulario.get('clasificacion').value,
      estado: formulario.get('estado').value,
      titulo: formulario.get('titulo').value,
      sinopsis: formulario.get('sinopsis').value,
      director: formulario.get('director').value,
      duracion: formulario.get('duracion').value,
      fechaEstreno: formulario.get('fechaEstreno').value,
      urlImagen: formulario.get('imagen').value,
      empleado: {
        id: formulario.get('empleadoId').value,
        legajo: formulario.get('empleadoLegajo').value,
        nombre: formulario.get('empleadoNombre').value,
        apellido: formulario.get('empleadoApellido').value,
      },
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
      genero: {
        id: pelicula.genero.id,
        nombre: pelicula.genero.nombre,
      },
      clasificacion: {
        id: pelicula.clasificacion.id,
        nombre: pelicula.clasificacion.nombre,
      },
      estado: {
        id: pelicula.estado.id,
        nombre: pelicula.estado.nombre,
      },
      empleado: {
        id: pelicula.empleado.id,
        legajo: pelicula.empleado.legajo,
        nombre: pelicula.empleado.nombre,
        apellido: pelicula.empleado.apellido,
      },
      urlImagen: pelicula.urlImagen,
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
