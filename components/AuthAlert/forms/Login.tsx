import { Button, Typography } from '@material-ui/core';
import React from 'react';
import styles from '../AuthAlert.module.scss';
import BackButton from '@material-ui/icons/ArrowBack';
import { AuthFormType } from '..';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginFormSchema } from '../../../utils/validationSchemes';
import FormField from '../../FormField';
import Alert from '@material-ui/lab/Alert';
import { LoginDto } from '../../../utils/api/types';
import { setCookie } from 'nookies';

import { useRootDispatch } from '../../../store/hooks';
import { setUserData } from '../../../store/slices/userSlice';
import { Api } from '../../../utils/api';
interface LoginProps {
  setFormType: (formType: AuthFormType) => () => void;
}
const Login: React.FC<LoginProps> = ({ setFormType }) => {
  const dispatch = useRootDispatch();
  const [errorMessage, setErrorMessage] = React.useState('');
  const form = useForm({
    resolver: yupResolver(LoginFormSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (dto: LoginDto) => {
    try {
      const data = await Api().user.login(dto);
      setCookie(null, 'newsToken', data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      setErrorMessage('');
      dispatch(setUserData(data));
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <span className={styles.emailSection}>
          <BackButton
            className={styles.backButton}
            onClick={setFormType('main')}
          />

          <Typography
            component={'span'}
            variant={'body2'}
            className={styles.title}
          >
            Вход через почту
          </Typography>
        </span>

        <FormField name="email" label="Почта" />
        <FormField name="password" label="пароль" />
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <div className={styles.buttonsSection}>
          <Button
            type="submit"
            className="mb-10 mt-20"
            variant="contained"
            color="primary"
          >
            Войти
          </Button>
          <Button
            className="mb-10 mt-20"
            variant="text"
            color="primary"
            onClick={setFormType('register')}
          >
            Регистрация
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default Login;
