import { useState } from 'react';
import { MainWrapper } from '../mainWrapper/MainWrapper';
import './Profile.css';
import { ProfileForm } from './profileForm/ProfileForm';

const PROFILE_NAV_ITEMS = [
  { id: 'personal_info', displayName: 'Personal information' },
  { id: 'addresses', displayName: 'Addresses' },
  { id: 'change_password', displayName: 'Change password' },
];

export const Profile = (): JSX.Element => {
  const [selectedItem, setSelectedItem] = useState<string>(PROFILE_NAV_ITEMS[0].id);
  const handleSelect = (value: string) => {
    setSelectedItem(value);
  };

  return (
    <MainWrapper>
      <div className='profile-wrapper'>
        <div className='profile-nav'>
          <nav>
            <ul className='profile-nav__list'>
              {PROFILE_NAV_ITEMS.map((item) => {
                return (
                  <button
                    onClick={() => handleSelect(item.id)}
                    className={'profile-nav__item' + (selectedItem === item.id ? ' active' : '')}
                    key={item.id}
                  >
                    {item.displayName}
                  </button>
                );
              })}
            </ul>
          </nav>
        </div>
        <div className='profile-info'>
          <ProfileForm selectedItem={selectedItem} />
        </div>
      </div>
    </MainWrapper>
  );
};
