import Input from '../../../shared/ui/Input/Input';
import * as Yup from 'yup';
import { ECountrieOptions, IRegisterData } from '../../../types/types';
import { useForm, Controller, SubmitHandler, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { createNewCustomer } from '../../../store/slices/customerSlice';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required field')
    .email()
    .min(5, 'Email should be min 5 symbols')
    .max(50, 'This email is too long'),
  password: Yup.string()
    .min(8, 'This password is too short, min 8 symbols')
    .max(50, 'This password is too long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Use uppercase and lowercase letters, numbers, min 8 characters'
    )
    .required('Password is required field'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Wrong input of confirmation password')
    .required('This field is required'),
  firstName: Yup.string()
    .required('First name is required field')
    .min(1, 'Name should be min 1 characters')
    .max(50, 'This name is too long')
    .matches(/^([A-Z][a-z]*)$/g, 'Name can only contain latin letters, start from capital letter'),
  lastName: Yup.string()
    .required('Last name is required field')
    .min(1, 'Surname should be min 2 characters')
    .max(50, 'This surname is too long')
    .matches(/^([A-Z][a-z]*)$/g, 'Surname can only contain latin letters,  start from capital letter'),
  dateOfBirth: Yup.date()
    .min(new Date('1900-01-01'), 'Date must be after 1900')
    .max(new Date(new Date().getFullYear() - 13, 11, 31), 'User should be at least 13 years'),
  street: Yup.string().required('Street is a required field').min(1, 'Street should be min 1 character'),
  city: Yup.string()
    .required('City is required field')
    .min(1, 'City should be min 1 characters')
    .matches(/^([A-Z][a-z]*)$/g, 'City can only contain latin letters, start from capital letter'),
  country: Yup.string()
    .required('Country is a required field')
    .oneOf([ECountrieOptions.ge, ECountrieOptions.ua, ECountrieOptions.uz]),
  postalCode: Yup.string()
    .required('Postal code is required')
    .when(['country'], (country: ECountrieOptions[], schema) => {
      if (country[0] === ECountrieOptions.ua) {
        return schema.matches(/^\d{5}$/, 'Invalid postal code format for Ukraine');
      } else if (country[0] === ECountrieOptions.uz) {
        return schema.matches(/^\d{6}$/, 'Invalid postal code format for Uzbekistan');
      } else if (country[0] === ECountrieOptions.ge) {
        return schema.matches(/^\d{4}$/, 'Invalid postal code format for Georgia');
      } else {
        return schema;
      }
    }),
});

export const RegistrationForm = (): JSX.Element => {
  // const customer = useAppSelector((state) => state.customers);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IRegisterData> = (data: IRegisterData) => {
    console.log(data);
    dispatch(createNewCustomer(data));
  };

  const { control, handleSubmit } = useForm<IRegisterData>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      street: '',
      password: '',
      repeatPassword: '',
      dateOfBirth: new Date('1900-01-01'),
      country: ECountrieOptions.ge,
      city: '',
      postalCode: '',
    },
    resolver: yupResolver(validationSchema) as Resolver<IRegisterData>,
    mode: 'all',
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name='email'
          render={({ field, fieldState }) => (
            <Input
              type='text'
              id='email'
              placeholder='Enter your email'
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='password'
          render={({ field, fieldState }) => (
            <Input
              type='password'
              id='password'
              placeholder='Enter your password'
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='repeatPassword'
          render={({ field, fieldState }) => (
            <Input
              type='password'
              id='repeatPassword'
              placeholder='Enter password one more time'
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='firstName'
          render={({ field, fieldState }) => (
            <Input
              type='text'
              id='firstName'
              placeholder='Enter your first name'
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='lastName'
          render={({ field, fieldState }) => (
            <Input
              type='text'
              id='lastName'
              placeholder='Enter your last name'
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='dateOfBirth'
          render={({ field, fieldState }) => (
            <Input
              type='date'
              id='dateOfBirth'
              placeholder='Enter your date of birth'
              value={field.value instanceof Date ? field.value.toISOString().substr(0, 10) : field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='country'
          render={({ field, fieldState }) => (
            <>
              <select {...field}>
                {Object.entries(ECountrieOptions).map(([key, value]) => (
                  <option
                    key={key}
                    value={value}
                  >
                    {value}
                  </option>
                ))}
              </select>

              {fieldState.error && <p>{fieldState.error.message}</p>}
            </>
          )}
        />

        <Controller
          control={control}
          name='street'
          render={({ field, fieldState }) => (
            <Input
              type='text'
              id='street'
              placeholder='Enter your street'
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='city'
          render={({ field, fieldState }) => (
            <Input
              type='text'
              id='city'
              placeholder='Enter your city'
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='postalCode'
          render={({ field, fieldState }) => (
            <Input
              type='text'
              id='postalCode'
              placeholder='Enter your postalCode'
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};
