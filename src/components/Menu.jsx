import React, { useMemo } from "react";
import Dish from "../components/Dish";

const Menu = ({ menu, dishes, type }) => {
  return (
    <div className=" divide-y-8  mb-4 divide-orange">
      <h2 className=" text-xl text-brown font-bold">
        {type === "veg" ? "Veg" : "Non Veg"}
      </h2>
      <div className="divide-y divide-red-800">
        {menu.map((category) => {
          return (
            <ul key={category.concat(type)} id={category} className="my-10">
              <h3 id={category + type} className="my-5 text-lg  font-bold">
                {category}
              </h3>
              <div className="divide-y-8"></div>
              {dishes
                .filter(
                  (dish) =>
                    dish.menu === category &&
                    (type === "veg" ? dish.isVeg : !dish.isVeg)
                )
                .map((dish) => (
                  <Dish
                    key={dish.itemId}
                    itemId={dish.itemId}
                    name={dish.item}
                    price={dish.price}
                    isVeg={dish.isVeg}
                  />
                ))}
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
