import {
  createContext,
  useReducer,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";
import {
  addDishToCart,
  handleQuantiyUpdate,
  removeDishFromCart,
} from "./helper";
import { json } from "react-router-dom";

export const AppContext = createContext();
export const url = import.meta.env.VITE_API_URL;

const createInitialState = () => ({
  user: null,
  cartItems: {
    cartItemIds: [],
    cartItemsData: {},
  },
});

const getInitialState = () => {
  const userData = localStorage.getItem("currentUser");
  const userCart = localStorage.getItem("userCart");
  if (userData === null && userCart === null) {
    return createInitialState();
  }

  //casees cart exists but user doesnt
  //user exists but cart doesnt
  try {
    const user = (userData && JSON.parse(userData)) || null;
    const cartItems = (userCart && JSON.parse(userCart)) || {
      cartItemIds: [],
      cartItemsData: {},
    };

    return {
      user,
      cartItems,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Something went wrong: ${error.message}`);
    }

    console.error("Something went wrong during initial state parsing");
    return createInitialState();
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const user = action.payload;
      // Save the session and user data to localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));
      return {
        ...state,
        user,
      };
    case "LOGOUT":
      // Remove the user data from localStorage
      localStorage.removeItem("userCart");
      localStorage.removeItem("currentUser");
      // Reset the state to the initial state
      return createInitialState();

    case "SET_ITEM":
      const { quantity, itemId } = action.payload;

      const updatedCart = state.cartItems.map((item) => {
        return item.itemId === itemId ? { ...item, quantity: quantity } : item;
      });

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return {
        ...state,
        cartItems: updatedCart,
      };

    case "ADD_DISH_TO_CART":
      const newItem = action.payload;
      const updateByAdd = addDishToCart(state, newItem);
      return {
        ...state,
        cartItems: updateByAdd,
      };

    case "UPDATE_QUANTITY":
      const { quantityInCart, id } = action.payload;
      const updateByQuantity = handleQuantiyUpdate(state, id, quantityInCart);
      return {
        ...state,
        cartItems: updateByQuantity,
      };

    case "REMOVE_DISH_FROM_CART":
      const itemToRemoveId = action.payload; // remove from array && remove from object
      const updateByRemove = removeDishFromCart(state, itemToRemoveId);
      return {
        ...state,
        cartItems: updateByRemove,
      };

    case "CHECKOUT":
      localStorage.removeItem("userCart");
      return {
        ...state,
        cartItems: {
          cartItemIds: [],
          cartItemsData: {},
        },
      };
    default:
      return state;
  }
};

export function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  const totalItems = useMemo(
    () =>
      state.cartItems.cartItemIds?.reduce(
        (acc, item) => acc + state.cartItems.cartItemsData[`${item}`].quantity,
        0
      ),
    [state.cartItems]
  );

  const totalPrice = useMemo(() => {
    return state.cartItems.cartItemIds?.reduce((acc, item) => {
      const currentItem = state.cartItems.cartItemsData[`${item}`];
      return acc + currentItem.quantity * currentItem.price;
    }, 0);
  }, [state.cartItems]);

  useEffect(() => {
    if (state.cartItems.cartItemIds.length === 0) {
      localStorage.removeItem("userCart");
    }
    if (state.cartItems.cartItemIds.length > 0) {
      console.log("rand");
      localStorage.setItem("userCart", JSON.stringify(state.cartItems));
    }
  }, [state.cartItems]);

  return (
    <AppContext.Provider value={{ state, dispatch, totalItems, totalPrice }}>
      {children}
    </AppContext.Provider>
  );
}
