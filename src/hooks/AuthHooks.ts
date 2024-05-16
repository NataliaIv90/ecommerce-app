import { useEffect, useState } from 'react';
import { getApiRoot } from '../api/lib/Client';
import { API } from '../api/API';
import { useAppDispatch } from '../hooks/reduxHooks';
import { setAuthorization, setApi, SignInByToken } from '../store/slices/customerSlice';

export const useAuth = (): [(auths: boolean) => void] => {
  const [token, setToken] = useState('');
  const [auth, setAuth] = useState(false);
  const [apiClient, setApiClient] = useState(getApiRoot('anonimous'));
  const [apiInstance, setApiInstance] = useState(new API(apiClient));
  const dispatch = useAppDispatch();

  const changeAuth = (auths: boolean): void => {
    setAuth(auths);
  };

  useEffect(() => {
    if (localStorage.getItem('tokendata')) {
      const tokenLS = localStorage.getItem('tokendata') as string;
      setToken(tokenLS || ('' as string));
      setApiClient(getApiRoot('token', { token: token }));
      setApiInstance(new API(apiClient));
      void dispatch(setAuthorization(true));
      void dispatch(setApi(apiInstance));
      void dispatch(SignInByToken(tokenLS));
    }
    // eslint-disable-next-line
  }, [auth]);
  return [changeAuth];
};
