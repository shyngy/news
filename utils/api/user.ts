import { AxiosInstance } from 'axios';
import { RegisterDto, LoginDto, ResponseUser } from './types';

export const UserApi = (instance: AxiosInstance) => ({
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
  async getMe() {
    const { data } = await instance.get<ResponseUser>('/users/me');
    return data;
  },
});
