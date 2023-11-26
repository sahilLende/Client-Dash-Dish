import * as assets from "../assets";
import { Link } from "react-router-dom";
import {
  faBicycle,
  faBagShopping,
  faUtensils,
  faMoneyBillTransfer,
  faCheck,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Hero = () => {
  return (
    <section className="landing-section container-fluid">
      <div className="grid md:grid-cols-12 gap-4 justify-items-center">
        <div className="md:col-span-4 lg:col-span-5 col-span-12">
          <div className="relative">
            <div className="absolute -top-4 circle rounded-full bg-orange opacity-5"></div>
            <h1 className="title-font ms-7 lg-heading">
              Delivery at{" "}
              <span className="text-orange  animate-pulse">
                Lightning Speed
              </span>
              , Pickup Made Easy
            </h1>
          </div>
        </div>
        <div className="md:col-span-4 col-span-12 flex flex-col justify-center items-center">
          <img src={assets.homepage} alt="" className="md:max-w-md w-4/5 " />
          <Link to="/order">
            <button className="bg-orange w-40 h-20 text-white px-4 py-2 rounded-md hover:bg-orange-light">
              Order Now
            </button>
          </Link>
        </div>
        <div className="md:col-span-4 lg:col-span-3 col-span-12 ms-3">
          <ul className="space-y-10 flex flex-col">
            <li className="flex d-flex gap-7">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-300 shadow">
                <FontAwesomeIcon icon={faBicycle} className="text-2xl p-20" />
              </span>
              <span>
                <div className="font-bold text-lg">Fast delivery</div>
                <p className="text-md lg:w-3/4">
                  Promise to deliver within 30mins
                </p>
              </span>
            </li>
            <li className="flex d-flex gap-7">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-300 shadow">
                <FontAwesomeIcon
                  icon={faBagShopping}
                  className="text-2xl p-20"
                />
              </span>
              <span>
                <div className="font-bold text-lg">Pick up</div>
                <p className="text-md lg:w-3/4">
                  Pickup delivery at your doorstep
                </p>
              </span>
            </li>
            <li className="flex d-flex gap-7">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-300 shadow">
                <FontAwesomeIcon icon={faUtensils} className="text-2xl p-20" />
              </span>
              <span>
                <div className="font-bold text-lg">Dine in</div>
                <p className="text-md lg:w-3/4">
                  Enjoy your food fresh crispy and hot
                </p>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Hero;
