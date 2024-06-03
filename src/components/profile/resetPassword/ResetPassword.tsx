import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, Resolver, useForm } from 'react-hook-form';
import Input from '../../../shared/ui/Input/Input';
import { OutlinedButton } from '../../../shared/button/outlinedButton/OutlinedButton';
import validationSchema from './validationSchema';

interface IResetPassword {
  password: string;
}

const ResetPassword = ({ handleEditToggle }: { handleEditToggle: () => void }): JSX.Element => {
  const { control, handleSubmit } = useForm<IResetPassword>({
    defaultValues: {
      password: '',
    },
    resolver: yupResolver(validationSchema) as Resolver<IResetPassword>,
    mode: 'all',
  });

  const onSubmit = (data: IResetPassword) => {
    return 5;
  };

  return (
    <form
      className='profile-form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        control={control}
        name='password'
        render={({ field, fieldState }) => (
          <Input
            type='password'
            id='password'
            placeholder='Enter new password'
            autoComplete='password'
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
