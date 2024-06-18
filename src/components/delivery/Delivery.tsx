import React from 'react';
import './Delivery.css';
import { scrollToTop } from '../../utils/scrollToTop';

export const Delivery = (): JSX.Element => {
  scrollToTop();

  return (
    <div className='delivery'>
      <h1 className='delivery__title'>Our Delivery Process:</h1>
      <p>
        We understand how important it is to receive your flowers in perfect condition. That's why our delivery service
        ensures your flowers are delivered fresh and on time.
      </p>
      <ul className='delivery__list number'>
        <li>
          <h3>Order Confirmation</h3>
          <p>Once you place your order, you will receive an email confirmation with all the details.</p>
        </li>
        <li>
          <h3>Careful Packaging</h3>
          <p>
            Each flower arrangement is carefully packaged to ensure it arrives in perfect condition. We use special
            water tubes and floral foam to keep your flowers hydrated and fresh.
          </p>
        </li>
        <li>
          <h3>Temperature-Controlled Vehicles</h3>
          <p>
            Our delivery vehicles are equipped with temperature control to maintain the optimal environment for your
            flowers.
          </p>
        </li>
        <li>
          <h3> Efficient Routing</h3>
          <p>
            We use advanced routing software to plan the most efficient delivery routes, ensuring your flowers arrive as
            quickly as possible.
          </p>
        </li>
        <li>
          <h3>Delivery Notification</h3>
          <p>
            You will receive a notification when your flowers are out for delivery and another once they have been
            successfully delivered.
          </p>
        </li>
      </ul>
      <h2>Delivery Options:</h2>
      <ul className='delivery__list'>
        <li>
          <h3>Same-Day Delivery:</h3>
          <p>Order by 2 PM for delivery by the end of the day.</p>
        </li>
        <li>
          <h3> Next-Day Delivery:</h3>
          <p>Available for orders placed after 2 PM.</p>
        </li>
        <li>
          <h3> Scheduled Delivery:</h3>
          <p>Choose a specific date and time for delivery.</p>
        </li>
      </ul>
      <p>Have questions about your delivery? Contact our customer service team.</p>
    </div>
  );
};
