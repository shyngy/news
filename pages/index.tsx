import { GetServerSideProps, NextPage } from 'next';

import { Post } from '../components/Post';
import { MainLayout } from '../layouts/MainLayout';
import { Api } from '../utils/api';
import { PostData } from '../utils/api/types';
interface HomeProps {
  posts: PostData[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <MainLayout>
      {posts &&
        posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            description={post.description}
          />
        ))}
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const posts = await Api().post.getAll();
    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        posts: null,
      },
    };
  }
};

export default Home;
