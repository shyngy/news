import React from 'react';
import {
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Avatar,
} from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreHorizOutlined';

import styles from './Comment.module.scss';
import { Api } from '../../utils/api';

interface CommentPostProps {
  text: string;
  createdAt: string;
  id: number;
  currentUserId: number;
  onRemoveComment: (id: number) => void;
  user: {
    fullName: string;
    avatarUrl?: string;
    id: number;
    email: string;
  };
}

export const UserComment: React.FC<CommentPostProps> = ({
  user,
  text,
  createdAt,
  currentUserId,
  onRemoveComment,
  id,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [createAt, setCreateAt] = React.useState('');
  React.useEffect(() => {
    setCreateAt(createdAt);
  }, []);
  const handleClick = (event: React.ChangeEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickRemove = async () => {
    try {
      await Api().comment.remove(id);
      onRemoveComment(id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.comment}>
      <div className={styles.userInfo}>
        <Avatar className="mr-5">{user.fullName[0]}</Avatar>
        <b>{user.fullName}</b>
        <span>{createAt}</span>
      </div>
      <Typography className={styles.text}>{text}</Typography>
      <span className={styles.replyBtn}>Ответить</span>
      <IconButton onClick={handleClick}>
        <MoreIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        elevation={2}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem onClick={handleClickRemove}>Удалить</MenuItem>
        <MenuItem onClick={handleClose}>Редактировать</MenuItem>
      </Menu>
    </div>
  );
};
