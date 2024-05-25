import { type ProductProjection } from '@commercetools/platform-sdk';
import { Link as RouterLink } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const ProductItem: React.FC<{ product: ProductProjection }> = ({ product }) => {
  const language = 'en-US';
  const imageOrPriceNumber = 0;
  return (
    <>
      <RouterLink
        to={`${product.id}`}
        className='product-card'
      >
        <img
          className='product-card__image'
          src={
            product.masterVariant.images?.length
              ? `${product.masterVariant.images[imageOrPriceNumber].url}`
              : 'https://media.istockphoto.com/id/1216251206/vector/no-image-available-icon.jpg?s=612x612&w=0&k=20&c=6C0wzKp_NZgexxoECc8HD4jRpXATfcu__peSYecAwt0='
          }
          alt={product.name[language]}
        />
        <h2 className='product-card__title'>{product.name[language]}</h2>
        <p className='product-card__description'>{product.description && product.description[language]}</p>
        <div className='product-card__info'>
          <span className='product-card__price'>
            ${product.masterVariant.prices && product.masterVariant.prices[imageOrPriceNumber].value.centAmount}
          </span>
          <div>
            <FavoriteBorderIcon />
            <ShoppingCartOutlinedIcon />
          </div>
        </div>
      </RouterLink>
    </>
  );
};

export default ProductItem;
