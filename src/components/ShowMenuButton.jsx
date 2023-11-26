import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";

const ShowMenuButton = ({ handleMenuBar }) => {
  const [adjust, setAdjust] = useState(false);

  const toggleVisibility = () => {
    let scrollPosition = document.documentElement.scrollTop;

    // Get the total height of the document
    let totalHeight = document.documentElement.scrollHeight;

    // Get the window height
    let windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    // Check if the user has scrolled to the bottom
    if (scrollPosition + windowHeight >= totalHeight) {
      setAdjust(true);
      // Perform any action you want when reaching the bottom
    } else {
      setAdjust(false);
    }
  };

  useEffect(() => {
    console.log("ran");
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      className={`fixed  transition-all duration-500 delay-0   left-0  w-full   ${
        adjust ? "bottom-44" : "bottom-10"
      }    md:hidden  `}
    >
      <button
        onClick={(e) => handleMenuBar(true)}
        className=" mx-auto w-20 h-12 flex flex-row text-white justify-center items-center  font-bold rounded-md bg-orange-500 hover:bg-orange-600 active:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-300"
      >
        Menu <FontAwesomeIcon className="ml-1" icon={faBowlFood} />
      </button>
    </div>
  );
};

export default ShowMenuButton;
