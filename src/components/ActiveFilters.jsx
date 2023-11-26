import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
const ActiveFilters = ({ activeFilters }) => {
  return (
    /* the localities filter comma issue */
    <div className="  rounded-md  w-full h-max p-4 text-xs">
      {Object.keys(activeFilters).length > 0 ? (
        <div>
          <h1 className=" font-bold text-center sm:text-start text-sm mb-2">
            Active Filters
          </h1>
          <ul>
            {Object.keys(activeFilters).map((filter) => {
              if (activeFilters[`${filter}`].length > 0)
                return (
                  <li
                    key={filter}
                    className="w-full  rounded-md border-collapse h-max    p-2 mb-2 flex flex-row justify-start content-center "
                  >
                    <div className=" text-sm mr-2 ">
                      {filter.slice(0, 1).toUpperCase().concat(filter.slice(1))}
                      :
                    </div>
                    <div className=" flex-1 whitespace-nowrap overflow-x-auto ">
                      {activeFilters[`${filter}`].map((value) => {
                        return (
                          <span
                            key={value}
                            className="h-full sm:text-sm  bg-yellow-100  mx-1  px-2 border  rounded-md  "
                          >
                            {value}
                          </span>
                        );
                      })}
                    </div>
                  </li>
                );
            })}
          </ul>
        </div>
      ) : (
        <p>Results/All</p>
      )}
    </div>
  );
};

export default ActiveFilters;
