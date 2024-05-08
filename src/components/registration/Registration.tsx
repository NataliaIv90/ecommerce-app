import React from 'react';
import { MainWrapper } from '../mainWrapper/MainWrapper';
import { RegistrationForm } from './registrationForm/registrationForm';

export const Registration = (): JSX.Element => (
  <MainWrapper>
    <>
      <h1>Creating your personal account</h1>
      <RegistrationForm />
    </>
  </MainWrapper>
);
