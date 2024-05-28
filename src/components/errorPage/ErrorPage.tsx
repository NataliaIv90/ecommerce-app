import React from 'react';
import './ErrorPage.css';
import { OutlinedButton } from '../../shared/button/outlinedButton/OutlinedButton';
import { useNavigate } from 'react-router-dom';

interface IErrorPageProps {
  message?: string;
}

export const ErrorPage = ({ message }: IErrorPageProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className='error-page'>
      <div className='error-page_contentContainer'>
        <h1 className='error-page__title'>Oops!</h1>
        {message ? <p className='error-page__subtitle'>{message}</p> : null}
        <p>Unexpected error occured</p>
        <p>Head back to our homepage and continue your floral journey with us!</p>
        <span className='error-page__btnContainer'>
          <OutlinedButton
            text='Back to Home'
            onClick={() => navigate('/')}
          />
        </span>
      </div>
    </div>
  );
};
