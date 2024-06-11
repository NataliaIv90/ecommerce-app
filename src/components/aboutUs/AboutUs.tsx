import React from 'react';
import './AboutUs.css';
import { ReactComponent as RssLogo } from '../../assets/icons/logo.svg';
import { Link } from 'react-router-dom';

export const AboutUs = (): JSX.Element => {
  return (
    <div>
      <Link
        to='https://rs.school/'
        target='_blank'
      >
        <RssLogo />
      </Link>
    </div>
  );
};
