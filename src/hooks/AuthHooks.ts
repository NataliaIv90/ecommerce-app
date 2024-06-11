import { useEffect, useState } from 'react';
import { getApiRoot } from '../api/lib/Client';
import { API } from '../api/API';
import { useAppDispatch } from '../hooks/reduxHooks';
import { setAuthorization, setApi, SignInByToken, isLoading } from '../store/slices/customerSlice';
import { getActiveCart, createCart } from '../store/slices/cartSlice';
import { type TokenStore } from '@commercetools/sdk-client-v2';
import { ClientType } from '../types/Enums';

export const useAuth = (): [(auths: boolean) => void] => {
  // const [token, setToken] = useState('');
  const [auth, setAuth] = useState(false);
  // const [apiClient, setApiClient] = useState(getApiRoot('anonimous'));
  // const [apiInstance, setApiInstance] = useState(new API(apiClient));
  const dispatch = useAppDispatch();

  const changeAuth = (auths: boolean): void => {
    setAuth(auths);
  };

  useEffect(() => {
    if (localStorage.getItem('tokendata')) {
      dispatch(isLoading(true));
      // eslint-disable-next-line
      const tokenLS = JSON.parse(localStorage.getItem('tokendata')!) as TokenStore;
      const apiClientType = getApiRoot(ClientType.token, { token: tokenLS.refreshToken });
      const apiClient = new API(apiClientType);
      void dispatch(setApi(apiClient));
      // eslint-disable-next-line
      void dispatch(SignInByToken(tokenLS.refreshToken! || ''));
      void dispatch(setAuthorization(true));
    } else {
      dispatch(isLoading(false));
    }
    void dispatch(getActiveCart()).then((data) => {
      !data.payload && void dispatch(createCart());
    });
    // eslint-disable-next-line
  }, [auth]);
  return [changeAuth];
};

// void dispatch(getActiveCart()).then((data) => {
//   !data.payload && void dispatch(createCart());
// });

// setToken(tokenLS || ('' as string));
// setApiClient(getApiRoot('token', { token: token }));
// setApiInstance(new API(apiClient));
// void dispatch(setAuthorization(true));
// void dispatch(setApi(apiInstance));
// void dispatch(SignInByToken(tokenLS));
