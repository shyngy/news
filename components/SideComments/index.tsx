import React from 'react';
import ArrowRightIcon from '@material-ui/icons/NavigateNextOutlined';

import styles from './SideComments.module.scss';
import { CommentItem } from './CommentsItem';
import clsx from 'clsx';

import { useComments } from '../../hooks/useComment';
export const SideComments = () => {
  const [visible, setVisible] = React.useState(true);
  const { comments } = useComments();

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div className={clsx(styles.root, !visible && styles.rotated)}>
      <h3 onClick={toggleVisible}>
        Комментарии <ArrowRightIcon />
      </h3>
      {visible && comments.map((obj) => <CommentItem {...obj} key={obj.id} />)}
    </div>
  );
};
