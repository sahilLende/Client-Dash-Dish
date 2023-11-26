import React from "react";
import { NavHashLink } from "react-router-hash-link";
const MenuList = ({ vegMenu, nonVegMenu, handleMenubar }) => {
  const menu = {
    vegMenu,
    nonVegMenu,
  };
  const handleClick = (e, type) => {
    const element = document.getElementById(e.target.innerText + type);
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    if (handleMenubar !== undefined) handleMenubar(false);
  };
  return (
    <>
      {/* two list */}
      <h1 className="text-xl text-brown font-bold mb-3"> Menu</h1>
      <div className=" divide-y-2 divide-orange-light divide-dashed">
        {Object.keys(menu).map((item, index) => {
          if (menu[`${item}`].length > 0)
            return (
              <ul key={item} id="veg-menu" className="list-unstyled my-2 ">
                <h1 className="text-base font-bold my-2   text-brown md:text-lg">
                  {index === 0 ? "Veg " : "Non Veg"}
                </h1>
                {index === 0
                  ? vegMenu.map((menuType) => (
                      <li
                        key={menuType}
                        onClick={(e) =>
                          handleClick(e, index === 0 ? "veg" : "nonVeg")
                        }
                        className=" mb-1  sm:text-base hover:underline  p-1  hover:cursor-pointer "
                      >
                        {menuType}
                      </li>
                    ))
                  : nonVegMenu.map((menuType) => (
                      <li
                        key={menuType}
                        onClick={(e) =>
                          handleClick(e, index === 0 ? "veg" : "nonVeg")
                        }
                        className=" mb-2  sm:text-base hover:underline  p-1  hover:cursor-pointer"
                      >
                        {menuType}
                      </li>
                    ))}
              </ul>
            );
        })}
      </div>
    </>
  );
};

export default MenuList;
