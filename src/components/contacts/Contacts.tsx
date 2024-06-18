import React from 'react';
import './Contacts.css';
import { team } from '../aboutUs/AboutUs';

export const Contacts = (): JSX.Element => {
  return (
    <div className='contacts'>
      <p>Welcome to Garden with Flowers!</p>
      <p>
        We are a team of developers from different countries and cultures, brought together by our love for flowers.
      </p>
      <h1 className='contacts__title'>Our contacts:</h1>
      <ul className='contacts__title'>
        {team.map((el, index) => (
          <li key={index}>
            <p>
              <span className='contacts__name'>{el.name}:</span>
              <a
                href={el.github}
                target='_blank'
                rel='noreferrer'
                className='contacts__link'
              >
                Github
              </a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
