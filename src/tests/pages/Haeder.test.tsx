import React from 'react';
import { render, screen, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '../../components/header/Header';

describe('Header component tests', () => {
  let headerComponent: RenderResult;

  beforeEach(() => {
    headerComponent = render(<Header />);
  });

  afterEach(() => {
    headerComponent.unmount();
  });

  it('Header renders correctly', () => {
    const headerText = screen.getByText('Header');
    expect(headerText).toBeInTheDocument();
  });
});
