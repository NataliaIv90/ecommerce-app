import React from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { MainWrapper } from '../mainWrapper/MainWrapper';

export const Main: React.FC = () => {
  const customer = useAppSelector((state) => state.customers.customer);
  return (
    <MainWrapper>
      <>
        <p>Main</p>
        <h3>Hello {customer.firstName} !</h3>
      </>
    </MainWrapper>
  );
};
