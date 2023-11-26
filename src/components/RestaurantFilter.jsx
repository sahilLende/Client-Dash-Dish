import React, { Fragment, useEffect, useMemo, useState } from "react";

import { Dialog, Transition, Tab } from "@headlessui/react";
import axios, { all } from "axios";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import FilterOptionsPanel from "./FilterOptionsPanel";
import { BASE_API_URL, ENDPOINT_ORDER, ENDPOINT_FILTERS } from "../API";

const RestaurantFilter = ({ handleActiveFilters, isOpen, handleFilter }) => {
  /* modal */

  const [filterOptions, setFilterOptions] = useState({});
  const { location } = useParams();

  /* click handleer for Apply button */
  const handleApply = () => {
    /* update active filters */
    let selectedfilters = {};

    Object.keys(filterOptions).forEach((key) => {
      const selectedOptions = filterOptions[`${key}`]
        .filter((option) => option.isChecked === true)
        .map((option) => option.name);
      selectedfilters[`${key}`] = selectedOptions;
    });
    //make selected filters as active filters
    handleActiveFilters(selectedfilters);
    /*update the url froma ctive filters  */
  };

  /* handler for Check  & unCheck */
  const handleCheck = (filter, name) => {
    let isSafeToAdd = true;
    const NORMAL_LIMIT = 4;
    const CUISINE_LIMIT = 9;
    const optionsArray = filterOptions[`${filter}`];
    let count = 0;
    for (let i = 0; i < optionsArray.length; i++) {
      if (count > (filter === "cuisines" ? CUISINE_LIMIT : NORMAL_LIMIT)) {
        isSafeToAdd = false;
        break;
      }
      if (optionsArray[i].isChecked === true) count++;
    }

    const ifChecked = optionsArray.find(
      (option) => option.name === name
    ).isChecked;

    if (isSafeToAdd || ifChecked === true) {
      const newState = optionsArray.map((option) => {
        return option.name === name
          ? {
              ...option,
              isChecked: !option.isChecked,
            }
          : option;
      });
      setFilterOptions((prev) => {
        return {
          ...prev,
          [`${filter}`]: newState,
        };
      });
    }
  };

  /* handler for Clear All Checks */
  const unCheckAllFilter = () => {
    let initialState = {};
    Object.keys(filterOptions).forEach((filter) => {
      let intitalValue = filterOptions[`${filter}`].map((option) => {
        return option.isChecked === true
          ? {
              ...option,
              isChecked: false,
            }
          : option;
      });
      initialState[`${filter}`] = intitalValue;
    });
    setFilterOptions(initialState);
  };

  /* handler to set intital filteroptions fetched form db */

  const handleFiltersOptionsInitially = (value) => {
    let initialState = {};
    Object.keys(value).forEach((key) => {
      let newOptions = value[`${key}`].map((option) => {
        return {
          name: option,
          isChecked: false,
        };
      });

      initialState[`${key}`] = newOptions;
    });
    setFilterOptions(initialState);
  };

  useEffect(() => {
    const fetchFilterOptionsByCity = async (location) => {
      try {
        const response = await axios.get(
          `${BASE_API_URL + ENDPOINT_ORDER}/${location + ENDPOINT_FILTERS}`
        );
        handleFiltersOptionsInitially(response.data);
      } catch (err) {
        throw err;
      }
    };
    fetchFilterOptionsByCity(location);
  }, []);

  return (
    <Transition show={isOpen} appear>
      <Dialog
        onClose={() => {
          unCheckAllFilter();
          handleFilter(false);
        }}
        className={"relative z-50 "}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed  inset-0 bg-black/25" />
        </Transition.Child>
        <div className="fixed  inset-0 flex w-screen items-center justify-center p-2 ">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full  text-xs md:text-base md:w-3/5  h-[60%]  flex flex-col rounded p-2 border-2  bg-white">
              <Tab.Group as={"div"} className=" h-[90%] flex flex-row ">
                <Tab.List className=" items-start whitespace-nowrap flex flex-col gap-2 w-2/6  border-r-2 px-2 ">
                  {filterOptions &&
                    Object.keys(filterOptions).map((item) => (
                      <Tab key={item} as={Fragment}>
                        {({ selected }) => (
                          <button
                            className={
                              selected
                                ? "under text-blue-600  underline underline-offset-4 font-semibold"
                                : "text-black"
                            }
                          >
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                          </button>
                        )}
                      </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="w-full pl-5 overflow-y-auto ">
                  {Object.keys(filterOptions).map((key) => {
                    return (
                      <Tab.Panel key={key}>
                        <FilterOptionsPanel
                          panelKey={key}
                          filterOptions={filterOptions}
                          handleCheck={handleCheck}
                        />
                      </Tab.Panel>
                    );
                  })}
                </Tab.Panels>
              </Tab.Group>
              <div className="flex  flex-row flex-1  rounded-md justify-end gap-6 font-semibold whitespace-nowrap  p-2  text-white">
                <button
                  className=" w-20  rounded-md bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                  onClick={(e) => unCheckAllFilter()}
                >
                  Clear All
                </button>
                <button
                  onClick={(e) => {
                    handleApply();
                    unCheckAllFilter();
                    handleFilter(false);
                  }}
                  className="w-20  rounded-md bg-orange-500 hover:bg-orange-600 active:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-300"
                >
                  Apply
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RestaurantFilter;
