import axios from 'axios';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import Cookies, { parseCookies } from 'nookies';
import { PostApi } from './post';
import { UserApi } from './user';

export type ApiReturnType = {
  user: ReturnType<typeof UserApi>;
  post: ReturnType<typeof PostApi>;
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
  return {
    user: UserApi(instance),
    post: PostApi(instance),
  };
};
