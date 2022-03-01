import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { Post } from '../components/Post';
import { MainLayout } from '../layouts/MainLayout';
import { wrapper } from '../store';
import { setUserData } from '../store/slices/userSlice';
import { UserApi } from '../utils/api';

export default function Home() {
  return (
    <MainLayout>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    try {
      const { authToken } = parseCookies(context);
      const userData = await UserApi.getMe(authToken);
      store.dispatch(setUserData(userData));

      return { props: {} };
    } catch (error) {
      console.error('!###', error);
      return { props: {} };
    }
  });
