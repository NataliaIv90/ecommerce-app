import React from 'react';
import { useAuth } from './AuthHooks';
import { useAppSelector } from './reduxHooks';
import { Navigate, Outlet } from 'react-router-dom';
import { ERoutesPaths } from '../routes';

export const ProtectRoutes: React.FC = () => {
  useAuth();
  const isAuth = useAppSelector((state) => state.customers.authorized);

  return isAuth ? <Outlet /> : <Navigate to={`/${ERoutesPaths.Login}`} />;
};

export default ProtectRoutes;
