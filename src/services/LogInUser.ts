// src/services/LogInUser.ts
import { Errors, LogIn, PublicUser } from '../types/auth';
import api from '../utils/network';

export const getUser = async ({ password, emailOrUsername }: LogIn): Promise<Errors | PublicUser> => {
  return await fetchUser({ password, emailOrUsername });
};

const fetchUser = async ({ password, emailOrUsername }: LogIn): Promise<Errors | PublicUser> => {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(emailOrUsername);
    const payload = isEmail ? { password, email: emailOrUsername } : { password, username: emailOrUsername };

    const response = await api.post<PublicUser>('/login', payload);

    // Se asume que la respuesta tiene la estructura { publicData: PublicUser }
    return response.data.publicData;
  } catch (error: any) {
    if (error.response) {
      return {
        emailOrUsername: error.response.data.email ?? error.response.data.username,
        password: 'password is invalid',
      };
    }
    return { general: 'Error inesperado. Intenta de nuevo.' };
  }
};


const refreshAccessToken = async (): Promise<void | null> => {
  try {
    const refreshToken = getCookie('refresh_token');
    if (!refreshToken) return null;
    await api.post<{ accessToken: string }>('/login/refresh', { refreshToken });
  } catch (error) {
    console.error('Error al refrescar el token:', error);
    return null;
  }
};

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop()?.split(';').shift() || null : null;
};

// Refrescamos el token cada 10 segundos
setInterval(async () => {
  await refreshAccessToken();
}, 10 * 1000);
