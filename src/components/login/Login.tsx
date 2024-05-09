import React from 'react';
import { MainWrapper } from '../mainWrapper/MainWrapper';
import { LoginForm } from './loginForm/LoginForm';
import { Link } from 'react-router-dom';
import { OutlinedButton } from '../../shared/button/outlinedButton/OutlinedButton';

export const Login = (): JSX.Element => (
  <MainWrapper>
    <LoginForm />
    <div>
      <p className='loginFooter'>Don't have an account yet?</p>
      <Link to='/registration'>
        <OutlinedButton
          text='Sign up'
          wideBtn={true}
        />
      </Link>
    </div>
  </MainWrapper>
);
