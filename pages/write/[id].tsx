import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import WriteForm from '../../components/WriteForm';
import { Api } from '../../utils/api';
import { PostData } from '../../utils/api/types';

interface WritePageProps {
  post: PostData;
}

const WritePage: NextPage<WritePageProps> = ({ post }) => {
  return (
    <MainLayout className="main-layout-white" hideComments hideMenu>
      <WriteForm data={post} />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const id = Number(context.params.id);
    const post = await Api(context).post.getOne(id);
    const user = await Api(context).user.getMe();
    if (post.user.id !== user.id) {
      return {
        props: {},
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return {
      props: { post },
    };
  } catch (error) {
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default WritePage;
