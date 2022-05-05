import React from 'react';
import styles from './SideComments.module.scss';
import Link from 'next/link';
import { CommentData, PostData, ResponseUser } from '../../utils/api/types';
import { Avatar } from '@material-ui/core';

export const CommentItem: React.FC<CommentData> = ({ user, text, post }) => {
  return (
    <div className={styles.commentItem}>
      <div className={styles.userInfo}>
        <Avatar className="mr-5">{user.fullName[0]}</Avatar>
        <Link href={`/profile/${user.id}`}>
          <a>
            <b>{user.fullName}</b>
          </a>
        </Link>
      </div>
      <p className={styles.text}>{text}</p>

      <Link href={`/news/${post.id}`}>
        <a>
          <span className={styles.postTitle}>{post.title}</span>
        </a>
      </Link>
    </div>
  );
};
