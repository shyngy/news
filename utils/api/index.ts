import axios from 'axios';
import { RegisterDto, LoginDto } from './types';

const instance = axios.create({
  baseURL: 'http://localhost:8888',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const UserApi = {
  async register(dto: RegisterDto) {
    const data = await instance.post('/auth/register', dto);
  },

  async login(dto: LoginDto) {
    const data = await instance.post('/auth/login');
  },
};
