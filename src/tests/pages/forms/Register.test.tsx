import React from 'react';
import { render } from '@testing-library/react';
import { RegistrationForm } from '../../../components/registration/registrationForm/registrationForm';

describe('RegistrationForm', () => {
  it('renders without crashing', () => {
    render(<RegistrationForm />);
  });

  // it('submits the form with valid inputs', async () => {
  //   render(<RegistrationForm />);
  //   await act(async () => {
  //     const { getByText } = render(<RegistrationForm />);

  //     fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@example.com' } });
  //     fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'Password123!' } });
  //     fireEvent.change(screen.getByPlaceholderText('Enter password one more time'), {
  //       target: { value: 'Password123!' },
  //     });
  //     fireEvent.change(screen.getByPlaceholderText('Enter your first name'), { target: { value: 'John' } });
  //     fireEvent.change(screen.getByPlaceholderText('Enter your last name'), { target: { value: 'Doe' } });
  //     // fireEvent.change(screen.getByRole('spinbutton', { name: /Enter your date of birth/i }), {
  //     //   target: { value: '2000-01-01' },
  //     // });
  //     fireEvent.change(screen.getByPlaceholderText('Enter your street'), { target: { value: '123 Main St' } });
  //     fireEvent.change(screen.getByPlaceholderText('Enter your city'), { target: { value: 'Example City' } });
  //     fireEvent.change(screen.getByPlaceholderText('Enter your postal code'), { target: { value: '12345' } });
  //     // fireEvent.change(screen.getByPlaceholderText('Enter your country'), { target: { value: 'ge' } });

  //     fireEvent.submit(getByText('Submit'));
  //   });

  //   await waitFor(() => {
  //     expect(console.log).toHaveBeenCalledWith({
  //       email: 'test@example.com',
  //       password: 'Password123!',
  //       repeatPassword: 'Password123!',
  //       firstName: 'John',
  //       lastName: 'Doe',
  //       dateOfBirth: new Date('1900-01-01'),
  //       street: '123 Main St',
  //       city: 'Example City',
  //       postalCode: '12345',
  //       country: 'ge',
  //     });
  //   });
  // });
});
