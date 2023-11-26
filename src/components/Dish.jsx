import React, { useContext, useEffect, useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faLeaf,
  faDrumstickBite,
} from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../utils/Context";

const Dish = ({ itemId, name, price, isVeg }) => {
  const { state, dispatch } = useContext(AppContext);

  const handleIncreament = () => {
    const itemInCart = state.cartItems.cartItemsData[`${itemId}`];

    if (itemInCart) {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { quantityInCart: itemInCart.quantity + 1, id: itemId },
      });
    } else {
      dispatch({
        type: "ADD_DISH_TO_CART",
        payload: {
          itemId,
          name,
          price,
          isVeg,
          quantity: 1,
        },
      });
    }
  };

  const handleDecreament = () => {
    const itemInCart = state.cartItems.cartItemsData[`${itemId}`];
    if (itemInCart) {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { quantityInCart: itemInCart.quantity - 1, id: itemId },
      });
    }
  };

  const dishQuanity = useMemo(() => {
    const dishIncart = state.cartItems.cartItemsData[`${itemId}`];
    return dishIncart !== undefined && dishIncart.quantity !== null
      ? dishIncart.quantity
      : 0;
  }, [state.cartItems]);

  return (
    <li className=" text-xs sm:text-sm md:text-base w-full min-w-fit flex h-25 flex-col md:flex-row items-center justify-between p-3 bg-white shadow rounded-lg mb-4">
      <div className="w-full flex flex-row justify-between items-center gap-2 mb-4 md:mb-0">
        <div className="w-50">
          <p className="text-md mb-1">{name}</p>
          <p className="text-sm  text-gray-500">
            <FontAwesomeIcon
              icon={isVeg ? faLeaf : faDrumstickBite}
              className={`${
                isVeg ? "text-green-600" : "text-red-600"
              }    mr-1 `}
            />
            {isVeg ? "Veg" : "Non-Veg"}
          </p>
          <p className="text-md md:text-lg  mt-5 ">{price}</p>
        </div>

        <div className="text-xs lg:text-sm flex justify-between items-center w-20 md:w-36 md:px-2  border rounded-md h-10">
          <button className=" mx-1 sm:mx-2" onClick={() => handleDecreament()}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span className="   ">{dishQuanity === 0 ? "Add" : dishQuanity}</span>
          <button onClick={() => handleIncreament()} className="mx-2">
            <FontAwesomeIcon className="" icon={faPlus} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default Dish;
