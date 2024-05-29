import { useState } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { MainWrapper } from '../mainWrapper/MainWrapper';
import './Profile.css';

const profileNavItems = [
  {
    id: 'personal_info',
    displayName: 'Personal information',
  },
  {
    id: 'addresses',
    displayName: 'Addresses',
  },
];

export const Profile = (): JSX.Element => {
  const [selectedInfo, setSelectedInfo] = useState('personal_info');
  const customer = useAppSelector((state) => state.customers.customer);
  console.log(customer);
  const handleselect = (selectedContent: string) => {
    setSelectedInfo(selectedContent);
  };

  return (
    <MainWrapper>
      <div className='profile-container'>
        <div className='profile-nav'>
          <menu className='profile-nav__list'>
            {profileNavItems.map((navItem) => {
              return (
                <button
                  onClick={() => handleselect(navItem.id)}
                  key={navItem.id}
                  className={'profile-nav__item' + (selectedInfo === navItem.id ? ' active' : '')}
                >
                  {navItem.displayName}
                </button>
              );
            })}
          </menu>
        </div>
        <div className='profile-details'>
          <form>
            <label htmlFor='fname'>First name</label>
            <input
              className='profile-info-field'
              value={customer?.firstName}
              type='text'
              id='fname'
              name='fname'
            />
            <br />
            <label htmlFor='lname'>Last name</label>
            <input
              className='profile-info-field'
              value={customer?.lastName}
              type='text'
              id='lname'
              name='lname'
            />
            <br />
            <label htmlFor='dbirth'>Date of birth</label>
            <input
              className='profile-info-field'
              value={customer?.dateOfBirth}
              type='text'
              id='dbirth'
              name='dbirth'
            />
            <br />
          </form>
          {customer?.addresses.map((address) => {
            return (
              <>
                <label htmlFor='country'>Country</label>
                <input
                  className='profile-info-field'
                  value={address.country}
                  type='text'
                  id='country'
                  name='country'
                />
                <br />
                <label htmlFor='city'>City</label>
                <input
                  className='profile-info-field'
                  value={address.city}
                  type='text'
                  id='city'
                  name='city'
                />
                <br /> <label htmlFor='street'>Street</label>
                <input
                  className='profile-info-field'
                  value={address.streetName}
                  type='text'
                  id='street'
                  name='street'
                />
                <br />
                <br /> <label htmlFor='pcode'>Postal code</label>
                <input
                  className='profile-info-field'
                  value={address.postalCode}
                  type='text'
                  id='pcode'
                  name='pcode'
                />
              </>
            );
          })}
        </div>
      </div>
    </MainWrapper>
  );
};
