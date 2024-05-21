import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Input from '../../../shared/ui/Input/Input';
import { FormFooter } from '../formFooter/FormFooter';
import { OutlinedButton } from '../../../shared/button/outlinedButton/OutlinedButton';
import { SignIn } from '../../../store/slices/customerSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { useState, useEffect } from 'react';
import { Snackbar, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { Loader } from '../../../shared/ui/Loader/Loader';

export interface ILoginData {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .trim('Email address must not contain leading or trailing whitespace.')
    .test('no-whitespace', 'Whitespace is not allowed', (value: string | undefined) => !/\s/.test(value as string))
    .test('lowercase', 'Password must contain lowercase letter', (value) => {
      if (!value) return true;

      return /[a-z]/.test(value);
    })
    .email('Email must be valid email.')
    .required('This is required field, enter your email.')
    .min(3, 'This field shold be at least 3 symbols')
    .max(50, 'This text is too long')
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
  const [open, setOpen] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
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
    if (customer && Object.keys(customer).length) {
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

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleClose}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </>
  );

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
                  passwordError ? 'Customer account with the given credentials not found.' : fieldState.error?.message
                }
                value={field.value}
                onChange={field.onChange}
                onFocus={() => setPasswordError(false)}
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
          <Snackbar
            key={`top,center`}
            open={open}
            action={action}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            message='Customer account with the given credentials not found.'
          />
        </form>
      </div>
      <Loader isLoading={isLoading} />
    </>
  );
};
