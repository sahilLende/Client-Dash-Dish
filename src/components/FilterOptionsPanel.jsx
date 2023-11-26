import React from "react";
import FilterCheckbox from "./FilterCheckbox";

const FilterOptionsPanel = ({ handleCheck, panelKey, filterOptions }) => {
  return (
    //need four types of such Panels
    <>
      <h1 className="underline text-lg mb-3 "> Filter By</h1>
      <ul className="overflow-y-auto">
        {filterOptions[`${panelKey}`].map((option) => {
          return (
            <FilterCheckbox
              key={option.name}
              filter={panelKey}
              option={option.name}
              isChecked={option.isChecked}
              handleCheck={handleCheck}
            />
          );
        })}
      </ul>
    </>
  );
};

export default FilterOptionsPanel;
