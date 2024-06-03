import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'jest-fetch-mock';
import { Header } from '../../components/header/Header';
import { API } from '../../api/API'; // Import the API class
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
// import { MemoryHistory } from 'history';

const mockStore = configureMockStore();
// let history: MemoryHistory;
// Mock localStorage.removeItem
const localStorageMock = {
  removeItem: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Header component tests', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    // Mock the API instance
    const apiInstanceMock = jest.fn() as unknown as ByProjectKeyRequestBuilder;
    store = mockStore({
      apiInstance: new API(apiInstanceMock),
      authorized: true,
      email: 'example@example.com',
      password: 'password',
      id: '1',
      customers: {
        customer: {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          version: 1,
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
          addresses: [],
          stores: [],
          authenticationMode: 'email',
          isEmailVerified: true,
        },
      },
    });

    fetchMock.enableMocks();
    fetchMock.mockResponse(JSON.stringify({}), { status: 200 });
  });

  afterEach(() => {
    fetchMock.resetMocks();
    localStorageMock.removeItem.mockClear();
  });

  it('renders correctly when customer is logged in', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Provider store={store}>
          <Routes>
            <Route
              path='/'
              element={<Header />}
            />
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    // expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('John')).toBeInTheDocument();
    expect(getByText('Log out')).toBeInTheDocument();
  });

  it('logs out when "Log out" button is clicked', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Provider store={store}>
          <Routes>
            <Route
              path='/'
              element={<Header />}
            />
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    fireEvent.click(getByText('Log out'));

    // Add assertions for logout functionality
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('tokendata');
    // Add more assertions if needed
  });

  it('renders correctly when customer is not logged in', () => {
    // Mock the API instance
    const apiInstanceMock = jest.fn() as unknown as ByProjectKeyRequestBuilder;
    store = mockStore({
      apiInstance: new API(apiInstanceMock),
      authorized: false,
      email: '',
      password: '',
      id: '',
      customers: {},
    });

    const { getByText } = render(
      <MemoryRouter>
        <Provider store={store}>
          <Routes>
            <Route
              path='/'
              element={<Header />}
            />
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    // expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
    expect(getByText('Register')).toBeInTheDocument();
  });
});
