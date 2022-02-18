import React from 'react';
import { UserComment } from '../Comment';
import { Divider, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import AddCommentForm from '../AddCommentForm';
import data from '../../data';
type Comment = {
  text: string;
  id: number;
  createdAt: string;
  user: {
    fullName: string;
    avatarUrl: string;
  };
};

interface PostCommentsProps {
  items: Comment[];
}

const PostComments: React.FC<PostCommentsProps> = ({ items }) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const comments = data.comments[activeTab === 0 ? 'popular' : 'new'];
  const onChangeTabs = (_: React.ChangeEvent<{}>, newValue: number) =>
    setActiveTab(newValue);
  return (
    <Paper elevation={0} className="mt-40 p-30">
      <Typography variant="h6" className="mb-20">
        42 комментария
      </Typography>
      <Tabs
        className="mt-20"
        value={activeTab}
        onChange={onChangeTabs}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Популярные" />
        <Tab label="По порядку" />
      </Tabs>
      <Divider />
      <AddCommentForm />
      <div className="mb-20" />
      {comments &&
        comments.map((item) => (
          <UserComment
            key={item.id}
            user={item.user}
            text={item.text}
            createdAt={item.createdAt}
          />
        ))}
    </Paper>
  );
};

export default PostComments;
