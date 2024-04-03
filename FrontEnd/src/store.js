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

export const increaseQuantity = (product) => ({
  type: "INCREASE_QUANTITY",
  payload: product,
});

export const decreaseQuantity = (product) => ({
  type: "DECREASE_QUANTITY",
  payload: product,
});

export const clearCart = () => ({
  type: "CLEAR_CART",
});

// Reducer
const initialState = {
  items: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  totalAmount: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingProductIndex = state.items.findIndex(
        (item) => item._id === action.payload._id
      );

      let updatedItemsAdd;

      if (existingProductIndex !== -1) {
        updatedItemsAdd = state.items.map(item =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItemsAdd = [...state.items, { ...action.payload, quantity: 1 }];
      }

      const newTotalAmountAdd = updatedItemsAdd.reduce((total, item) => {
        return total + item.quantity * item.price;
      }, 0);

      return {
        ...state,
        items: updatedItemsAdd,
        totalAmount: newTotalAmountAdd,
      };

      case "REMOVE_FROM_CART":
        const updatedItemsRemove = state.items.filter((item) => item._id !== action.payload);
      
        const newTotalAmountRemove = updatedItemsRemove.reduce((total, item) => {
          return total + item.quantity * item.price;
        }, 0);
      
        return {
          ...state,
          items: updatedItemsRemove,
          totalAmount: newTotalAmountRemove,
        };

    case "INCREASE_QUANTITY":
      const updatedItemsIncrease = state.items.map((item) =>
        item._id === action.payload._id ? { ...item, quantity: item.quantity + 1 } : item
      );

      const newTotalAmountIncrease = updatedItemsIncrease.reduce((total, item) => {
        return total + item.quantity * item.price;
      }, 0);

      return {
        ...state,
        items: updatedItemsIncrease,
        totalAmount: newTotalAmountIncrease,
      };

      case "DECREASE_QUANTITY":
        const updatedItemsDecrease = state.items.map((item) => {
          if (item._id === action.payload._id) {
            // Ensure quantity doesn't go below 1
            const newQuantity = item.quantity > 1 ? item.quantity - 1 : 1;
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
      
        const newTotalAmountDecrease = updatedItemsDecrease.reduce((total, item) => {
          return total + item.quantity * item.price;
        }, 0);
      
        return {
          ...state,
          items: updatedItemsDecrease,
          totalAmount: newTotalAmountDecrease,
        };

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
        totalAmount: 0,
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
