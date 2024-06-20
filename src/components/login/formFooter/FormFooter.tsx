import React from 'react';
import { Link } from 'react-router-dom';
import { OutlinedButton } from '../../../shared/button/outlinedButton/OutlinedButton';

export const FormFooter = (): JSX.Element => (
  <div>
    <p className='loginFooter'>Don't have an account yet?</p>
    <Link to='/registration'>
      <OutlinedButton
        text='Sign up'
        wideBtn={true}
      />
    </Link>
    <Link to='/'>
      <OutlinedButton
        text='Back to Home'
        wideBtn={true}
      />
    </Link>
  </div>
);
