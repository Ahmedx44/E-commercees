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
  totalAmount: 0,
};

const cartReducer = (state = initialState, action) => {
  let updatedItems;
  let newTotalAmount;

  switch (action.type) {
    case "ADD_TO_CART":
      const existingProductIndex = state.items.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingProductIndex !== -1) {
        // Product already exists in the cart, increase its quantity
        updatedItems = [...state.items];
        updatedItems[existingProductIndex].quantity++;
      } else {
        // Product does not exist in the cart, add it with quantity 1
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      // Calculate the new total amount
      newTotalAmount = updatedItems.reduce((total, item) => {
        return total + item.quantity * item.price;
      }, 0);

      return {
        ...state,
        items: updatedItems,
        totalAmount: newTotalAmount,
      };

    case "REMOVE_FROM_CART":
      const indexToRemove = state.items.findIndex(
        (item) => item.id === action.payload
      );
      if (indexToRemove !== -1) {
        updatedItems = [...state.items];
        updatedItems.splice(indexToRemove, 1); // Remove one item at indexToRemove
      }

      // Calculate the new total amount
      newTotalAmount = updatedItems.reduce((total, item) => {
        return total + item.quantity * item.price;
      }, 0);

      return {
        ...state,
        items: updatedItems,
        totalAmount: newTotalAmount,
      };

    case "INCREASE_QUANTITY":
      const productIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );

      if (productIndex !== -1) {
        updatedItems = [...state.items];
        updatedItems[productIndex].quantity++; // Increase quantity of the specific product
      }

      // Calculate the new total amount
      newTotalAmount = updatedItems.reduce((total, item) => {
        return total + item.quantity * item.price;
      }, 0);

      return {
        ...state,
        items: updatedItems,
        totalAmount: newTotalAmount,
      };

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
