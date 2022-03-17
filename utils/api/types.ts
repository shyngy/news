import { OutputData } from '@editorjs/editorjs';

export interface LoginDto {
  email: string;
  password: string;
}

export interface SearchPostDto {
  title?: string;
  body?: string;
  views?: 'DESC' | 'ASC';
  tag?: string;
  limit?: number;
  take?: number;
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

export interface GetAllOrPick {
  id: number;
  fullName: string;
  commentsCount: number;
}
export interface PostData {
  title: string;
  body: OutputData['blocks'];
  tags: null | string;
  description: string;
  id: number;
  user: ResponseUser;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface CommentData {
  id: number;
  text: string;
  post: Pick<PostData, 'id' | 'title'>;
  user: Pick<ResponseUser, 'email' | 'fullName' | 'id'>;
  createdAt: string;
  updatedAt: string;
}
