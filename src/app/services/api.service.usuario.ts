import { Injectable } from '@angular/core';
import { config } from '../axios_service/env';
import { axiosAPIUsuario } from '../axios_service/axios.client';
import { RegisterEmpleadoDTO } from '../pages/register/registerEmpleado.dto';
import { NewPermiso } from '../pages/Permiso/newPermiso.dto';
import { BehaviorSubject } from 'rxjs';
import { RolInput } from '../pages/Rol/rol-dto';
import {
  EditTipoCliente,
  TipoClienteInput,
} from '../pages/pantallas tipo-cliente/tipos-cliente.dto';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ApiServiceUsuario {
  constructor(private router: Router) {}
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
  //logout
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
  //falta el refresh token
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
  async deletePermiso(id: number): Promise<void> {
    await axiosAPIUsuario.delete(config.APIUsuariosUrls.getPermisoById(id));
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
  //tipo cliente
  async getTipoClienteById(id: number): Promise<{
    id: number;
    nombre: string;
  }> {
    const datos = (await axiosAPIUsuario.get(config.APIUsuariosUrls.getTipoClienteById(id))).data;
    return {
      id: datos.id,
      nombre: datos.nombre,
    };
  }
  async getAllTiposClientes(): Promise<
    Array<{
      id: number;
      nombre: string;
    }>
  > {
    const datos = (await axiosAPIUsuario.get(config.APIUsuariosUrls.getTiposClientes)).data;

    const respuesta = datos.map((item: { id: number; nombre: string }) => ({
      id: item.id,
      nombre: item.nombre,
    }));

    return respuesta;
  }
  async deleteTipoCliente(id: number): Promise<void> {
    await axiosAPIUsuario.delete(config.APIUsuariosUrls.getTipoClienteById(id));
  }
  async createTipoCliente(formulario: any): Promise<void> {
    const nuevoTipoCliente: EditTipoCliente = {
      nombre: formulario.get('nombre').value,
    };
    await axiosAPIUsuario.post(config.APIUsuariosUrls.createTipoCliente, nuevoTipoCliente);
  }
  async updateTipoCliente(tipoCliente: TipoClienteInput): Promise<void> {
    const data: TipoClienteInput = {
      nombre: tipoCliente.nombre,
    };
    await axiosAPIUsuario.put(`${config.APIUsuariosUrls.updateTipoCliente(tipoCliente.id!)}`, data);
  }
}
