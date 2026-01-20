import axios from 'axios';
import { config } from './env';
//promociones
export const axiosAPIPromociones = axios.create({
  baseURL: config.APIPromocionesUrls.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosAPIPromociones.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  if (token) {
    config.headers.Authorization = token;
  }
  if (refreshToken) {
    config.headers['refresh-token'] = refreshToken;
  }

  return config;
});
//peliculas
export const axiosAPIPeliculas = axios.create({
  baseURL: config.APIPeliculasUrls.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosAPIPeliculas.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  if (token) {
    config.headers.Authorization = token;
  }
  if (refreshToken) {
    config.headers['refresh-token'] = refreshToken;
  }

  return config;
});
//usuario
export const axiosAPIUsuario = axios.create({
  baseURL: config.APIUsuariosUrls.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosAPIUsuario.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');

  // 🔴 EN LOGIN NO SE MANDA AUTH
  if (!config.url?.includes('usuario/login')) {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (refreshToken) {
      config.headers['refresh-token'] = refreshToken;
    }
  }

  return config;
});


//funciones
export const axiosAPIFuncionesYsalas = axios.create({
  baseURL: config.APIFuncionesUrls.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosAPIFuncionesYsalas.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (refreshToken) {
    config.headers['refresh-token'] = refreshToken;
  }

  return config;
});
//ventas
export const axiosAPIVentas = axios.create({
  baseURL: config.APIVentasUrls.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosAPIVentas.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  if (token) {
    config.headers.Authorization = token;
  }
  if (refreshToken) {
    config.headers['refresh-token'] = refreshToken;
  }

  return config;
});
