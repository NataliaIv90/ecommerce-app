import React from 'react';
import './Footer.css';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import { Link } from 'react-router-dom';

const footerNavRoutes = [
  { name: 'About us', path: 'about-us' },
  { name: 'Catalog', path: 'catalog' },
  { name: 'Delivery', path: 'delivery' },
  { name: 'Contacts', path: 'contacts' },
];

export const Footer = (): JSX.Element => {
  return (
    <footer className='footer'>
      <ul className='footer__nav'>
        {footerNavRoutes.map((route) => {
          return (
            <li
              key={route.path}
              className='footer__nav-item'
            >
              <Link to={route.path}>{route.name}</Link>
            </li>
          );
        })}
      </ul>
      <p className='footer__copyright'>&copy; All rights reserved</p>
      <ul className='footer__addresses'>
        <li className='footer__location'>
          <FmdGoodOutlinedIcon />
          Amsterdam
        </li>
        <li className='footer__phone-number'>
          <PhoneOutlinedIcon />
          <a href='72457448897'>+7 (245) 744-88-97</a>
        </li>
        <li className='footer__socials'>
          <a
            className='footer__socials__instagram'
            target='_blank'
            href='https://www.instagram.com/'
          >
            <InstagramIcon />{' '}
          </a>
          <a
            className='footer__socials__facebook'
            target='_blank'
            href='https://www.facebook.com/'
          >
            <FacebookOutlinedIcon />
          </a>
        </li>
      </ul>
    </footer>
  );
};
