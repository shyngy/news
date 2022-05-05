import React from 'react';
import { UserComment } from '../Comment';
import { Divider, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import AddCommentForm from '../AddCommentForm';
import { CommentData } from '../../utils/api/types';
import { useRootSelector } from '../../store/hooks';
import { selectUserData } from '../../store/slices/userSlice';
import { useComments } from '../../hooks/useComment';
interface PostCommentsProps {
  postId: number;
}

const PostComments: React.FC<PostCommentsProps> = ({ postId }) => {
  const userData = useRootSelector(selectUserData);
  const [activeTab, setActiveTab] = React.useState(0);
  const { comments, setComments } = useComments(postId);

  const onChangeTabs = (_: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  const onAddComment = (comment: CommentData) => {
    setComments((prev) => [...prev, comment]);
  };

  const onRemoveComment = (id: number) => {
    setComments((prev) => prev.filter((comment) => comment.id !== id));
  };

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
      {userData && (
        <AddCommentForm onUpComment={onAddComment} postId={postId} />
      )}
      <div className="mb-20" />
      {comments &&
        comments.map((comment) => (
          <UserComment
            key={comment.id}
            id={comment.id}
            user={comment.user}
            text={comment.text}
            createdAt={comment.createdAt}
            currentUserId={userData.id}
            onRemoveComment={onRemoveComment}
          />
        ))}
    </Paper>
  );
};

export default PostComments;
