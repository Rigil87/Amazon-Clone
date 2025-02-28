import React from 'react';
import "../styles/subtotal.css";
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from "../StateProvider";
import { getBasketTotal } from "../Reducer";
import { useNavigate } from "react-router-dom";

function Subtotal() {
  const navigate = useNavigate();
  const [{ basket }] = useStateValue(); // Access the basket state using the useStateValue hook

  return (
    <div className='subtotal'>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* calling in use state to dynamically adjust subtotal count */}
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className='subtotal__gift'>
              <input type='checkbox' /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2} // How many places to set the decimal
        value={getBasketTotal(basket)} // Value to be placed into basket
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'} // Prefix for money, need to change symbol for additional currencies
      />

      <button onClick={e => navigate('/payment')}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
