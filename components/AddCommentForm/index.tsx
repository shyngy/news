import { Button } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import React from 'react';
import { useElementOutside } from '../../hooks/useElementOutside';
import { Api } from '../../utils/api';
import { CommentData } from '../../utils/api/types';
import styles from './AddCommentForm.module.scss';

interface AddCommentFromProps {
  postId: number;
  onUpComment: (comment: CommentData) => void;
}

const AddCommentForm: React.FC<AddCommentFromProps> = ({
  postId,
  onUpComment,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const { clicked, setClicked, minRows } = useElementOutside(
    '"add-button',
    'comment-textarea'
  );

  const inputOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const onAddComment = async () => {
    try {
      setIsLoading(true);
      const comment = await Api().comment.create({
        postId,
        text,
      });
      onUpComment(comment);
      setClicked(false);
      setText('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.form} id="comment-textarea">
      <Input
        classes={{ root: styles.fieldRoot }}
        minRows={minRows}
        placeholder="Написать комментарий"
        fullWidth
        multiline
        value={text}
        disabled={isLoading}
        onChange={inputOnChange}
      />
      {clicked && (
        <Button
          className={styles.addButton}
          color="primary"
          variant="contained"
          onClick={onAddComment}
          id="add-button"
          disabled={isLoading}
        >
          Опубликовать
        </Button>
      )}
    </div>
  );
};

export default AddCommentForm;
