import { type Category, type ProductProjection } from '@commercetools/platform-sdk';
// import { SortOptions } from '@/types/Enums';

export enum SortOptions {
  price = 'price',
  name = 'name.en',
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
  manufacturer?: string[];
  gender?: string[];
  catId?: string;
};

export type filterActiveFormat = {
  price: {
    value: string;
    action: () => void;
  };
  gender: {
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
  brand: {
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
  gender: string[];
  manufacturer: string[];
  maxPrice: number;
  isLoading: boolean;
  sort: {
    direction: 'asc' | 'desc';
    prop: SortOptions;
  };
  search: string;
  total: number;
  limit: number;
  currentPage: number;
  count: number;
  digits: number;
  productsForSlider: ProductProjection[];
};
