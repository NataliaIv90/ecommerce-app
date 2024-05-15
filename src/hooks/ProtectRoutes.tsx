import React, { ReactNode } from 'react';
import { useAuth } from './AuthHooks';

interface ProtectRoutesProps {
  children: ReactNode;
}

export const ProtectRoutes: React.FC<ProtectRoutesProps> = ({ children }) => {
  useAuth();
  return <>{children}</>;
};

export default ProtectRoutes;
