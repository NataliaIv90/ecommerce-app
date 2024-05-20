import React from 'react';
import { MainWrapper } from '../mainWrapper/MainWrapper';
import { LoginForm } from './loginForm/LoginForm';
import './Login.css';

export const Login: React.FC = () => {
  return (
    <MainWrapper>
      <h1 className='login__title'>Log in to your personal account!</h1>
      <LoginForm />
    </MainWrapper>
  );
};
