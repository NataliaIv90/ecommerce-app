import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from '../../api/API'; // Import your API class
import { ByProjectKeyRequestBuilder, Product } from '@commercetools/platform-sdk';

const baseQueryUrl = `${process.env.REACT_APP_API_HOST_URL}${process.env.REACT_APP_API_PROJECT_KEY}`;
export const baseQuery = fetchBaseQuery({
  baseUrl: baseQueryUrl,
  prepareHeaders: async (headers, { getState }) => {
    await waitForAuthToken();
    const authToken = JSON.parse(localStorage.getItem('tokendata') as string).token || ''; // Assuming the auth token key is 'authToken'
    console.log('3', authToken);
    if (authToken) {
      headers.set('Authorization', `Bearer ${authToken}`);
    }
    return headers;
  },
});

async function waitForAuthToken() {
  while (!localStorage.tokendata) {
    console.log('1', localStorage.getItem('tokendata'));
    await new Promise((resolve) => setTimeout(resolve, 200)); // Wait for 100ms before checking again
  }
  console.log('finally!', localStorage.tokendata);
}

export const api = createApi({
  reducerPath: 'productApi',
  baseQuery,
  endpoints: (builder) => ({
    fetchProductById: builder.query<Product, string>({
      query: (productId) => `/products/${productId}`,
    }),
  }),
});

export const { useFetchProductByIdQuery, useLazyFetchProductByIdQuery } = api;

export const APIInstance = new API({} as ByProjectKeyRequestBuilder); // Pass a dummy argument if API class requires ByProjectKeyRequestBuilder

export default api.reducer;
