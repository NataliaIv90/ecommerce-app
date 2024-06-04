import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, Resolver, useForm } from 'react-hook-form';
import Input from '../../../shared/ui/Input/Input';
import { OutlinedButton } from '../../../shared/button/outlinedButton/OutlinedButton';
import validationSchema from './validationSchema';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { ChangePassword } from '../../../store/slices/customerSlice';
import { setLoading } from '../../../store/slices/productSlice';

interface IChnagePassword {
  currentPassword: string;
  newPassword: string;
}

const ResetPassword = ({ handleEditToggle }: { handleEditToggle: () => void }): JSX.Element => {
  const dispatch = useAppDispatch();

  const { control, handleSubmit } = useForm<IChnagePassword>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
    resolver: yupResolver(validationSchema) as Resolver<IChnagePassword>,
    mode: 'all',
  });

  const onSubmit = (data: IChnagePassword) => {
    if (data.currentPassword.trim() && data.newPassword.trim()) {
      const chnagePasswordFields: IChnagePassword = {
        currentPassword: data.currentPassword.trim(),
        newPassword: data.newPassword.trim(),
      };

      setLoading(true);
      void dispatch(ChangePassword(chnagePasswordFields)).then((response) => {
        if (ChangePassword.fulfilled.match(response)) {
          const customerData = response.payload;
          if (customerData) {
            alert('Password Successfully Chnaged!');
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
      <label htmlFor='currentPassword'>Current Password: </label>
      <Controller
        control={control}
        name='currentPassword'
        render={({ field, fieldState }) => (
          <Input
            name='currentPassword'
            type='password'
            id='currentPassword'
            placeholder='Enter current password'
            autoComplete='currentPassword'
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <label htmlFor='newPassword'>New Password: </label>
      <Controller
        control={control}
        name='newPassword'
        render={({ field, fieldState }) => (
          <Input
            name='newPassword'
            type='password'
            id='newPassword'
            placeholder='Enter new password'
            autoComplete='newPassword'
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

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

export default ResetPassword;
