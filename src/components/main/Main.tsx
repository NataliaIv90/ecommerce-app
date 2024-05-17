import React from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { MainWrapper } from '../mainWrapper/MainWrapper';
import './Main.css';
import { OutlinedButton } from '../../shared/button/outlinedButton/OutlinedButton';
// import { Link } from 'react-router-dom';
import { CarIcon, PhotoIcon, PaymentIcon, ChatIcon } from './mainCards/MainCards';

const cardsData = [
  {
    icon: <PaymentIcon />,
    text: 'Easy payment',
  },
  {
    icon: <CarIcon />,
    text: 'Delivery on time',
  },
  {
    icon: <PhotoIcon />,
    text: 'Real photo',
  },
  {
    icon: <ChatIcon />,
    text: 'Help with the selection',
  },
];

export const Main: React.FC = () => {
  // Todo: uncomment lines related to navigation after 'catalog' page available
  const customer = useAppSelector((state) => state.customers.customer);
  return (
    <MainWrapper>
      <>
        <section className='hero'>
          <div className='hero__content'>
            {customer?.firstName ? <h3>Hello {customer?.firstName} !</h3> : null}
            <p>Welcome to the</p>
            <h1 className='hero__title'>House with flowers</h1>
            <p>Decorate your life with flowers</p>
            {/* <Link to='/catalog'> */}
            <OutlinedButton
              text='Shop now'
              light={true}
            />
            {/* </Link> */}
          </div>
        </section>

        <section className='greeting'>
          <div className='greeting__content'>
            <>
              <div className='greeting__text'>
                <p>The House with flowers welcomes you!</p>
                <p>
                  We create beautiful decor, make beautiful bouquets for the holidays.Our friendly and creative team
                  will be happy to work with you!
                </p>
                <p>You can learn more about our company by clicking on the link</p>
              </div>
              <OutlinedButton text='learn more' />
            </>
          </div>
          <div className='gretting__image'></div>
        </section>

        <section className='why-us'>
          <h2>Why us?</h2>
          <div className='icons-container'>
            {cardsData.map((el) => (
              <div className='main__card'>
                <div className='main__card-icon'>{el.icon}</div>
                <p className='main__card-title'>{el.text}</p>
              </div>
            ))}
          </div>
        </section>
      </>
    </MainWrapper>
  );
};
