import { Icon } from "@iconify/react";
import { useContext } from "react";
import { AppContext } from "../utils/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faMinus,
  fa0,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function CartItem(props) {
  const { state, dispatch } = useContext(AppContext);
  const price = props.quantity * props.price;

  const deleteCartItem = (id) => {
    dispatch({
      type: "REMOVE_DISH_FROM_CART",
      payload: id,
    });
  };

  const updateItemQuantity = (id, value) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id: id, quantityInCart: props.quantity + value },
    });
  };

  return (
    <li className=" flex p-3 flex-row justify-between items-center gap-3 m-2 h-max  border ">
      <p className=" text-xs sm:text-sm  w-1/2  items-start gap-1  ">
        <FontAwesomeIcon icon={faLeaf} className=" mr-1 text-green-600" />
        <span>{props.name}</span>
      </p>
      <div className="text-xs p-2 lg:text-sm flex justify-between gap-2 items-center   md:w-36 md:px-2  border rounded-md h-8 ">
        <button onClick={(e) => updateItemQuantity(props.id, -1)}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <span>{props.quantity}</span>
        <button onClick={(e) => updateItemQuantity(props.id, 1)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <p className="text-xs sm:text-sm  w-1/4 text-center  flex flex-row justify-around items-center gap-2">
        <span>{price}</span>
        <FontAwesomeIcon
          onClick={(e) => deleteCartItem(props.id)}
          icon={faTrash}
          className="text-gray-900 "
        />
      </p>
    </li>
  );
}
