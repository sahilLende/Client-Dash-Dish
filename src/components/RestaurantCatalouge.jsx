import React, { useMemo } from "react";
import RestaurantCard from "./RestaurantCard";
import { fetchRestaurantsByCity } from "../layouts/OrderLocation";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
const RestaurantCatalouge = ({
  location,
  resetActiveFilters,
  getMoreRestaurants,
  restaurantList,
  restaurantCount,
  handleFilter,
  offsetRef,
  handleLoading,
  handleError,
}) => {
  const [urlParams] = useSearchParams();

  const fetchMoreRestaurants = async (location, offset) => {
    handleLoading(true);
    try {
      const nextRestaurants = await fetchRestaurantsByCity(
        location,
        offset,
        urlParams
      );
      getMoreRestaurants(nextRestaurants);
      handleLoading(false);
    } catch (err) {
      handleError(err);
      handleLoading(false);
    }
  };

  return (
    <div className="w-full ">
      <div className=" h-max flex  justify-center   my-4 w-full gap-3 items-center rounded-md ">
        <button
          onClick={(e) => {
            handleFilter(true);
          }}
          className="transform transition-transform duration-400 hover:scale-105 font-mono text-sm border p-1 rounded-md hover:border-green-600  bg-white border-brown"
        >
          Filters <FontAwesomeIcon icon={faFilter} />
        </button>
        <button
          onClick={(e) => {
            resetActiveFilters();
          }}
          className=" transform transition-transform duration-400 hover:scale-105 font-mono text-sm border p-1 rounded-md bg-white hover:border-red-600  border-brown"
        >
          Reset Filters
        </button>
      </div>
      <div className="w-full flex flex-col justify-between items-center">
        <div className=" flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {restaurantList !== undefined && restaurantList.length > 0 ? (
            restaurantList.map((restaurant) => (
              <RestaurantCard key={restaurant.resId} restaurant={restaurant} />
            ))
          ) : (
            <p>No restaurants available</p>
          )}
        </div>
        {restaurantList !== undefined &&
          restaurantList.length >= 10 &&
          restaurantList.length < restaurantCount && (
            <button
              onClick={(e) => {
                offsetRef.current = restaurantList.length;
                fetchMoreRestaurants(location, offsetRef.current);
              }}
              className="mt-2 text-xl text-brown underline  "
            >
              See More
            </button>
          )}
      </div>
    </div>
  );
};

export default RestaurantCatalouge;
