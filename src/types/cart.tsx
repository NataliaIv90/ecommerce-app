export interface IPriceValue {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

export interface IDiscount {
  typeId: string;
  id: string;
}

export interface IDiscounted {
  value: IPriceValue;
  discount: IDiscount;
}

export interface IPrice {
  id: string;
  value: IPriceValue;
  key: string;
  discounted: IDiscounted;
}

export interface IImageDimensions {
  w: number;
  h: number;
}

export interface IImage {
  url: string;
  label: string;
  dimensions: IImageDimensions;
}

export interface IAttribute {
  name: string;
  value: string | string[];
}

export interface IVariant {
  id: number;
  sku: string;
  key: string;
  prices: IPrice[];
  images: IImage[];
  attributes: IAttribute[];
  //eslint-disable-next-line
  assets: any[];
}

export interface IProductType {
  typeId: string;
  id: string;
  version: number;
}

export interface IState {
  typeId: string;
  id: string;
}

export interface IStateQuantity {
  quantity: number;
  state: IState;
}

export interface ICartItemData {
  id: string;
  productId: string;
  productKey: string;
  name: {
    'en-US': string;
  };
  productType: IProductType;
  productSlug: {
    'en-US': string;
  };
  variant: IVariant;
  price: IPrice;
  quantity: number;
  //eslint-disable-next-line
  discountedPricePerQuantity: any[];
  //eslint-disable-next-line
  perMethodTaxRate: any[];
  addedAt: string;
  lastModifiedAt: string;
  state: IStateQuantity[];
  priceMode: string;
  lineItemMode: string;
  totalPrice: IPriceValue;
  //eslint-disable-next-line
  taxedPricePortions: any[];
}

export interface ILastModifiedBy {
  clientId: string;
  isPlatformClient: boolean;
  anonymousId: string;
}

export interface ICreatedBy {
  clientId: string;
  isPlatformClient: boolean;
  anonymousId: string;
}

export interface ICart {
  type: string;
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: ILastModifiedBy;
  createdBy: ICreatedBy;
  anonymousId: string;
  lineItems: ICartItemData[];
  cartState: string;
  totalPrice: IPriceValue;
  shippingMode: string;
  //eslint-disable-next-line
  shipping: any[];
  //eslint-disable-next-line
  customLineItems: any[];
  //eslint-disable-next-line
  discountCodes: any[];
  //eslint-disable-next-line
  directDiscounts: any[];
  inventoryMode: string;
  taxMode: string;
  taxRoundingMode: string;
  taxCalculationMode: string;
  deleteDaysAfterLastModification: number;
  //eslint-disable-next-line
  refusedGifts: any[];
  origin: string;
  //eslint-disable-next-line
  itemShippingAddresses: any[];
  totalLineItemQuantity: number;
}
