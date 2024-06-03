import { type Category, type ProductProjection } from '@commercetools/platform-sdk';
// import { SortOptions } from '@/types/Enums';

export enum SortOptions {
  price = 'price',
  color = 'variants.attributes.color.en',
  size = 'variants.attributes.size.en',
}

export interface CategoryInternal extends Category {
  children?: CategoryInternal[];
}

export type FilterProducts = {
  price: {
    operand: string;
    upper: number;
    lower: number;
  };
  colors?: string[];
  size?: string[];
  catId?: string;
};

export type filterActiveFormat = {
  price: {
    value: string;
    action: () => void;
  };
  color: {
    value: string;
    action: () => void;
  };
  size: {
    value: string;
    action: () => void;
  };
};

export type InitialState = {
  categories: CategoryInternal[];
  categoriesNotTransfromed: Category[];
  products: ProductProjection[];
  product: ProductProjection;
  filters: FilterProducts;
  colors: string[];
  size: string[];
  maxPrice: number;
  isLoading: boolean;
  sort: {
    direction: 'asc' | 'desc';
    prop: SortOptions;
  };
  search: string;
  digits: number;
  productsForSlider: ProductProjection[];
};
