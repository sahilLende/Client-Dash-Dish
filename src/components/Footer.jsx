import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" mt-4 max-h-60 ">
      <div className="bg-black  mx-auto ">
        <div className="flex items-center justify-evenly h-16 py-8">
          <div className="flex-shrink-0">
            <a
              href="/"
              className="flex navbar-brand text-white font-bold text-3xl title-font relative"
            >
              Dash Dish
              <span className="w-3 h-3 rounded-full bg-orange self-end mb-0.5"></span>
            </a>
          </div>
          <div className="hidden md:block text-white">
            &copy; 2023 <span className="text-orange">Sahil Lende</span>
          </div>
          <div className="flex items-baseline space-x-2 text-white">
            <Link to={`https://github.com/sahillende`}>
              <Icon
                icon="mdi:github"
                className="text-3xl hover:text-orange-lighter"
              />
            </Link>
            <Link to={`https://www.linkedin.com/in/sahil-lende-7023191b2/`}>
              <Icon
                icon="mdi:linkedin"
                className="text-3xl hover:text-orange-lighter"
              />
            </Link>
          </div>
        </div>
        <div className="text-white text-center py-4">
          <p>Stay connected with us:</p>
          <div className="flex items-center justify-center mt-2 space-x-4">
            <p to="" className="text-orange hover:underline">
              Contact Us
            </p>
            <p to="/privacy" className="text-orange hover:underline">
              Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
