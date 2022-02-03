import { Button, Input } from '@material-ui/core';
import React from 'react';
import dynamic from 'next/dynamic';
import styles from './WriteForm.module.scss';
const Editor = dynamic(() => import('../Editor').then((m) => m.Editor), {
  ssr: false,
});
interface WriteFormProps {
  title?: string;
}

const WriteForm: React.FC<WriteFormProps> = ({ title }) => {
  React.useEffect(() => {}, []);
  return (
    <div className={styles.container}>
      <Input
        placeholder="Заголовок"
        classes={{ root: styles.titleField }}
        defaultValue={title}
      />
      <div className={styles.editor}>
        <Editor />
      </div>
      <Button variant="contained" color="primary">
        Опубликовать
      </Button>
    </div>
  );
};

export default WriteForm;
