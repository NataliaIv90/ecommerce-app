import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Input from '../../shared/ui/Input/Input';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .trim()
    .required('This is required field, enter your email.')
    .min(3, 'This field shold be at least 3 symbols')
    .max(50, 'This text is too long')
    .matches(
      /^(((?=.{3,50}$)[A-Za-z0-9\-_+=!]*)|(?=.{5,50}$)([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]+))$/,
      'Enter a valid email!'
    ),
  password: Yup.string()
    .required('Password is required field!')
    .min(8, 'This password is too short')
    .max(50, 'This password is too long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$!%*?&])[A-Za-z\d$!%*?&]{8,}$/,
      'Use uppercase and lowercase letters, numbers, spec symbols (!,%,*,?,&), min 8 characters'
    ),
});

export interface ILoginData {
  email: string;
  password: string;
}

export const Login = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<ILoginData> = (data) => {
    console.log(data);
  };

  const { control, handleSubmit } = useForm<ILoginData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(validationSchema),
  });

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Controller
          control={control}
          name='email'
          render={({ field, fieldState }) => (
            <Input
              autoComplete='off'
              type='email'
              id='email'
              label='email'
              placeholder='user@example.com'
              // error={fieldState.error?.message}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <br />
        <Controller
          control={control}
          name='password'
          render={({ field, fieldState }) => (
            <Input
              type={showPassword ? 'text' : 'password'}
              id='password'
              label='password'
              placeholder='Enter the password ...'
              // error={fieldState.error?.message}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <br />
        <label>
          <input
            type='checkbox'
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          Show Password
        </label>
        <input type='submit' />
      </form>
    </>
  );
};
