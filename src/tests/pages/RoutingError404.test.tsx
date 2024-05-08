import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { RoutingError404 } from '../../components/routingError/RoutingError404';
import { createMemoryHistory, MemoryHistory } from 'history';

describe('Error 404 component tests', () => {
  let history: MemoryHistory;

  beforeEach(() => {
    history = createMemoryHistory();
    render(
      <MemoryRouter>
        <RoutingError404 />
      </MemoryRouter>
    );
  });

  it('Error 404 page renders correctly', () => {
    expect(screen.getByText("The page you're looking for can't be found.")).toBeInTheDocument();
  });

  it('Back to Home button renders correctly', () => {
    expect(screen.getByText('Back to Home')).toBeInTheDocument();
  });

  it('Back to home button works correctly', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Back to Home' }));
    expect(history.location.pathname).toBe('/');
  });
});
