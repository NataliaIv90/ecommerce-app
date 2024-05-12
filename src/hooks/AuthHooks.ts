import { useEffect, useState } from 'react';
import { getApiRoot } from '../api/lib/Client';
import { API } from '../api/API';
import { useAppDispatch } from '../hooks/reduxHooks';

export const useAuth: () => void = () => {
  const [token, setToken] = useState('');
  const [auth, setAuth] = useState(false);
  const [apiClient, setApiClient] = useState(getApiRoot('anonimous'));
  // eslint-disable-next-line
  const [apiInstance, setApiInstance] = useState(new API(apiClient));
  // eslint-disable-next-line
  const dispatch = useAppDispatch();

  const changeAuth = (flag: boolean): void => {
    setAuth(flag);
  };

  useEffect(() => {
    if (localStorage.getItem('tokendata')) {
      const tokenLS = localStorage.getItem('tokendata') as string;
      setToken(tokenLS || ('' as string));
      setApiClient(getApiRoot('token', { token: token }));
      setApiInstance(new API(apiClient));
    }
  }, [auth]);
  return [changeAuth];
};
