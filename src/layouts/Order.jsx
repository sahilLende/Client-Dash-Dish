import axios from "axios";
import ff from "../assets/fast-food.png";
import { useMemo, useState, useEffect, useContext } from "react";
import { AppContext, url } from "../utils/Context";
import { useDocumentTitle } from "../utils";
import { Link, Outlet, useLocation } from "react-router-dom";
import ScrollToTopButton from "../components/ScrollToTop";

const Order = () => {
  const { state, dispatch } = useContext(AppContext);
  const { pathname } = useLocation();
  const [locationInput, setLocationInput] = useState("");

  useEffect(() => {
    setLocationInput("");
  }, [pathname]);

  return (
    <main className="p-2 w-full  2xl:w-3/4 mx-auto overflow-auto ">
      {useDocumentTitle("Menu")}
      <div className="flex flex-col md:flex-row justify-around">
        <div className="flex items-baseline space-x-5">
          <h1 className="font-bold text-3xl max-md:hidden">
            Find the best foods
          </h1>
          <img src={ff} alt="" className="w-10" />
        </div>
        <div className="flex max-w-md gap-x-4">
          <label htmlFor="email-address" className="sr-only">
            Enter Location
          </label>
          <input
            id="text"
            value={locationInput}
            name="text"
            type="text"
            onChange={(e) => {
              setLocationInput(e.target.value);
            }}
            autoComplete="text"
            required
            className="min-w-0 flex-auto rounded-md border border-gray-300 bg-white/5 px-3.5 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            placeholder="Enter Your Location"
          />
          <Link to={`${locationInput}`}>
            <button
              disabled={locationInput === "" ? true : false}
              type="submit"
              className={`flex-none rounded-md bg-orange px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`}
            >
              Search
            </button>
          </Link>
        </div>
      </div>
      <Outlet />
      <ScrollToTopButton />
    </main>
  );
};

export default Order;
