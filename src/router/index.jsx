import { createBrowserRouter } from "react-router-dom";
import Home from "../layouts/Home";
import Cart from "../layouts/Cart";
import { Login, Register } from "../components/LoginRegisterModule";
import Root from "../routes/Root";
import LoginRoot from "../routes/LoginRoot";
import Checkout from "../components/Checkout";
import Order from "../layouts/Order";
import LocationList from "../components/LcoationList";
import OrderLocation from "../layouts/OrderLocation";
import RestaurantMenu from "../layouts/RestaurantMenu";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "order",
        element: <Order />,
        children: [
          {
            index: true,
            element: <LocationList />,
          },
          {
            path: ":location",
            element: <OrderLocation />,
          },
          {
            path: ":location/restaurant/:restaurant",
            element: <RestaurantMenu />,
          },
        ],
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/user",
    element: <LoginRoot />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "checkout",
    element: <Checkout />,
  },
  {
    path: "*",
    element: <p>NoT Found</p>,
  },
]);

export default router;
