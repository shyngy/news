import React from 'react';
import { Api } from '../utils/api';
import { CommentData } from '../utils/api/types';
interface UseCommentProps {
  comments: CommentData[];
  setComments: React.Dispatch<React.SetStateAction<CommentData[]>>;
}
export const useComments = (postId?: number): UseCommentProps => {
  const [comments, setComments] = React.useState<CommentData[]>([]);
  React.useEffect(() => {
    (async () => {
      try {
        const comments = await Api().comment.getAll(postId);
        setComments(comments);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  return { comments, setComments };
};
