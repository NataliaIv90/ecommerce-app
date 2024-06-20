import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductCard, IProductCardProps } from '../../components/product/productCard/ProductCard';
import { Image, Price } from '@commercetools/platform-sdk';

describe('ProductCard', () => {
  const mockImages: Image[] = [
    { url: 'image1.jpg', label: 'Image 1', dimensions: { w: 100, h: 100 } },
    { url: 'image2.jpg', label: 'Image 2', dimensions: { w: 100, h: 100 } },
  ];

  const mockPrices: Price[] = [
    {
      id: 'id',
      value: {
        type: 'centPrecision',
        currencyCode: 'USD',
        centAmount: 1000,
        fractionDigits: 2,
      },
      discounted: {
        value: {
          type: 'centPrecision',
          currencyCode: 'USD',
          centAmount: 800,
          fractionDigits: 2,
        },
        discount: {
          id: 'discount-id',
          typeId: 'product-discount',
        },
      },
    },
  ];

  const defaultProps: IProductCardProps = {
    name: 'Test Product',
    description: 'Test Description',
    images: mockImages,
    prices: mockPrices,
    id: '1',
  };

  it('renders product card with name and description', () => {
    const { getByText } = render(<ProductCard {...defaultProps} />);
    expect(getByText('Test Product')).toBeInTheDocument();
    expect(getByText('Test Description')).toBeInTheDocument();
  });

  it('toggles the description', () => {
    const { getByText } = render(<ProductCard {...defaultProps} />);
    const toggleButton = getByText('Show more');
    fireEvent.click(toggleButton);
    expect(getByText('Show less')).toBeInTheDocument();
    fireEvent.click(toggleButton);
    expect(getByText('Show more')).toBeInTheDocument();
  });

  it('shows the correct price', () => {
    const { getByTestId } = render(<ProductCard {...defaultProps} />);
    expect(getByTestId('price-value')).toHaveTextContent('8.00');
  });
});
