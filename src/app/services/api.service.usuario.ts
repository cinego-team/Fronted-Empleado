import { Injectable } from '@angular/core';
import { config } from '../axios_service/env';
import { axiosAPIUsuario } from '../axios_service/axios.client';
import { RegisterEmpleadoDTO } from '../pages/register/registerEmpleado.dto';
import { BehaviorSubject, Observable } from 'rxjs';
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
  getIsLoggedInObservable(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  checkTokenValidity(): boolean {
    return !!this.getToken();
  }
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
  getUsuarioDesdeToken(): { nombre: string; apellido: string } | null {
    const token = localStorage.getItem('access_token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        nombre: payload.nombre,
        apellido: payload.apellido,
      };
    } catch {
      return null;
    }
  }
  // Obtener el nombre completo del usuario desde el token
  getNombreCompleto(): string {
    const usuario = this.getUsuarioDesdeToken();
    return usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Usuario';
  }

  async register(
    credentials: {
      nombre: string;
      apellido: string;
      email: string;
      contrasena: string;
      dd: number;
      mm: number;
      aaaa: number;
      nroTelefono: string;
      rol: {
        id: number;
        nombre: string;
      };
    },
    captcha: string
  ): Promise<any> {
    const respuesta = (
      await axiosAPIUsuario.post(config.APIUsuariosUrls.register, credentials, {
        headers: { 'x-captcha-token': captcha || '' },
      })
    ).data;
    const token = respuesta.access_token;
    const refreshToken = respuesta.refresh_token;
    if (token) {
      localStorage.setItem('access_token', token);
      localStorage.setItem('refresh_token', refreshToken);
      this.loggedIn.next(true);
    }
    return respuesta;
  }
  async login(credentials: { email: string; password: string }, captcha: string): Promise<any> {
    const respuesta = (
      await axiosAPIUsuario.post(config.APIUsuariosUrls.login, credentials, {
        headers: { 'x-captcha-token': captcha || '' },
      })
    ).data;
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
  //tipo cliente
  async getTipoClienteById(id: number): Promise<{
    id: number;
    denominacion: string;
    descripcion: string;
  }> {
    const datos = (await axiosAPIUsuario.get(config.APIUsuariosUrls.getTipoClienteById(id))).data;
    return {
      id: datos.id,
      denominacion: datos.denominacion,
      descripcion: datos.descripcion,
    };
  }
  async getAllTiposClientes(): Promise<
    Array<{
      id: number;
      denominacion: string;
      descripcion: string;
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
      Denominacion: formulario.get('denominacion').value,
      Descripcion: formulario.get('descripcion').value,
    };
    await axiosAPIUsuario.post(config.APIUsuariosUrls.createTipoCliente, nuevoTipoCliente);
  }
  async updateTipoCliente(tipoCliente: TipoClienteInput): Promise<void> {
    const data: TipoClienteInput = {
      denominacion: tipoCliente.denominacion,
      descripcion: tipoCliente.descripcion,
    };
    await axiosAPIUsuario.put(`${config.APIUsuariosUrls.updateTipoCliente(tipoCliente.id!)}`, data);
  }
  async refreshToken(): Promise<void> {
    const response = await axiosAPIUsuario.get(config.APIUsuariosUrls.refreshToken);

    const { accessToken, refreshToken } = response.data;

    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
    }

    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }
  }
}
