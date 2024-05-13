import React from 'react';
import { MainWrapper } from '../mainWrapper/MainWrapper';
import { RegistrationForm } from './registrationForm/registrationForm';
import { OutlinedButton } from '../../shared/button/outlinedButton/OutlinedButton';
import { Link } from 'react-router-dom';
import './Registration.css';

export const Registration = (): JSX.Element => (
  <MainWrapper>
    <>
      <h1 className='registration-title'>Creating your personal account</h1>
      <RegistrationForm />
      <div>
        <p className='registrationFooter'>Already have an account?</p>
        <Link to='/login'>
          <OutlinedButton
            text='Login'
            wideBtn={true}
          />
        </Link>
      </div>
    </>
  </MainWrapper>
);
