import { AxiosInstance } from 'axios';

import { CommentData } from './types';

export type CreateCommentDto = {
  postId: number;
  text: string;
};
export const CommentApi = (instance: AxiosInstance) => ({
  async getAll(postId: number) {
    const { data } = await instance.get<
      CreateCommentDto,
      { data: CommentData[] }
    >('/comments', {
      params: {
        postId,
      },
    });
    return data;
  },

  async create(dto: CreateCommentDto) {
    const { data } = await instance.post<
      CreateCommentDto,
      { data: CommentData }
    >('/comments', dto);
    return data;
  },

  async remove(id: number) {
    return await instance.delete(`/comments/${id}`);
  },
});
