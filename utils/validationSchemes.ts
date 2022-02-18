import * as yup from 'yup';

export const LoginFormSchema = yup.object().shape({
  email: yup.string().email('Неверная почта').required('Почта обязательна'),
  password: yup
    .string()
    .min(8, 'Минимальная длинна пароля 8')
    .required('Введите пароль'),
});
export const RegisterFormSchema = yup
  .object()
  .shape({
    fullName: yup.string().required('Имя и фамилия обязательны'),
    password: yup
      .string()
      .required('Please Enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      ),
  })
  .concat(LoginFormSchema);
