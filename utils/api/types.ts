import { OutputData } from '@editorjs/editorjs';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto extends LoginDto {
  fullName: string;
}

export interface ResponseUser extends Omit<RegisterDto, 'password'> {
  createdAt: string;
  updatedAt: string;
  id: number;
  token: string;
}
export type PostData = {
  title: string;
  body: OutputData['blocks'];
  tags: null | string;
  description: string;
  id: number;
  user: ResponseUser;
  views: number;
  createdAt: string;
  updatedAt: string;
};
