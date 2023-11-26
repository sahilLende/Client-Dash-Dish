export const AnimatedCheckMark = () => {
  return (
    <div className="icon icon--order-success">
      <svg xmlns="http://www.w3.org/2000/svg" width="154px" height="154px">
        <g fill="none" stroke="#22AE73" strokeWidth="2">
          <circle
            cx="77"
            cy="77"
            r="72"
            style={{
              strokeDasharray: "480px, 480px",
              strokeDashoffset: "960px",
            }}
          ></circle>
          <circle
            id="colored"
            fill="#22AE73"
            cx="77"
            cy="77"
            r="72"
            style={{
              strokeDasharray: "480px, 480px",
              strokeDashoffset: "960px",
            }}
          ></circle>
          <polyline
            className="st0"
            stroke="#fff"
            strokeWidth="10"
            points="43.5,77.8 63.7,97.9 112.2,49.4"
            style={{
              strokeDasharray: "100px, 100px",
              strokeDashoffset: "200px",
            }}
          />
        </g>
      </svg>
    </div>
  );
};

export const AnimatedWrongMark = () => {
  return (
    <div className="flex items-center justify-center">
      <svg
        className="w-12 h-12 animate-wrongmark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
      >
        <circle
          className="wrongmark-circle"
          cx="26"
          cy="26"
          r="25"
          fill="none"
        />
        <path className="wrongmark-path" d="M16 16 36 36 M36 16 16 36" />
      </svg>
    </div>
  );
};

export const OrderStatusPopup = ({ status, message }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">{message}</h2>
        {status == "ok" ? <AnimatedCheckMark /> : <AnimatedWrongMark />}
      </div>
    </div>
  );
};
