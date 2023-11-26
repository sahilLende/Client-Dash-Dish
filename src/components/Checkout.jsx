import { useState, useContext, useEffect } from "react";
import { useDocumentTitle } from "../utils";
import { AppContext } from "../utils/Context";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_API_URL, ENDPOINT_SUBMIT_ORDER } from "../API";
import usePopup from "../hooks/usePopup";
import { OrderStatusPopup } from "./AnimatedCheckMark";
const Checkout = () => {
  const { state, dispatch, totalItems, totalPrice } = useContext(AppContext);
  const shippingFees = totalPrice > 5000 ? 500 : 200;
  const email = state.user?.email;
  const localReference = localStorage.getItem("reference");
  const navigate = useNavigate();
  const callbackURL = import.meta.env.VITE_CALLBACK_URL;
  const [popup, handlePopup] = usePopup();
  const formInputData = [
    {
      key: "firstName",
      name: "First Name",
      type: "text",
      validation: {
        required: "First Name Required",
      },
      classes: " p-2 col-span-full md:col-span-1",
    },
    {
      key: "lastName",
      name: "Last Name",
      type: "text",
      validation: {
        required: "Last Name is Required",
        maxLength: 100,
      },
      classes: " p-2 col-span-full md:col-span-1 ",
    },
    {
      key: "phoneNumber",
      name: "Phone Number",
      type: "text",
      validation: {
        required: "Required",
        pattern: {
          message: "Enter Proper Numbers",
          value: /^[0-9]+$/,
        },
        minLength: {
          message: "Required 10 digit",
          value: 10,
        },
        maxLength: {
          message: "Required 10 digit",
          value: 10,
        },
      },
      classes: " p-2 col-span-full md:col-span-1 ",
    },

    {
      key: "zipcode",
      name: "Zipcode",
      type: "number",
      validation: {
        required: "Required",
        pattern: {
          message: "Enter valid zipcode",
          value: /^\d*\.?\d+$/,
        },
        maxLength: { message: "Max Length is 6", value: 6 },
      },
      classes: " p-2 col-span-full md:col-span-1",
    },
    {
      key: "streetAddress",
      name: "Street Address",
      type: "textArea",
      validation: {
        required: "Required",
        max: { value: "200", message: "Max Char Reached" },
      },
      classes: " max-h-24 p-2 row-span-2 col-span-full",
    },
    ,
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      streetAddress: "",
      phoneNumber: "",
      paymentMethod: "",
      zipcode: "",
    },
  });

  const handlePaymentSubmit = async () => {
    const customerName = watch("firstName") + " " + watch("lastName");
    const items = state.cartItems.cartItemIds.map(
      (item) => state.cartItems.cartItemsData[`${item}`]
    );
    const amount = (totalPrice + shippingFees) * 10;
    const orderDetails = {
      customerEmail: email,
      customerName,
      contactNumber: watch("phoneNumber"),
      orderTime: new Date(),
      deliveryAddress: watch("streetAddress") + " " + watch("zipcode"),
      amount: amount,
      orderDetails: items,
    };

    try {
      const response = await axios.post(
        `${BASE_API_URL + ENDPOINT_SUBMIT_ORDER}`,
        orderDetails
      );
      dispatch({ type: "CHECKOUT", payload: items });
      handlePopup(response.data.message, "ok", () =>
        navigate("/", { replace: true })
      );
    } catch (err) {
      handlePopup(
        err.response.data.message ||
          err.response.message ||
          "Order Not Submitted",
        "notok"
      );
    }

    /* sendReceiptEmail(
      custmerName,
      items,
      deliveryFees,
      total,
      watch("streetAddress"),
      recipientEmail
    ); */
  };

  return (
    <main className=" h-screen">
      {useDocumentTitle("Checkout")}

      <a
        href="/"
        className="flex navbar-brand font-bold text-3xl title-font relative p-6 border  border-b-2"
      >
        Dash Dish
        <span className="w-3 h-3 rounded-full bg-orange self-end mb-0.5"></span>
      </a>

      {popup.show && (
        <OrderStatusPopup status={popup.status} message={popup.message} />
      )}
      <form
        onSubmit={handleSubmit(handlePaymentSubmit)}
        className="text-base mt-5"
      >
        <div className="container flex max-md:flex-col">
          <div className="p-4 lg:w-7/10">
            <div className="bg-white p-4 rounded-lg border  shadow-xl ">
              <h2 className="  font-semibold mb-2">Shipping Address</h2>
              <div className=" grid grid-rows-6 w-full  gap-2 md:grid-rows-4 grid-cols-1 md:grid-cols-2 ">
                {formInputData.map((input) => {
                  return (
                    <div
                      key={input.key}
                      className={`${input.classes} w-full h-full  flex flex-col `}
                    >
                      <label htmlFor={input.key} className=" text-base h-1/3">
                        {errors[`${input.key}`] ? (
                          <span className="text-red-600">
                            {errors[`${input.key}`].message}
                          </span>
                        ) : (
                          input.name
                        )}
                      </label>

                      {input.type === "textArea" ? (
                        <textarea
                          id={input.key}
                          className={`${
                            errors[`${input.key}`]
                              ? "border-red"
                              : "border-gray-800"
                          } w-full  flex-1  p-2 border`}
                          placeholder={input.name}
                          {...register(input.key, input.validation)}
                        />
                      ) : (
                        <input
                          id={input.key}
                          {...register(input.key, input.validation)}
                          className={`${
                            errors[`${input.key}`]
                              ? "border-red"
                              : " border-gray-800"
                          } w-full flex-1 p-2 border`}
                          type={input.type}
                          placeholder={input.name}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg mt-4 border shadow-xl">
              <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
              <div className="mb-4 flex justify-between flex-col">
                <label htmlFor="credit-card" className="flex items-center ">
                  <input
                    id="credit-card"
                    {...register("paymentMethod", { required: "Required" })}
                    type="radio"
                    value="creditCard"
                  />
                  <span className="ml-2">Credit Card</span>
                </label>
                <label htmlFor="debit-card" className="flex items-center ">
                  <input
                    id="debit-card"
                    {...register("paymentMethod", { required: true })}
                    type="radio"
                    value="debitCard"
                  />
                  <span className="ml-2">Debit Card</span>
                </label>
                <label htmlFor="pay-on-delivery" className="flex items-center ">
                  <input
                    id="pay-on-delivery"
                    {...register("paymentMethod", { required: true })}
                    type="radio"
                    value="payOnDelivery"
                  />
                  <span className="ml-2">Pay on Delivery</span>
                </label>
              </div>
            </div>
          </div>
          <div className="p-5 lg:w-3/10">
            <div className="bg-gray-100 rounded-lg p-5 border shadow-xl ">
              <h2 className="text-2xl font-semibold mb-4">Order summary</h2>
              <div className="flex flex-col justify-between flex-wrap">
                <div className="flex justify-between content-center py-2">
                  <p>Subtotal</p>
                  <p>₹{totalPrice.toLocaleString()}</p>
                </div>
                <div className="flex justify-between content-center py-2">
                  <p>Shipping:</p>
                  <p>₹{shippingFees.toLocaleString()}</p>
                </div>
                <div className="flex justify-between py-4 content-center">
                  <p className="font-bold text-lg">Total:</p>
                  <p className="text-3xl font-black">
                    ₹ {(totalPrice + shippingFees).toLocaleString()}
                  </p>
                </div>
                <div className="flex justify-center py-4">
                  <button
                    type="submit"
                    className="px-20 py-4 bg-orange rounded-xl text-2xl text-white font-bold content-center hover:bg-opacity-80"
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Checkout;
