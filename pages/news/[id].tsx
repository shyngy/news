import { MainLayout } from '../../layouts/MainLayout';
import { FullPost } from '../../components/FullPost';
import React from 'react';
import PostComments from '../../components/PostComments';
import { GetServerSideProps, NextPage } from 'next';
import { Api } from '../../utils/api';
import { PostData } from '../../utils/api/types';

interface FullPostPageProps {
  post: PostData;
}

const FullPostPage: NextPage<FullPostPageProps> = ({ post }) => {
  return (
    <MainLayout className="mb-50" contentFullWidth>
      <FullPost title={post.title} blocks={post.body} />
      <PostComments postId={post.id} />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const id = Number(context.params.id);
    const post = await Api(context).post.getOne(id);
    return {
      props: { post },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default FullPostPage;
