import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { ReactComponent as LoginKey } from '../../assets/icons/login-key.svg';
import { ReactComponent as RegisterPlus } from '../../assets/icons/register-plus.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setApi, setAuthorization, setCustomer } from '../../store/slices/customerSlice';
import { API } from '../../api/API';
import { getApiRoot } from '../../api/lib/Client';

export const Header = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const customer = useAppSelector((state) => state.customers.customer);
  const signOut = () => {
    localStorage.removeItem('tokendata');
    dispatch(setCustomer(null));
    dispatch(setAuthorization(false));
    dispatch(setApi(new API(getApiRoot('anonimous'))));
  };
  return (
    <header className='header'>
      <nav className='header__nav'>
        <ul className='header__link-list'>
          <li className='header__link'>
            <Link to='/'>Home</Link>
          </li>
          <li className='header__link'>
            {customer ? (
              <button
                className='header__logout-btn'
                onClick={signOut}
              >
                Log out
              </button>
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
