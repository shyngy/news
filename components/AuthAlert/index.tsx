import React from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import styles from './AuthAlert.module.scss';
import Main from './forms/Main';
import Login from './forms/Login';
import Register from './forms/Register';

interface AuthDialogProps {
  onVisible: (isVisible: boolean) => () => void;
  visible: boolean;
}
export type AuthFormType = 'main' | 'login' | 'register';
export const AuthAlert: React.FC<AuthDialogProps> = ({
  onVisible,
  visible,
}) => {
  const [formType, setFormType] = React.useState<AuthFormType>('main');

  const onFormType = (formType: AuthFormType) => {
    return () => {
      setFormType(formType);
    };
  };

  return (
    <Dialog open={visible} onClose={onVisible(false)} maxWidth="xs" fullWidth>
      <DialogContent>
        <section className={styles.content}>
          {formType === 'main' && <Main setFormType={onFormType} />}
          {formType === 'login' && <Login setFormType={onFormType} />}
          {formType === 'register' && <Register setFormType={onFormType} />}
        </section>
      </DialogContent>
    </Dialog>
  );
};
