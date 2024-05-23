import { useParams } from 'react-router-dom';

export const ProductDetail = (): JSX.Element => {
  const { id } = useParams();

  return <h1>This is a Product Detail page, Shows information about this product: {id}</h1>;
};
