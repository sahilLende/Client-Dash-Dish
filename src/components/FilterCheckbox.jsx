import React, { useState } from "react";

const FilterCheckbox = ({
  filter,
  handleCheck,
  option,
  isChecked,
  handleOptionCheck,
}) => {
  return (
    <li className=" underline mb-2 underline-offset-2 ">
      <label className="flex items-center space-x-2 mb-2 ">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => handleCheck(filter, option)}
          className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <span>{option}</span>
      </label>
    </li>
  );
};

export default FilterCheckbox;
