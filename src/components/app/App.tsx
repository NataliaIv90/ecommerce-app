import React from 'react';
import './App.css';
import { Header } from '../header/Header';
import { Main } from '../main/Main';
import { Footer } from '../footer/Footer';

export const App = (): JSX.Element => {
  return (
    <div className='App'>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
