import { Injectable } from '@angular/core';
import { config } from '../axios_service/env';
import {
  axiosAPIFuncionesYsalas,
  axiosAPIPeliculas,
  axiosAPIPromociones,
  axiosAPIUsuario,
  axiosAPIVentas,
} from '../axios_service/axios.client';

import { EditPeliculaOutput } from '../pages/pantallas peliculas/editar-pelicula/editar-pelicula.dto';
import { EditPeliculaInput } from '../pages/pantallas peliculas/editar-pelicula/editar-pelicula.dto';
import { EditGenero, GeneroInput } from '../pages/Genero/genero.dto';
import { SalaInput } from '../pages/sala/sala-dto';
import { FuncionInput } from '../pages/funcion/funcion-dto';
import { RolInput } from '../pages/Rol/rol-dto';
import { EditIdioma, IdiomaInput } from '../pages/Idioma/idioma.dto';
import { EditEstado, EstadoInput } from '../pages/lista estado pelicula/estado-pelicula.dto';
import { EditClasificacion, ClasificacionInput } from '../pages/Clasificacion/clasificacion.dto';
import { RegisterEmpleadoDTO } from '../pages/register/registerEmpleado.dto';
import {
  EditPromocionInput,
  EditPromocionOutput,
} from '../pages/pantallas promocion/promocion.dto';
import { Observable, BehaviorSubject } from 'rxjs'; //sacado del tp de restaurant
import { NewPermiso } from '../pages/Permiso/newPermiso.dto';
import { FormatoInput, FormatoOutput } from '../pages/formato/formato.dto';
@Injectable({
  providedIn: 'root',
})
@Injectable({ providedIn: 'root' })
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

  //dia
  async getDiaById(id: number): Promise<{
    id: number;
    nombre: string;
  }> {
    const datos = (await axiosAPIPromociones.get(config.APIPromocionesUrls.getDiaById(id))).data;
    return {
      id: datos.id,
      nombre: datos.nombre,
    };
  }

  //promocion
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
  //register
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }
  async register(credentials: RegisterEmpleadoDTO): Promise<any> {
    const respuesta = (await axiosAPIUsuario.post(config.APIUsuariosUrls.register, credentials))
      .data;
    const token = respuesta.access_token;
    const refreshToken = respuesta.refresh_token;
    if (token) {
      localStorage.setItem('access_token', token);
      localStorage.setItem('refresh_token', refreshToken);
      this.loggedIn.next(true);
    }
    return respuesta;
  }
  async login(credentials: { email: string; password: string }): Promise<any> {
    const respuesta = (await axiosAPIUsuario.post(config.APIUsuariosUrls.login, credentials)).data;
    const token = respuesta.accessToken;
    const refreshToken = respuesta.refreshToken;
    if (token) {
      localStorage.setItem('access_token', token);
      localStorage.setItem('refresh_token', refreshToken);
      this.loggedIn.next(true);
    }
    return respuesta;
  }
  //permiso

  async getPermisoById(id: number): Promise<{
    id: number;
    nombre: string;
  }> {
    const datos = (await axiosAPIUsuario.get(config.APIUsuariosUrls.getPermisoById(id))).data;
    return {
      id: datos.id,
      nombre: datos.nombre,
    };
  }
  async getAllPermisos(): Promise<
    Array<{
      id: number;
      nombre: string;
    }>
  > {
    const datos = (await axiosAPIUsuario.get(config.APIUsuariosUrls.getPermisos)).data;

    const respuesta = datos.map((item: { id: number; nombre: string }) => ({
      id: item.id,
      nombre: item.nombre,
    }));

    return respuesta;
  }

  async createPermiso(formulario: any): Promise<void> {
    const nuevoPermiso: NewPermiso = {
      nombre: formulario.get('nombre').value,
    };
    await axiosAPIUsuario.post(config.APIUsuariosUrls.createPermiso, nuevoPermiso);
  }
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

  //ventas
  async getVentas(): Promise<
    Array<{
      nroVenta: number;
      fecha: Date;
      hora: Date;
      total: number;
      promocionId?: number;
    }>
  > {
    try {
      const response = await axiosAPIVentas.get(config.APIVentasUrls.getVentas);
      const datos = response.data;

      return datos.map((item: any) => ({
        nroVenta: item.nroVenta,
        fecha: new Date(item.fecha),
        hora: new Date(item.hora),
        total: item.total,
        promocionId: item.promocionId,
      }));
    } catch (error) {
      console.error('Error al obtener ventas:', error);
      return [];
    }
  }
  //salas
  async getAllSalas(): Promise<
    Array<{
      id: number;
      numero: number;
      disponibilidad: string;
      capacidad: number;
    }>
  > {
    try {
      const response = await axiosAPIPeliculas.get(config.APIPeliculasUrls.getAllSalas);
      const datos = response.data;

      return datos.map((item: any) => ({
        id: item.id,
        numero: item.numero,
        disponibilidad: item.disponibilidad,
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
    capacidad: number;
  }> {
    const item = (await axiosAPIPeliculas.get(config.APIPeliculasUrls.getSalaById(id))).data;
    return {
      id: item.id,
      numero: item.nummero,
      disponibilidad: item.disponibilidad,
      capacidad: item.capacidad,
    };
  }

  async createSala(salaData: {
    nroSala: number;
    capacidad: number;
    estaDisponible: boolean;
  }): Promise<void> {
    await axiosAPIPeliculas.post(config.APIPeliculasUrls.createSalas, salaData);
  }

  async updateSala(sala: SalaInput): Promise<void> {
    const data: SalaInput = {
      nroSala: sala.nroSala,
      capacidad: sala.capacidad,
      estaDisponible: sala.estaDisponible,
    };
    await axiosAPIPeliculas.put(`${config.APIPeliculasUrls.updateSala(sala.id!)}`, data);
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

  //Roles
  async getAllRoles(): Promise<
    Array<{
      id: number;
      nombre: string;
    }>
  > {
    try {
      const response = await axiosAPIUsuario.get(config.APIUsuariosUrls.getAllRoles);
      const datos = response.data;

      return datos.map((item: any) => ({
        id: item.id,
        nombre: item.nombre,
      }));
    } catch (error) {
      console.error('Error al obtener roles:', error);
      return [];
    }
  }
  async getRolesById(id: number): Promise<{
    id: number;
    nombre: string;
  }> {
    const item = (await axiosAPIUsuario.get(config.APIUsuariosUrls.getRolById(id))).data;
    return {
      id: item.number,
      nombre: item.nombre,
    };
  }

  async createRol(rolData: { nombre: string }): Promise<void> {
    await axiosAPIUsuario.post(config.APIUsuariosUrls.createRol, rolData);
  }

  async updateRol(rol: RolInput): Promise<void> {
    const data: RolInput = {
      nombre: rol.nombre,
    };
    await axiosAPIUsuario.put(`${config.APIUsuariosUrls.updateRol(rol.id!)}`, data);
  }
}
