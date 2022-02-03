import { Button, TextField, Typography } from '@material-ui/core';
import React from 'react';
import styles from '../AuthAlert.module.scss';
import BackButton from '@material-ui/icons/ArrowBack';
import { AuthFormType } from '..';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginFormSchema } from '../../../utils/validationSchemes';
import FormField from '../../FormField';
interface LoginProps {
  setFormType: (formType: AuthFormType) => () => void;
}
const Login: React.FC<LoginProps> = ({ setFormType }) => {
  const form = useForm({
    resolver: yupResolver(LoginFormSchema),
    mode: 'onBlur',
  });
  console.log(form.formState.errors);
  const onSubmit = (d) => {
    console.log(d);
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
