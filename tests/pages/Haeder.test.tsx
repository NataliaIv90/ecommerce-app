import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Header } from '../../src/components/header/Header';

describe('App component tests', () => {
  it('Renders correctly initial document', async () => {
    render(<Header />);
    const testText = screen.getByText('Header');
    expect(testText).toBeInTheDocument();
  });
});
