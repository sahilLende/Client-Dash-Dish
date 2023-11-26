import React from "react";
import * as assets from "../assets";
import { Link } from "react-router-dom";

const PopularDishes = () => {
  const popularDishes = [
    {
      name: "Margherita Pizza",
      image: assets.shawarma,
    },
    {
      name: "Pad Thai",
      image: assets.shawarma,
    },
    {
      name: "Burger with Fries",
      image: assets.shawarma,
    },
    {
      name: "Burger with Fries",
      image: assets.shawarma,
    },
    {
      name: "Burger with Fries",
      image: assets.shawarma,
    },
    // Add more popular dishes as needed
  ];

  return (
    <section className="bg-white py-8 px-2">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Popular Dishes
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {popularDishes.map((dish, index) => (
            <div key={index} className="text-center">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-32 h-32 object-cover rounded-full mx-auto"
              />
              <p className="mt-2 text-lg font-semibold">{dish.name}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link to={"/menu"}>
            <button className=" animate-pulse font-bold text-orange-lighter px-4 py-2 rounded-md hover:underline">
              Go to Menu
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularDishes;
