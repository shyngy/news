import axios from 'axios';
import { RegisterDto, LoginDto, ResponseUser } from './types';

const instance = axios.create({
  baseURL: 'http://localhost:8888',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const UserApi = {
  async register(dto: RegisterDto) {
    const { data } = await instance.post<RegisterDto, { data: ResponseUser }>(
      '/auth/register',
      dto
    );
    return data;
  },

  async login(dto: LoginDto) {
    const { data } = await instance.post<RegisterDto, { data: ResponseUser }>(
      '/auth/login',
      dto
    );
    return data;
  },
  async getMe(token: string) {
    const { data } = await instance.get<ResponseUser>('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },
};
