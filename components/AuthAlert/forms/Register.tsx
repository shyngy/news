import { Button, TextField, Typography } from '@material-ui/core';
import React from 'react';
import styles from '../AuthAlert.module.scss';
import BackButton from '@material-ui/icons/ArrowBack';
import { AuthFormType } from '..';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterFormSchema } from '../../../utils/validationSchemes';
import FormField from '../../FormField';
import { RegisterDto } from '../../../utils/api/types';
import { UserApi } from '../../../utils/api';
interface RegisterProps {
  setFormType: (formType: AuthFormType) => () => void;
}
const Register: React.FC<RegisterProps> = ({ setFormType }) => {
  const form = useForm({
    resolver: yupResolver(RegisterFormSchema),
    mode: 'onChange',
  });

  const onSubmit = async (dto: RegisterDto) => {
    try {
      const data = await UserApi.register(dto);
      console.log(data);
    } catch (error) {
      console.warn(error, 'register error');
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
            Регистрация
          </Typography>
        </span>
        <FormField name="fullName" label="Имя и фамилия" />
        <FormField name="email" label="Почта" />
        <FormField name="password" label="Пароль" type="password" />
        <div className={styles.buttonsSection}>
          <Button
            className="mb-10 mt-20"
            variant="contained"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            color="primary"
            type="submit"
          >
            Регистрация
          </Button>
          <Button
            className="mb-10 mt-20"
            variant="text"
            color="primary"
            onClick={setFormType('login')}
          >
            Войти
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default Register;
