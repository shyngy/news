import { Button } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import React from 'react';
import styles from './AddCommentForm.module.scss';
type AddEventListener = Event & {
  path: Node[];
  target: HTMLElement;
};
const AddCommentForm = () => {
  const [clicked, setClicked] = React.useState(false);
  const [text, setText] = React.useState('');
  const minRows = clicked ? 5 : 1;

  React.useEffect(() => {
    // чтобы скрывать и открывать элемент лучше использовать onBlur и onFocus
    // я сделала через window
    if (typeof window === 'undefined') return;
    window.addEventListener('click', onEventListener);
    return () => {
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
  const onAddComment = () => {
    setClicked(false);
    setText('');
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
        onChange={inputOnChange}
      />
      {clicked && (
        <Button
          className={styles.addButton}
          color="primary"
          variant="contained"
          onClick={onAddComment}
          id="add-button"
        >
          Опубликовать
        </Button>
      )}
    </div>
  );
};

export default AddCommentForm;
