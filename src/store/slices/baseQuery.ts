// import { fetchBaseQuery } from '@reduxjs/toolkit/query';

// const HOST_URL = process.env.REACT_APP_API_HOST_URL;
// const PROJECT_KEY = process.env.REACT_APP_API_PROJECT_KEY;
// const BASE_URL = `${HOST_URL}${PROJECT_KEY}/`;

// const getToken = async () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const tokenData = JSON.parse(localStorage.getItem('tokendata') || '');
//       // console.log(tokenData.token);
//       resolve(tokenData.token || '');
//     }, 1000);
//   });
// };

// export const baseQuery = fetchBaseQuery({
//   baseUrl: BASE_URL,
//   prepareHeaders: async (headers) => {
//     const token = await getToken();
//     // console.log(token);
//     if (token) {
//       headers.set('authorization', `Bearer ${token}`);
//     }
//     return headers;
//   },
// });
export const styr = '';
