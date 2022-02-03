import { MainLayout } from '../../layouts/MainLayout';
import { FullPost } from '../../components/FullPost';
import React from 'react';
import PostComments from '../../components/PostComments';
import data from '../../data';
export default function Home() {
  return (
    <MainLayout className="mb-50" contentFullWidth>
      <FullPost />
      <PostComments items={data.comments.popular} />
    </MainLayout>
  );
}
