import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, Resolver, useForm } from 'react-hook-form';
import Input from '../../../shared/ui/Input/Input';
import { Customer } from '@commercetools/platform-sdk';
import personalDetailsValidationSchema from './validatePersonalDetails';
import { OutlinedButton } from '../../../shared/button/outlinedButton/OutlinedButton';
import { setLoading } from '../../../store/slices/productSlice';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { UpdateCustomer } from '../../../store/slices/customerSlice';

interface IEditPersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
}

const PersoanlDetails = ({
  customer,
  handleEditToggle,
}: {
  customer: Customer;
  handleEditToggle: () => void;
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm<IEditPersonalDetails>({
    defaultValues: {
      firstName: customer?.firstName,
      lastName: customer?.lastName,
      email: customer?.email,
      dateOfBirth: new Date(customer?.dateOfBirth || '1900-01-01'),
    },
    resolver: yupResolver(personalDetailsValidationSchema) as Resolver<IEditPersonalDetails>,
    mode: 'all',
  });

  const onSubmit = (data: IEditPersonalDetails) => {
    // Format date of birth
    const year = data.dateOfBirth.getFullYear();
    const month = String(data.dateOfBirth.getMonth() + 1).padStart(2, '0');
    const day = String(data.dateOfBirth.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    if (
      data.email.trim() !== customer?.email ||
      data.firstName.trim() !== customer?.firstName ||
      data.lastName.trim() !== customer?.lastName ||
      formattedDate !== customer?.dateOfBirth
    ) {
      const customerId = customer?.id || '';
      const updatedFields = {
        setFirstName: { firstName: data.firstName.trim() },
        setLastName: { lastName: data.lastName.trim() },
        setEmail: { email: data.email.trim() },
        setDateOfBirth: { dateOfBirth: formattedDate },
      };

      setLoading(true);
      void dispatch(UpdateCustomer({ customerId, updatedFields })).then((response) => {
        if (UpdateCustomer.fulfilled.match(response)) {
          const customerData = response.payload;
          if (customerData) {
            alert('Profile Successfully updated!');
          }
          handleEditToggle();
          setLoading(false);
        }
      });
    }
  };

  return (
    <form
      className='profile-form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <>
        <label htmlFor='firstName'>First Name: </label>
        <Controller
          control={control}
          name='firstName'
          render={({ field, fieldState }) => (
            <Input
              name='firstName'
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

        <label htmlFor='lastName'>Last Name: </label>
        <Controller
          control={control}
          name='lastName'
          render={({ field, fieldState }) => (
            <Input
              name='lastName'
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

        <label htmlFor='email'>Email: </label>
        <Controller
          control={control}
          name='email'
          render={({ field, fieldState }) => (
            <Input
              name='email'
              type='text'
              id='email'
              placeholder='Enter your email'
              autoComplete='email'
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        <label htmlFor='dateOfBirth'>Date of birth: </label>

        <Controller
          control={control}
          name='dateOfBirth'
          render={({ field, fieldState }) => (
            <Input
              name='dateOfBirth'
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
      </>

      <div className='editting-btns-container'>
        <OutlinedButton
          wideBtn={false}
          type='submit'
          text='Save'
        />
        <button
          className='outlinedButton editting-cancel'
          onClick={handleEditToggle}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PersoanlDetails;
