import { useState, useEffect } from "react";

const usePopup = () => {
  const [popup, setPopup] = useState({
    show: false,
    message: "",
  });

  const handlePopup = (popUpMessage, status, popupEndHandler) => {
    setPopup({
      show: true,
      message: popUpMessage,
      status: status ? status : "ok",
    });

    setTimeout(() => {
      setPopup({
        show: false,
        message: "",
        status: "ok",
      });
      popupEndHandler ? popupEndHandler() : null;
    }, 2000);
  };

  return [popup, handlePopup];
};

export default usePopup;
