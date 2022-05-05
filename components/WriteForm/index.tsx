import { Button, Input } from '@material-ui/core';
import React from 'react';
import dynamic from 'next/dynamic';
import styles from './WriteForm.module.scss';
import { OutputBlockData } from '@editorjs/editorjs';
import { Api } from '../../utils/api';
import { PostData } from '../../utils/api/types';
import { useRouter } from 'next/router';
const Editor = dynamic(() => import('../Editor').then((m) => m.Editor), {
  ssr: false,
});
interface WriteFormProps {
  data: PostData | null;
}

const WriteForm: React.FC<WriteFormProps> = ({ data }) => {
  const [title, setTitle] = React.useState(data?.title || '');
  const [blocks, setBlocks] = React.useState(data?.body || []);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const disabledPublic = isLoading || !blocks.length || !title;

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeEditor = (blocks: Array<OutputBlockData>) => {
    setBlocks(blocks);
  };

  const onAddPost = async () => {
    try {
      setIsLoading(true);
      const postObj = {
        title,
        body: blocks,
      };
      if (!data) {
        const post = await Api().post.create(postObj);
        router.push(`/write/${post.id}`);
      } else {
        await Api().post.update(data.id, postObj);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Input
        placeholder="Заголовок"
        classes={{ root: styles.titleField }}
        defaultValue={title}
        onChange={onChangeTitle}
      />
      <div className={styles.editor}>
        <Editor initialBlocks={data?.body} onChange={onChangeEditor} />
      </div>
      <Button
        disabled={disabledPublic}
        onClick={onAddPost}
        variant="contained"
        color="primary"
      >
        {data ? 'Сохранить' : 'Опубликовать'}
      </Button>
    </div>
  );
};

export default WriteForm;
