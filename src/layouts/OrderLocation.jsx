import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import RestaurantCatalouge from "../components/RestaurantCatalouge";
import RestaurantFilter from "../components/RestaurantFilter";
import ActiveFilters from "../components/ActiveFilters";
import useLoading from "../hooks/useLoading";
import { BASE_API_URL, ENDPOINT_ORDER } from "../API";

const fetchRestaurantsByCity = async (location, offset, urlParams) => {
  let extraqueries = {};
  for (const key of urlParams.keys()) {
    extraqueries[`${key}`] = urlParams.get(key);
  }

  try {
    const response = await axios.get(
      `${BASE_API_URL}${ENDPOINT_ORDER}/${location}`,
      {
        params: {
          offset: offset,
          limit: 10,
          ...extraqueries,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const OrderLocation = () => {
  const { location } = useParams();

  const [error, setError] = useState(null);
  const [restaurants, setRestaurants] = useState({});
  const [loading, handleLoading] = useLoading();
  const offsetRef = useRef(0);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [urlParams, setUrlParams] = useSearchParams();

  const handleActiveFilters = (selectedfilters) => {
    let searchQuery = {};
    Object.keys(selectedfilters).forEach((key) => {
      if (selectedfilters[`${key}`].length > 0) {
        searchQuery[`${key}`] = selectedfilters[`${key}`]
          .join(",")
          .toLowerCase();
      }
    });
    setUrlParams(searchQuery);
    setActiveFilters(selectedfilters);
  };

  const resetActiveFilters = () => {
    setActiveFilters({});
    if ([...new Set(urlParams.keys())].length !== 0) setUrlParams({});
  };

  const getIntialRestaurants = (value) => {
    setRestaurants({
      restaurantList: value.restaurants,
      restaurantCount: value.docCount,
    });
  };
  const handleError = (value) => {
    setError(value);
  };

  const handleFilter = (value) => {
    setFilterOpen(value);
  };
  const getMoreRestaurants = (value) => {
    const moreRestaurants = value.restaurants;
    setRestaurants((prev) => {
      return {
        ...prev,
        restaurantList: [...prev.restaurantList, ...moreRestaurants],
      };
    });
  };

  useEffect(() => {
    const fetchRestaurantsData = async () => {
      offsetRef.current = 0;
      try {
        const initialRestaurantsData = await fetchRestaurantsByCity(
          location,
          offsetRef.current,
          urlParams
        );

        getIntialRestaurants(initialRestaurantsData);
        handleLoading(false);
        handleError(null);
      } catch (err) {
        handleError(
          err.response.data.message ? err.response.data.message : err.message
        );
        handleLoading(false);
      }
    };

    fetchRestaurantsData();

    return () => {
      offsetRef.current = 0;
    };
  }, [location, urlParams]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="about-section pb-4 mt-5  m-4">
          <div className="bg-brown  text-white rounded-md p-2 mb-6">
            <h1 className=" text-center items-center my-auto">
              {!error
                ? `Order in
                   ${location.toUpperCase()}`
                : error}
            </h1>
          </div>

          {!error && (
            <>
              <ActiveFilters activeFilters={activeFilters} />
              <RestaurantCatalouge
                activeFilters={activeFilters}
                resetActiveFilters={resetActiveFilters}
                location={location}
                getMoreRestaurants={getMoreRestaurants}
                restaurantList={restaurants.restaurantList}
                restaurantCount={restaurants.restaurantCount}
                offsetRef={offsetRef}
                handleLoading={handleLoading}
                handleError={handleError}
                handleFilter={handleFilter}
              />
              <RestaurantFilter
                handleActiveFilters={handleActiveFilters}
                activeFilters={activeFilters}
                isOpen={isFilterOpen}
                handleFilter={handleFilter}
              />
            </>
          )}
        </section>
      )}
    </>
  );
};

export default OrderLocation;

export { fetchRestaurantsByCity };
