import React from 'react';
import { Link } from 'react-router-dom';
import { OutlinedButton } from '../../../shared/button/outlinedButton/OutlinedButton';

export const FormFooter = (): JSX.Element => (
  <div>
    <p className='registrationFooter'>Already have an account?</p>
    <Link to='/login'>
      <OutlinedButton
        text='Login'
        wideBtn={true}
      />
    </Link>
  </div>
);
