import React from 'react';
import { MainWrapper } from '../mainWrapper/MainWrapper';
import { RegistrationForm } from './registrationForm/registrationForm';
import './Registration.css';

export const Registration = (): JSX.Element => (
  <MainWrapper>
    <>
      <h1 className='registration-title'>Creating your personal account</h1>
      <RegistrationForm />
    </>
  </MainWrapper>
);
