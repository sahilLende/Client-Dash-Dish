import { useContext, useMemo, useState, useEffect } from "react";
import CartItem from "../components/CartItem";

import { AppContext } from "../utils/Context";
import { Link, useNavigate } from "react-router-dom";
import { basket } from "../assets";
import { nanoid } from "nanoid";
import { useDocumentTitle } from "../utils";

const Cart = () => {
  const { state, totalItems, totalPrice } = useContext(AppContext);
  const navigate = useNavigate();
  const handleCheckout = (user) => {
    user === null ? navigate("/user/login") : navigate("/checkout");
  };

  const itemsInCart = state.cartItems.cartItemIds?.map((item) => {
    const currentItem = state.cartItems.cartItemsData[`${item}`];
    return (
      <CartItem
        key={currentItem.itemId}
        id={currentItem.itemId}
        name={currentItem.name}
        price={currentItem.price}
        quantity={currentItem.quantity}
      />
    );
  });

  const cart = () => {
    if (totalItems > 0) {
      return (
        <div className=" mx-2 sm:w-3/4   sm:mx-auto p-2 h-[calc(100vh_-_10.5rem)] tilt-mobile:h-[700px]  border rounded-lg shadow-xl overflow-auto flex flex-col justify-between items-center">
          <h1 className="text-center title-font text-3xl pb-3">
            Your <span className="text-brown">Order</span>
          </h1>
          <ul
            id="Dish-Summary"
            className=" min-w-full overflow-y-auto flex-1 my-2 p-2  "
          >
            {itemsInCart}
          </ul>
          <div
            id="Order-Summary"
            className=" flex flex-col justify-around rounded-md bg-slate-200 w-full h-1/5"
          >
            <span className="flex flex-row justify-around items-center ">
              <h2 className="font-bold"> Total </h2>
              <h2 className="font-bold"> {totalPrice} </h2>
            </span>
            <button
              onClick={(e) => handleCheckout(state.user)}
              className=" font-bold px-2 bg-orange rounded-md h-10  mx-2 sm:w-1/5 sm:mx-auto "
            >
              Checkout
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center space-y-3  border-1 border-red-500">
        {useDocumentTitle("Cart")}
        <img src={basket} className="md:w-1/20 w-1/5" />
        <p className="text-orange text-2xl">Your Cart is empty!</p>
        <Link to={`/order/pune`}>
          <button className="text-md bg-gradient-to-r from-orange to-purple-500 p-4 md:p-6 rounded-full text-white">
            Start shopping now!
          </button>
        </Link>
      </div>
    );
  };

  return <main className="container pt-10">{cart()}</main>;
};

export default Cart;
