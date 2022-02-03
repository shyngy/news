import React from 'react';
import ArrowRightIcon from '@material-ui/icons/NavigateNextOutlined';

import styles from './SideComments.module.scss';
import { CommentItem } from './CommentsItem';
import clsx from 'clsx';
const data = require('../../data.js');

export const SideComments = () => {
  const [visible, setVisible] = React.useState(true);

  const toggleVisible = () => {
    setVisible(!visible);
  };
  return (
    <div className={clsx(styles.root, !visible && styles.rotated)}>
      <h3 onClick={toggleVisible}>
        Комментарии <ArrowRightIcon />
      </h3>
      {visible &&
        data.comments.popular.map((obj) => (
          <CommentItem {...obj} key={obj.id} />
        ))}
    </div>
  );
};
