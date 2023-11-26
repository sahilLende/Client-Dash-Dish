import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
const RestaurantCard = ({ restaurant }) => {
  return (
    <Link
      to={`restaurant/${restaurant.name}`}
      state={{ resId: restaurant.resId }}
      className="transform transition-transform duration-400 hover:scale-105"
    >
      <div className="bg-white shadow-lg rounded-lg overflow-hidden m-2 max-w-xs h-56 ">
        <img
          src={restaurant.image_url}
          alt={restaurant.name}
          className="w-full h-20 object-cover"
        />
        <div className="px-4 py-2 flex-1">
          <h1 className="font-bold mb-2 ">{restaurant.name}</h1>

          {restaurant.rating > 0 && (
            <div className="text-gray-700 text-xs mb-2">
              <div className="flex items-center text-green-500 text-xs font-semibold mb-2">
                <FontAwesomeIcon icon={faStar} className="mr-1" />
                Rating: {restaurant.rating}
              </div>
            </div>
          )}

          <div className="text-xs">
            Cuisine: {restaurant.cuisine.join(", ")}
          </div>
          <p className="text-xs mt-2">
            Cost For Tow: {restaurant.average_cost_for_two}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
