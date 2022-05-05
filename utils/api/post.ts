import { OutputData } from '@editorjs/editorjs';
import { AxiosInstance } from 'axios';
import { PostData, SearchPostDto } from './types';

export type CreatePostDto = {
  title: string;
  body: OutputData['blocks'];
};
export const PostApi = (instance: AxiosInstance) => ({
  async getOne(id: number) {
    const { data } = await instance.get<PostData>(`/posts/${id}`);
    return data;
  },

  async search(query: SearchPostDto) {
    const { data } = await instance.get('/posts/search', {
      params: query,
    });
    return data;
  },

  async getAll() {
    const { data } = await instance.get<PostData[]>('/posts');
    return data;
  },

  async create(dto: CreatePostDto) {
    const { data } = await instance.post<CreatePostDto, { data: PostData }>(
      '/posts',
      dto
    );
    return data;
  },

  async update(id: number, dto: CreatePostDto) {
    const { data } = await instance.patch<CreatePostDto, { data: PostData }>(
      `/posts/${id}`,
      dto
    );
    return data;
  },
});
