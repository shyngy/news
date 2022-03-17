import React from 'react';
import Link from 'next/link';
import {
  Paper,
  Button,
  IconButton,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
} from '@material-ui/core';
import {
  SearchOutlined as SearchIcon,
  CreateOutlined as PenIcon,
  SmsOutlined as MessageIcon,
  Menu as MenuIcon,
  ExpandMoreOutlined as ArrowBottom,
  NotificationsNoneOutlined as NotificationIcon,
  AccountCircleOutlined as UserIcon,
} from '@material-ui/icons';

import styles from './Header.module.scss';
import { AuthAlert } from '../AuthAlert';
import { useRootSelector } from '../../store/hooks';
import { selectUserData } from '../../store/slices/userSlice';
import { Api } from '../../utils/api';
import { PostData } from '../../utils/api/types';

export const Header: React.FC = () => {
  const userData = useRootSelector(selectUserData);
  const [visible, setVisible] = React.useState(false);
  const [posts, setPosts] = React.useState<PostData[] | []>([]);
  const [searchInputValue, setSearchInputValue] = React.useState('');
  const onVisible = (isVisible: boolean) => {
    return () => {
      setVisible(isVisible);
    };
  };
  const onChangeSearchInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInputValue(event.target.value);
    try {
      if (!event.target.value) {
        return setPosts([]);
      }
      const data = await Api().post.search({ title: event.target.value });
      setPosts(data.posts);
      console.log(posts);
    } catch (e) {
      console.warn(e);
    }
  };
  return (
    <Paper classes={{ root: styles.root }} elevation={0}>
      <div className="d-flex align-center">
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Link href="/">
          <a>
            <h2 className={styles.logo}>//.</h2>
          </a>
        </Link>

        <div className={styles.searchBlock}>
          <SearchIcon />
          <input
            value={searchInputValue}
            placeholder="Поиск"
            onChange={onChangeSearchInput}
          />
          <Paper className={styles.searchBlockPopup}>
            {posts &&
              posts.map((post) => (
                <List>
                  <Link href={`/news/${post.id}`}>
                    <a>
                      <ListItem button key={post.id}>
                        {post.title}
                      </ListItem>
                    </a>
                  </Link>
                </List>
              ))}
          </Paper>
        </div>

        <Link href="/write">
          <a>
            <Button variant="contained" className={styles.penButton}>
              Новая запись
            </Button>
          </a>
        </Link>
      </div>
      <div className="d-flex align-center">
        <IconButton>
          <MessageIcon />
        </IconButton>
        <IconButton>
          <NotificationIcon />
        </IconButton>
        {userData ? (
          <Link href={`/profile/1`}>
            <a className="d-flex align-center">
              <Avatar
                className={styles.avatar}
                alt="Remy Sharp"
                src="https://leonardo.osnova.io/5ffeac9a-a0e5-5be6-98af-659bfaabd2a6/-/scale_crop/108x108/-/format/webp/"
              />
              <ArrowBottom />
            </a>
          </Link>
        ) : (
          <div onClick={onVisible(true)} className={styles.loginButton}>
            <UserIcon />
            <span>Войти</span>
          </div>
        )}
      </div>

      <AuthAlert visible={visible} onVisible={onVisible} />
    </Paper>
  );
};
