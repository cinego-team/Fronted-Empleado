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

  async getEmpleadoCompletoDesdeToken(): Promise<{
    id: number;
    legajo: number;
    nombre: string;
    apellido: string;
  } | null> {
    const token = this.getToken();
    if (!token) return null;

    const decoded = this.decodeToken(token);
    const id = decoded?.sub;
    if (!id) return null;

    try {
      const response = await axiosAPIUsuario.get(config.APIUsuariosUrls.getDatosEmpleado, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        id: response.data.id,
        legajo: response.data.legajo,
        nombre: response.data.nombre,
        apellido: response.data.apellido,
      };
    } catch (error) {
      console.error('Error obteniendo datos del empleado', error);
      return null;
    }
  }

  async getDatosEmpleado(): Promise<{
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    fechaNacimiento: string;
    nroTelefono: string;
    legajo: number;
    role: {
      id: number;
      name: string;
    };
    permissions: {
      id: number;
      code: string;
    }[];
  }> {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');

    const { data } = await axiosAPIUsuario.get(config.APIUsuariosUrls.getDatosEmpleado, {
      headers: {
        Authorization: access_token,
        'refresh-token': refresh_token,
      },
    });

    return {
      id: data.id,
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      fechaNacimiento: data.fechaNacimiento,
      nroTelefono: data.nroTelefono,
      legajo: data.legajo,
      role: {
        id: data.role.id,
        name: data.role.name,
      },
      permissions: data.permissions.map((p: { id: number; code: string }) => ({
        id: p.id,
        code: p.code,
      })),
    };
  }

  async register(
    datosEmpleado: {
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
    captcha: string, // 👈 agregamos captcha como segundo argumento
  ): Promise<any> {
    try {
      const tokenAdmin = localStorage.getItem('access_token'); // si es necesario
      const payload = { ...datosEmpleado };

      const respuesta = await axiosAPIUsuario.post(
        config.APIUsuariosUrls.register, // o registerEmpleado si es admin
        payload,
        {
          headers: {
            'x-captcha-token': captcha, // captcha en header
            Authorization: tokenAdmin ? `Bearer ${tokenAdmin}` : undefined,
            'Content-Type': 'application/json',
          },
        },
      );

      return respuesta.data;
    } catch (error: any) {
      console.error('Error registrando usuario:', error.response?.data || error.message);
      throw error;
    }
  }

  async login(credentials: { email: string; password: string }, captcha: string): Promise<any> {
    const respuesta = (
      await axiosAPIUsuario.post(config.APIUsuariosUrls.login, credentials, {
        headers: {
          'x-captcha-token': captcha,
        },
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
      name: string;
    }>
  > {
    try {
      const response = await axiosAPIUsuario.get(config.APIUsuariosUrls.getAllRoles);
      const datos = response.data;

      return datos.map((item: any) => ({
        id: item.id,
        name: item.name,
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

    const respuesta = datos.map(
      (item: { id: number; denominacion: string; descripcion: string }) => ({
        id: item.id,
        denominacion: item.denominacion,
        descripcion: item.descripcion,
      }),
    );

    return respuesta;
  }
  async deleteTipoCliente(id: number): Promise<void> {
    await axiosAPIUsuario.delete(config.APIUsuariosUrls.getTipoClienteById(id));
  }
  async createTipoCliente(formulario: {
    denominacion: string;
    descripcion: string;
  }): Promise<void> {
    await axiosAPIUsuario.post(config.APIUsuariosUrls.createTipoCliente, formulario);
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
  decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decodificando token:', error);
      return null;
    }
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const decoded = this.decodeToken(token);
    // El rol puede estar en diferentes propiedades según cómo se generó el token
    return decoded?.role?.name || decoded?.role || decoded?.userRole || null;
  }
  getUserName(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const decoded = this.decodeToken(token);
    return decoded?.name || decoded?.username || decoded?.sub || null;
  }
  getUserId(): number | null {
    const token = this.getToken();
    if (!token) return null;

    const decoded = this.decodeToken(token);
    return decoded?.sub ? Number(decoded.sub) : null;
  }
  async getEmpleadoDesdeToken(): Promise<{ nombre: string; apellido: string } | null> {
    const token = this.getToken();
    if (!token) return null;

    const decoded = this.decodeToken(token);
    const id = decoded?.sub;
    if (!id) return null;

    try {
      const response = await axiosAPIUsuario.get(config.APIUsuariosUrls.getDatosEmpleado, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        nombre: response.data.nombre,
        apellido: response.data.apellido,
      };
    } catch (error) {
      console.error('Error obteniendo datos del empleado', error);
      return null;
    }
  }
}
