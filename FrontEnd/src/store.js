// store.js

import { createStore, combineReducers } from "redux";

// Actions
export const addToCart = (product) => ({
  type: "ADD_TO_CART",
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: "REMOVE_FROM_CART",
  payload: productId,
});

export const increaseQuantity = (productId) => ({
  type: "INCREASE_QUANTITY",
  payload: productId,
});

export const decreaseQuantity = (productId) => ({
  type: "DECREASE_QUANTITY",
  payload: productId,
});

// Reducer
const initialState = {
  items: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingProductIndex = state.items.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingProductIndex !== -1) {
        // Product already exists in the cart, increase its quantity
        const updatedItems = [...state.items];
        updatedItems[existingProductIndex].quantity++;
        return {
          ...state,
          items: updatedItems,
        };
      } else {
        // Product does not exist in the cart, add it with quantity 1
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }

    case "REMOVE_FROM_CART":
      const indexToRemove = state.items.findIndex(
        (item) => item.id === action.payload
      );
      if (indexToRemove !== -1) {
        const updatedItems = [...state.items];
        updatedItems.splice(indexToRemove, 1); // Remove one item at indexToRemove
        return {
          ...state,
          items: updatedItems,
        };
      }
      return state;

    case "INCREASE_QUANTITY":
      const productIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );

      if (productIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[productIndex].quantity++; // Increase quantity of the specific product
        return {
          ...state,
          items: updatedItems,
        };
      }

    case "DECREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };

    default:
      return state;
  }
};

// Store
const rootReducer = combineReducers({
  cart: cartReducer,
});

const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Subscribe to store updates and store them in local storage
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("cart", JSON.stringify(state.cart.items));
});

export default store;
