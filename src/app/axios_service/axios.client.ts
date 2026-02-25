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
        config.headers.Authorization = `Bearer ${token}`;
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

    // No enviar auth en login
    if (token && !config.url?.includes('usuario/login')) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
axiosAPIUsuario.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (!error.response) {
            return Promise.reject(error);
        }

        if (
            error.response.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes('usuario/login') &&
            !originalRequest.url?.includes('usuario/refresh')
        ) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh_token');
                if (!refreshToken) throw new Error('No refresh token');

                const response = await axios.post(config.APIUsuariosUrls.refreshToken, null, {
                    headers: {
                        'refresh-token': refreshToken,
                    },
                });

                const { accessToken } = response.data;
                if (!accessToken) throw new Error('No access token');

                localStorage.setItem('access_token', accessToken);

                originalRequest.headers = {
                    ...originalRequest.headers,
                    Authorization: `Bearer ${accessToken}`,
                };

                return axiosAPIUsuario(originalRequest);
            } catch (e) {
                localStorage.clear();
                window.location.href = '/login';
                return Promise.reject(e);
            }
        }

        return Promise.reject(error);
    },
);

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
        config.headers.Authorization = token;
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
