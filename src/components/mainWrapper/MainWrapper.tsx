import React, { PropsWithChildren } from 'react';

export const MainWrapper = ({ children }: PropsWithChildren<object>): JSX.Element => (
  <main className='MainWrapper'>{children}</main>
);
