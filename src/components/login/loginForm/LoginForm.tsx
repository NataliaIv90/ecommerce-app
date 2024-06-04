import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Input from '../../../shared/ui/Input/Input';
import { FormFooter } from '../formFooter/FormFooter';
import { OutlinedButton } from '../../../shared/button/outlinedButton/OutlinedButton';
import { SignIn } from '../../../store/slices/customerSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../../shared/ui/Loader/Loader';

export interface ILoginData {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('This is required field, enter your email.')
    .email('Email must be valid email.')
    .min(3, 'This field shold be at least 3 symbols')
    .max(50, 'This text is too long')
    .trim('Email address must not contain leading or trailing whitespace.')
    .matches(
      /^(((?=.{3,50}$)[A-Za-z0-9\-_+=!]*)|(?=.{5,50}$)([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]+))$/,
      'The domain part of the address with an error, should contain (.domain-name).For example: user@example.com'
    ),
  password: Yup.string()
    .test(
      'no-whitespace',
      'Whitespace is not allowed',
      (value: string | undefined) => !/^\s+|\s+$/g.test(value as string)
    )
    .required('Password is required field, enter your password.')
    .min(8, 'This password is too short, must be at least 8 characters long')
    .max(50, 'This password is too long')
    .matches(/[A-Z]/, 'The password must contain capital letter')
    .matches(/[a-z]/, 'The password must contain a lowercase letter')
    .matches(/\d/, 'The password must contain a digit')
    .matches(/[!%*?&]/, 'Use spec symbols (!,%,*,?,&)'),
});

export const LoginForm = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const customer = useAppSelector((state) => state.customers.customer);

  const onSubmit: SubmitHandler<ILoginData> = (data) => {
    const email = data.email;
    const password = data.password;
    if (email && password) {
      setLoading(true);
      void dispatch(SignIn({ email, password, setLoading })).then((response) => {
        if (SignIn.fulfilled.match(response)) {
          const customerData = response.payload.customer;
          if (customerData) {
            alert(`Successful authorization. Hello ${customerData?.firstName || ''}!`);
            navigate('/');
          } else {
            setLoading(false);
            setEmailError(true);
          }
        }
      });
    }
  };

  useEffect(() => {
    setLoading(false);
    if (customer) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [customer]);

  const { control, handleSubmit } = useForm<ILoginData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
    resolver: yupResolver(validationSchema),
  });

  return (
    <>
      <div className='login'>
        <form
          className='login-form'
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Controller
            control={control}
            name='email'
            render={({ field, fieldState }) => (
              <Input
                autoComplete='email'
                type='email'
                id='email'
                placeholder='Enter the email ...'
                error={
                  emailError ? 'Customer account with the given credentials not found.' : fieldState.error?.message
                }
                value={field.value}
                onChange={field.onChange}
                onFocus={() => setEmailError(false)}
              />
            )}
          />
          <br />
          <Controller
            control={control}
            name='password'
            render={({ field, fieldState }) => (
              <Input
                autoComplete='current-password'
                type={showPassword ? 'text' : 'password'}
                id='password'
                placeholder='Enter the password ...'
                error={
                  emailError ? 'Customer account with the given credentials not found.' : fieldState.error?.message
                }
                value={field.value}
                onChange={field.onChange}
                onFocus={() => setEmailError(false)}
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
          <OutlinedButton
            type='submit'
            text='Sign in'
            wideBtn={true}
          />
          <FormFooter />
        </form>
      </div>
      <Loader isLoading={isLoading} />
    </>
  );
};
