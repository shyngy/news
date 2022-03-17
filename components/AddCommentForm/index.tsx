import { Button } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import React from 'react';
import { Api } from '../../utils/api';
import { CommentData } from '../../utils/api/types';
import styles from './AddCommentForm.module.scss';
type AddEventListener = Event & {
  path: Node[];
  target: HTMLElement;
};

interface AddCommentFromProps {
  postId: number;
  onUpComment: (comment: CommentData) => void;
}

const AddCommentForm: React.FC<AddCommentFromProps> = ({
  postId,
  onUpComment,
}) => {
  const [clicked, setClicked] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const minRows = clicked ? 5 : 1;

  React.useEffect(() => {
    // чтобы скрывать и открывать элемент лучше использовать onBlur и onFocus
    // я сделала через window
    if (typeof window === 'undefined') return;
    window.addEventListener('click', onEventListener);
    return () => {
      if (typeof window === 'undefined') return;
      window.removeEventListener('click', onEventListener);
    };
  }, []);
  const onEventListener = (event: AddEventListener) => {
    const path = event.path || (event.composedPath && event.composedPath());
    const isButton = path.some((item: HTMLElement) => item.id === 'add-button');
    if (isButton) return;
    const isInput = path.some(
      (item: HTMLElement) => item.id === 'comment-textarea'
    );
    setClicked(isInput);
  };
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
      console.log(error);
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
