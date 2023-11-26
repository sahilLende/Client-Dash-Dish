import React, { useState, useEffect, useMemo, useContext } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import Menu from "../components/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faMapMarkerAlt,
  faRupeeSign,
} from "@fortawesome/free-solid-svg-icons";
import useLoading from "../hooks/useLoading";
import Loading from "../components/Loading";
import MenuList from "../components/MenuList";
import ShowMenuButton from "../components/showMenuButton";
import RestroMenuModal from "../components/RestroMenuModal";
import { BASE_API_URL, ENDPOINT_ORDER } from "../API";
const getMenuByRestaurant = async (
  location,
  restaurant,
  handleDishes,
  handleMenu,
  handleRestaurantData,
  resId,
  handleLoading
) => {
  try {
    /* get restaurant form id and not name
     */

    if (resId) {
      const response = await axios.get(
        `${BASE_API_URL}${ENDPOINT_ORDER}/${location}/restaurant/${restaurant}`,
        {
          params: {
            resId,
          },
        }
      );

      handleMenu(response.data.menu);
      handleDishes(response.data.dishes);
      handleRestaurantData(response.data.restaurant);
      handleLoading(false);
    }
  } catch (err) {
    handleLoading(false);
  }
};

const getMenu = (menu, dishes, type) => {
  const menuType = menu.filter((menu) => {
    //find dish where menu of dish is current menu
    const itemfound = dishes.find((dish) => {
      return dish.menu === menu && (type === "veg" ? dish.isVeg : !dish.isVeg);
    });
    return itemfound ? true : false;
  });
  return menuType;
};

const RestaurantMenu = () => {
  const locationDetails = useLocation();
  const [loading, handleLoading] = useLoading();
  const { location, restaurant } = useParams();
  const [restaurantData, setRestaurantData] = useState(null);
  const [menu, setMenu] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [showMenuBar, setShowMenuBar] = useState(false);

  const handleMenuBar = (value) => {
    setShowMenuBar(value);
  };
  const handleDishes = (dishes) => {
    setDishes(dishes);
  };
  const handleMenu = (menu) => {
    setMenu(menu);
  };
  const handleRestaurantData = (details) => {
    setRestaurantData(details);
  };

  const [vegMenu, nonVegMenu] = useMemo(() => {
    const vegMenu = getMenu(menu, dishes, "veg");
    const nonVegMenu = getMenu(menu, dishes, "nonVeg");

    return [vegMenu, nonVegMenu];
  }, [menu, dishes]);

  useEffect(() => {
    getMenuByRestaurant(
      location,
      restaurant,
      handleDishes,
      handleMenu,
      handleRestaurantData,
      locationDetails.state.resId,
      handleLoading
    );
  }, [location, restaurant, locationDetails]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col w-full ">
          {/* two section one for banner  and aone for menu */}
          {restaurantData && (
            <section className="xl:w-3/4  m-auto max-h-28 md:max-h-72 text-xs md:text-lg  bg-white shadow-lg p-2 rounded-md mt-8 border border-orange">
              <div className="flex items-center mb-2">
                <img
                  src="https://imgur.com/cbqXQ57.jpg" // Replace with the actual path to your image
                  alt="Restaurant Image"
                  className="w-10 h-10 object-cover rounded-md mr-4 shadow-md border-2 border-orange-500"
                />
                <div>
                  <h2 className=" font-bold mb-1">{restaurantData.name}</h2>
                  <div className="flex items-center">
                    <p className="text-gray-500  mr-2">
                      {restaurantData.address}
                    </p>
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400"
                    />
                    <span className=" text-yellow-400 ml-1">
                      {restaurantData.aggregate_rating}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <hr className="border-t border-gray-300" />
              </div>
              <div className="flex items-center mb-4">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-gray-400 mr-2"
                />
                <p className="text-gray-500">
                  {restaurantData.locality}, {restaurantData.city}
                </p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faRupeeSign} className=" mr-2" />
                <p className="">
                  {restaurantData.average_cost_for_two} for two
                </p>
              </div>
            </section>
          )}

          {menu.length > 0 && dishes.length > 0 ? (
            <section className=" w-full px-6 md:flex  md:h-screen overflow-y-auto gap-2 mt-4 border-t-2  ">
              <div className=" hidden scroll  md:flex flex-col gap-4  overflow-y-auto p-2 text-xs md:w-3/10 border-r-2 mr-1">
                <MenuList vegMenu={vegMenu} nonVegMenu={nonVegMenu} />
              </div>
              <div className="flex-1 w-full   overflow-y-auto  ">
                {vegMenu.length > 0 && (
                  <Menu menu={vegMenu} dishes={dishes} type="veg" />
                )}
                {nonVegMenu.length > 0 && (
                  <Menu menu={nonVegMenu} dishes={dishes} type="nonVeg" />
                )}
              </div>
              <ShowMenuButton handleMenuBar={handleMenuBar} />
              <RestroMenuModal
                isOpen={showMenuBar}
                vegMenu={vegMenu}
                nonVegMenu={nonVegMenu}
                handleMenubar={handleMenuBar}
              />
            </section>
          ) : (
            <p>Error</p>
          )}
        </div>
      )}
    </>
  );
};

export default RestaurantMenu;
