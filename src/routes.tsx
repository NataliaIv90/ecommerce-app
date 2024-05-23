/* eslint-disable no-unused-vars */
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Main } from './components/main/Main';
import { Login } from './components/login/Login';
import { Registration } from './components/registration/Registration';
import { ProductList } from './components/productList/ProductList';
import { ProductDetail } from './components/productDetail/ProductDetail';
import { App } from './components/app/App';
import { RoutingError404 } from './components/routingError/RoutingError404';

export enum ERoutesPaths {
  Login = 'login',
  Registration = 'registration',
  Products = 'products',
  Error404 = '404',
}

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
        path: ERoutesPaths.Login,
      },
      {
        element: <Registration />,
        path: ERoutesPaths.Registration,
      },
      {
        element: <ProductList />,
        path: ERoutesPaths.Products,
      },
      {
        element: <ProductDetail />,
        path: `${ERoutesPaths.Products}/:id`,
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
