import { screen, render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Main } from '../../components/main/Main';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

// Configure mock store
const mockStore = configureMockStore();
const store = mockStore({
  customers: { customer: { firstName: 'John' } }, // Mock your initial state
});

const emptyStore = mockStore({
  customers: {},
});

describe('Main component tests: customer === "John"', () => {
  afterEach(cleanup);

  beforeEach(() => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </MemoryRouter>
    );
  });

  it('Hero renders correctly', () => {
    expect(screen.getByText('Welcome to the')).toBeInTheDocument();
    expect(screen.getByText('House with flowers')).toBeInTheDocument();
  });

  it('Customer name renders correctly', () => {
    expect(screen.getByText(/Hello,\s*John\s*!/i)).toBeInTheDocument();
  });

  it('Hero button renders correctly', () => {
    expect(screen.getByText('Shop now')).toBeInTheDocument();
  });

  // Uncomment and adjust this once routing is properly configured in Main component
  // it('Hero button works correctly', () => {
  //   fireEvent.click(screen.getByRole('button', { name: 'Shop now' }));
  //   expect(history.location.pathname).toBe('/catalog');
  // });

  it('About us section renders correctly', () => {
    expect(screen.getByText('You can learn more about our company by clicking on the link')).toBeInTheDocument();
  });

  it('About us button renders correctly', () => {
    expect(screen.getByText('learn more')).toBeInTheDocument();
  });

  // Uncomment and adjust this once routing is properly configured in Main component
  // it('About us button works correctly', () => {
  //   fireEvent.click(screen.getByRole('button', { name: 'Learn more' }));
  //   expect(history.location.pathname).toBe('/about-us');
  // });

  it('Why us section renders correctly', () => {
    expect(screen.getByText('Why us?')).toBeInTheDocument();
  });
});

describe('Main component tests: !customer', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Provider store={emptyStore}>
          <Main />
        </Provider>
      </MemoryRouter>
    );
  });

  it('Hero renders correctly', () => {
    expect(screen.queryByText('Hello')).not.toBeInTheDocument();
  });
});
