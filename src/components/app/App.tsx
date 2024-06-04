import React from 'react';
import './App.css';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { ERoutesPaths } from '../../routes';

export const App = (): JSX.Element => {
  const location = useLocation();
  const currentLocation = location.pathname.slice(1, location.pathname.length) as ERoutesPaths;
  const displayHeaderAndFooter = ![ERoutesPaths.Registration, ERoutesPaths.Login, ERoutesPaths.Error404].includes(
    currentLocation
  );

  return (
    <div className='App'>
      {displayHeaderAndFooter ? <Header /> : null}
      <>
        <Outlet />
      </>
      {displayHeaderAndFooter ? <Footer /> : null}
    </div>
  );
};
