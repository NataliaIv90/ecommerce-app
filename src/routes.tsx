/* eslint-disable no-unused-vars */
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Main } from './components/main/Main';
import { Login } from './components/login/Login';
import { Registration } from './components/registration/Registration';
import { App } from './components/app/App';
import { RoutingError404 } from './components/routingError/RoutingError404';
import ProtectRoutes from './hooks/ProtectRoutes';
import { Profile } from './components/profile/Profile';

export enum ERoutesPaths {
  Root = '/',
  Login = 'login',
  Registration = 'registration',
  Profile = 'profile',
  Error404 = '404',
}

const router = createBrowserRouter([
  {
    element: <App />,
    path: ERoutesPaths.Root,
    children: [
      {
        element: <Main />,
        path: ERoutesPaths.Root,
      },
      {
        element: <Login />,
        path: ERoutesPaths.Login,
      },
      {
        element: <Registration />,
        path: ERoutesPaths.Registration,
      },
      {
        element: <ProtectRoutes />,
        path: ERoutesPaths.Root,
        children: [
          {
            element: <Profile />,
            path: ERoutesPaths.Profile,
          },
        ],
      },
      {
        element: <RoutingError404 />,
        path: ERoutesPaths.Error404,
      },
      {
        element: <Navigate to={ERoutesPaths.Error404} />,
        path: '*',
      },
    ],
  },
]);

export default router;
