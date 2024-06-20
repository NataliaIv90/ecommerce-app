/* eslint-disable no-unused-vars */
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Main } from './components/main/Main';
import { Login } from './components/login/Login';
import { Registration } from './components/registration/Registration';
import { App } from './components/app/App';
import { RoutingError404 } from './components/routingError/RoutingError404';
import CatalogPage from './components/catalog/CatalogPage';
import ProtectRoutes from './hooks/ProtectRoutes';
import { Profile } from './components/profile/Profile';
import { ProductCoponent } from './components/product/Product';
import { ErrorPage } from './components/errorPage/ErrorPage';
import { AboutUs } from './components/aboutUs/AboutUs';
import { Contacts } from './components/contacts/Contacts';
import { Delivery } from './components/delivery/Delivery';
import { Cart } from './components/cart/Cart';

export enum ERoutesPaths {
  Root = '/',
  Login = 'login',
  Registration = 'registration',
  Profile = 'profile',
  Error404 = '404',
  Catalog = 'catalog',
  Product = 'product',
  Error500 = '500',
  AboutUs = 'about-us',
  Contacts = 'contacts',
  Delivery = 'delivery',
  Cart = 'cart',
}

const router = createBrowserRouter([
  {
    element: <App />,
    path: ERoutesPaths.Root,
    errorElement: <ErrorPage />,
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
        children: [
          {
            element: <Profile />,
            path: ERoutesPaths.Profile,
          },
        ],
      },
      {
        element: <CatalogPage />,
        path: ERoutesPaths.Catalog,
      },
      {
        element: <RoutingError404 />,
        path: ERoutesPaths.Error404,
      },
      {
        element: <ProductCoponent />,
        path: `${ERoutesPaths.Catalog}/:id`,
      },
      {
        element: <Cart />,
        path: ERoutesPaths.Cart,
      },
      {
        element: <AboutUs />,
        path: ERoutesPaths.AboutUs,
      },
      {
        element: <Delivery />,
        path: ERoutesPaths.Delivery,
      },
      {
        element: <Contacts />,
        path: ERoutesPaths.Contacts,
      },
      {
        element: <Navigate to={ERoutesPaths.Error404} />,
        path: '*',
      },
    ],
  },
]);

export default router;
