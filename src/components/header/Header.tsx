import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setApi, setAuthorization, setCustomer } from '../../store/slices/customerSlice';
import { API } from '../../api/API';
import { getApiRoot } from '../../api/lib/Client';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import './Header.css';

export const Header = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const customer = useAppSelector((state) => state.customers.customer);
  const signOut = () => {
    localStorage.removeItem('tokendata');
    dispatch(setCustomer(null));
    dispatch(setAuthorization(false));
    dispatch(setApi(new API(getApiRoot('anonimous'))));
    navigate('/');
  };
  return (
    <header className='header'>
      <nav className='header__nav'>
        <ul className='header__link-list'>
          <li className='header__link'>
            <Link to='/'>
              <span className='header__brand'>Flowers</span>
            </Link>
          </li>
          <li className='header__link'>
            <Link to='/catalog'>Catalog</Link>
          </li>
          <li className='header__link'>
            {customer ? (
              <div className='header__profile-logout'>
                <Link to='/profile'>
                  <PermIdentityOutlinedIcon />
                  <p>{customer.firstName}</p>
                </Link>
                <button
                  className='header__logout-btn'
                  onClick={signOut}
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className='header__login-register'>
                <Link to='/login'>
                  <PermIdentityOutlinedIcon />
                  Login
                </Link>
                <Link to='/registration'>
                  <PersonAddAltOutlinedIcon />
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
