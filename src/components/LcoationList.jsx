import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import cities from "./cities";

const LocationList = () => {
  return (
    <div className="mt-6">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Popular Locations in India
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {cities.map((city) => (
          <div
            key={city.id}
            className={`mt-2 p-4  text-center rounded-lg shadow-md hover:shadow-xl duration-300  ${
              city.name === "Pune" ? "bg-orange  animate-pulse " : ""
            }`}
          >
            <Link
              to={`${city.name}`}
              className={`flex justify-between items-center animate-none `}
            >
              <span className="animate-none">{city.name}</span>
              <FontAwesomeIcon icon={faArrowRight} className=" text-brown" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationList;
