import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import '../styles/product.css'; // Import the CSS file for styling the component
import { useStateValue } from '../StateProvider'; // Import the useStateValue hook for accessing the global state

function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>🌟</p>
            ))}
        </div>
      </div>

      <img src={image} alt={title} />

      <div className="product__buttons">{/* Flex container for buttons */}
        <button className='button1'   onClick={addToBasket}>Add to Basket</button>
        <Link to={`/products/${id}`}>
          <button className='button2'>Show Details</button>
        </Link>
      </div>
    </div>
  );
}

export default Product;
