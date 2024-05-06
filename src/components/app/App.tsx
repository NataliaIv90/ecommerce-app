import React from 'react';
import './App.css';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import { Outlet } from 'react-router-dom';

export const App = (): JSX.Element => {
  return (
    <div className='App'>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
