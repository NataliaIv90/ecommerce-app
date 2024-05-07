import { createBrowserRouter } from 'react-router-dom';
import { Main } from './components/main/Main';
import { Login } from './components/login/Login';
import { Registration } from './components/registration/Registration';
import { App } from './components/app/App';

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
    ],
  },
]);

export default router;
