import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Main } from './components/main/Main';
import { Login } from './components/login/Login';
import { Registration } from './components/registration/Registration';
import { App } from './components/app/App';
import { RoutingError } from './components/routingError/RoutingError';

const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',
    children: [
      {
        element: <Main />,
        path: '/',
      },
      {
        element: <Login />,
        path: 'login',
      },
      {
        element: <Registration />,
        path: 'registration',
      },
      {
        element: <RoutingError />,
        path: '404',
      },
      {
        element: <Navigate to='404' />,
        path: '*',
      },
    ],
  },
]);

export default router;
