import axios, { AxiosInstance } from 'axios';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import Cookies, { parseCookies } from 'nookies';
import { CommentApi } from './comment';
import { PostApi } from './post';
import { UserApi } from './user';

export type ApiReturnType = {
  user: ReturnType<typeof UserApi>;
  post: ReturnType<typeof PostApi>;
  comment: ReturnType<typeof CommentApi>;
};

const composeApi = (apis: unknown, instance: AxiosInstance) => {
  return Object.entries(apis).reduce((prev: any, [key, func]) => {
    return {
      ...prev,
      [key]: func(instance),
    };
  }, {});
};

export const Api = (
  context?: NextPageContext | GetServerSidePropsContext
): ApiReturnType => {
  const cookies = context ? Cookies.get(context) : parseCookies();
  const token = cookies.newsToken;
  const instance = axios.create({
    baseURL: 'http://localhost:8888',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  const apis = {
    user: UserApi,
    post: PostApi,
    comment: CommentApi,
  };

  return composeApi(apis, instance);
};
