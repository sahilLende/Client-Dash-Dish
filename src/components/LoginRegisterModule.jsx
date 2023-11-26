import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext, url } from "../utils/Context";
import { Icon } from "@iconify/react";
import { useDocumentTitle } from "../utils";
import { BASE_API_URL, ENDPOINT_REGISTER, ENDPOINT_LOGIN } from "../API";
import usePopup from "../hooks/usePopup";

const Popup = ({ status, message }) => {
  return (
    <div className="fixed inset-0 flex items-start justify-center bg-gray-900 bg-opacity-50 pt-8">
      <div className="bg-white rounded-lg flex space-x-4 p-8 items-center justify-center">
        <Icon
          icon={
            status === "ok" ? "carbon:checkmark-filled" : "carbon:close-filled"
          }
          color={status === "ok" ? "green" : "red"}
          className="text-3xl"
        />
        <h2 className="text-lg">{message}</h2>

        <div role="status ml-3">
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-orange"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export const Register = () => {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "sahil",
    lastName: "lende",
    gender: "male",
    email: "new@gmail.com",
    password: "randomNumber",
    phoneNumber: "randomNumber",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [popup, handlepopup] = usePopup();
  const [correct, setCorrect] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isValid, setIsValid] = useState(false);

  async function postUser() {
    try {
      const response = await axios.post(
        `${BASE_API_URL + ENDPOINT_REGISTER}`,
        user
      );
      handlepopup(response.data.message, "ok", () => navigate("/user/login"));
    } catch (error) {
      handlepopup(error.response.data.message, "error");
    }
  }

  // `isValid` doesn't need to be a state,
  // you should use `useMemo` just like you do for the `menu`
  useEffect(() => {
    const isValid =
      user.firstName !== "" &&
      user.lastName !== "" &&
      user.gender !== "" &&
      user.email !== "" &&
      user.password !== "" &&
      user.phoneNumber !== "" &&
      confirmPassword !== "" &&
      isChecked;
    setIsValid(isValid);
  }, [user, confirmPassword, isChecked]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.password !== confirmPassword) {
      setCorrect(true);
      handlepopup("Passwords do not match", "error");
    } else {
      postUser();
    }
  };

  return (
    <div className="p-6 lg:p-10 xl:p-20 w-full">
      {useDocumentTitle("Register")}
      <h1 className="font-bold title-font text-4xl pb-4">
        Create your account <span className="text-orange">!</span>
      </h1>
      {popup.show ? (
        <Popup status={popup.status} message={popup.message} />
      ) : null}
      <form onSubmit={handleSubmit} method="post">
        <div className="flex max-xl:flex-col 2xl:space-x-6">
          <div className="flex flex-col py-3 w-full">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              name="firstName"
              className="p-3 border border-gray-300 rounded flex-grow"
              value={user.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col py-3 w-full">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              className="p-3 border border-gray-300 rounded flex-grow"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex max-xl:flex-col 2xl:space-x-6">
          <div className="flex flex-col py-3 w-full">
            <label htmlFor="gender">Gender:</label>
            <select
              name="gender"
              className="p-3 border border-gray-300 rounded flex-grow"
              value={user.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="flex flex-col py-3 w-full">
            <label htmlFor="email">E-mail Address:</label>
            <input
              type="email"
              className="p-3 border border-gray-300 rounded flex-grow"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-col py-3 w-full">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="phone"
            className="p-3 border border-gray-300 rounded flex-grow"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleChange}
            minLength={11}
            maxLength={11}
            required
          />
        </div>
        <div className="flex max-xl:flex-col 2xl:space-x-6">
          <div className="flex flex-col py-3 w-full">
            <label htmlFor="pwd">Password:</label>
            <input
              className={`p-3 border ${
                correct ? "border-red-600 outline-red-600" : "border-gray-300"
              } rounded flex-grow`}
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col py-3 w-full">
            <label htmlFor="cpwd">Confirm Password:</label>
            <input
              className={`p-3 border ${
                correct ? "border-red-600 outline-red-600" : "border-gray-300"
              } rounded flex-grow`}
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </div>
        </div>
        <div className="py-3">
          <input
            type="checkbox"
            name="isChecked"
            id=""
            placeholder=""
            onChange={(e) => setIsChecked(e.target.checked)}
            value={isChecked}
            className="text-orange"
          />{" "}
          By checking this box, you agree to the terms and conditions.
        </div>
        <button
          type="submit"
          className={`bg-orange ${
            isValid
              ? "active:cursor-pointer"
              : "disabled:bg-orange-lighter cursor-not-allowed"
          } w-full text-white uppercase 
          my-6 p-6 font-bold text-3xl rounded-lg`}
          disabled={!isValid}
        >
          Register
        </button>
      </form>
      <div className="text-xl font-bold">
        Have an account?
        <Link to={`/user/login`}>
          <span className="text-orange pl-1">Log in now</span>
        </Link>
      </div>
    </div>
  );
};

export const Login = () => {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [popup, handlepopup] = usePopup();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function getUser() {
    try {
      const response = await axios.post(`${BASE_API_URL + ENDPOINT_LOGIN}`, {
        email,
        password,
      });
      dispatch({ type: "LOGIN", payload: response.data.user });
      handlepopup(response.data.message, "ok", () => navigate("/order"));
    } catch (error) {
      handlepopup(
        error.response.data.message || error.response.message || error.message,
        "notOk"
      );
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    getUser();
  };

  return (
    <div className="p-6 xl:p-20 w-full">
      {useDocumentTitle("Login")}
      {popup.show ? (
        <Popup status={popup.status} message={popup.message} />
      ) : null}
      <h1 className="font-bold title-font text-4xl">
        Welcome<span className="text-orange">!</span>
      </h1>
      <div className="text-xl font-bold pb-4">
        Don't have an account?
        <Link to={`/user/register`}>
          <span className="text-orange pl-1">Sign up now</span>
        </Link>
      </div>
      <p>Enter details to login.</p>
      <form onSubmit={handleSubmit} action="/users" method="post">
        <div className="py-3 w-full">
          <input
            type="email"
            className="p-3 border border-gray-300 rounded w-full"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-wrap items-stretch py-3">
          <input
            type={showPassword ? "text" : "password"}
            className="p-3 border border-r-0 border-gray-300 rounded-l flex-grow"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="font-bold uppercase cursor-pointer text-orange border border-l-0 border-gray-300 flex rounded-r items-center px-6"
            onClick={togglePasswordVisibility}
          >
            <div className="text-orange text-2xl">
              <Icon
                icon={showPassword ? "ion:eye-outline" : "ion:eye-off-outline"}
              />
            </div>
          </span>
        </div>

        <p
          className="py-5 font-bold flex cursor-pointer text-orange justify-end uppercase"
          onClick={() =>
            alert(
              "For test purposes, the email is test@gmail.com and the password is 'password' "
            )
          }
        >
          Forgot Password?
        </p>
        <button
          type="submit"
          className="bg-orange w-full text-white uppercase p-6 font-bold text-3xl rounded-lg"
        >
          Log In
        </button>
      </form>
    </div>
  );
};
