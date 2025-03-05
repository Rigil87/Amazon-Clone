// Import the necessary React library and hooks
import React, { createContext, useContext, useReducer } from "react";

// Prepare the dataLayer by creating a context
export const StateContext = createContext();

// Wrap our app and provide the Data layer
export const StateProvider = ({ reducer, initialState, children }) => (
  // Initialize the StateContext with the useReducer hook
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children} {/* Render the children components wrapped with the data layer */}
  </StateContext.Provider>
);

// Pull information from the data layer using the useContext hook
export const useStateValue = () => useContext(StateContext);
