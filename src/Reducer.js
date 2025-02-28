// Initial state of the data layer
export const initialState = {
  basket: [], // Initialize the basket as an empty array
  user: null // Initialize the user as null
};

// Calculate the total price of items in the basket using the reduce method
export const getBasketTotal = (basket) => 
  // The reduce method iterates over each item in the basket array
  // The reducer function takes two parameters: 'amount' and 'item'
  // The reducer function returns the sum of the current amount and the item's price
  // The initial value of 'amount' is set to 0
  // Basically a fancy for loop
  basket?.reduce(
    (amount, item) => 
      item.price + amount, // Add the item's price to the current amount
    0 // Start with an initial value of 0
  );

// Reducer function to manage the state based on actions
const reducer = (state, action) => {
  console.log(action); // Log the action for debugging purposes
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state, // Spread the current state
        basket: [...state.basket, action.item] // Add the new item to the basket
      };

    case 'EMPTY_BASKET':
      return {
        ...state,
        basket: []
      }



    case "REMOVE_FROM_BASKET":
      // Find the index of the item to remove in the basket array
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      // Create a copy of the current basket
      let newBasket = [...state.basket];

      // If the item exists in the basket, remove it
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.id}) as it's not in basket!` // Warning message if item not found
        );
      }

      return {
        ...state, // Spread the current state
        basket: newBasket // Update the basket with the new array
      };

      case "SET_USER":
        return {
          ...state,
          user: action.user
        }

    default:
      return state; // Return the current state if action type is not matched
  }
};

export default reducer;
