import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { ReactComponent as LoginKey } from '../../assets/icons/login-key.svg';
import { ReactComponent as RegisterPlus } from '../../assets/icons/register-plus.svg';

export const Header = (): JSX.Element => {
  const currentUser = null;
  return (
    <header className='header'>
      <nav className='header__nav'>
        <ul className='header__link-list'>
          <li className='header__link'>
            <Link to='/'>Main</Link>
          </li>
          <li className='header__link'>
            {currentUser ? (
              <span>Log out</span>
            ) : (
              <div className='header__login-register'>
                <Link to='/login'>
                  <LoginKey className='header__icon' />
                  Login
                </Link>
                <Link to='/registration'>
                  <RegisterPlus className='header__icon' />
                  Register
                </Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
