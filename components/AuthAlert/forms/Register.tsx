import { Button, TextField, Typography } from '@material-ui/core';
import React from 'react';
import styles from '../AuthAlert.module.scss';
import BackButton from '@material-ui/icons/ArrowBack';
import { AuthFormType } from '..';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterFormSchema } from '../../../utils/validationSchemes';
import FormField from '../../FormField';
interface RegisterProps {
  setFormType: (formType: AuthFormType) => () => void;
}
const Register: React.FC<RegisterProps> = ({ setFormType }) => {
  const form = useForm({
    resolver: yupResolver(RegisterFormSchema),
    mode: 'onBlur',
  });
  console.log(form.formState.errors);
  const onSubmit = (d) => {
    console.log(d);
  };
  console.log(form.formState.errors);

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
            Регистрация
          </Typography>
        </span>
        <FormField name="fullname" label="Имя и фамилия" />
        <FormField name="email" label="Почта" />
        <FormField name="password" label="Пароль" type="password" />
        <div className={styles.buttonsSection}>
          <Button className="mb-10 mt-20" variant="contained" color="primary">
            Регистрация
          </Button>
          <Button
            className="mb-10 mt-20"
            variant="text"
            color="primary"
            onClick={setFormType('login')}
            type="submit"
          >
            Войти
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default Register;
