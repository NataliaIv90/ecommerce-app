import React from 'react';
import { useAppSelector } from './reduxHooks';
import { Navigate, Outlet } from 'react-router-dom';
import { ERoutesPaths } from '../routes';

export const ProtectRoutes: React.FC = () => {
  const isAuth = useAppSelector((state) => state.customers.authorized);

  return isAuth ? <Outlet /> : <Navigate to={`/${ERoutesPaths.Login}`} />;
};

export default ProtectRoutes;
