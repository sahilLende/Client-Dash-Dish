import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import "./FadeIn.scss";
import { Helmet } from "react-helmet";

export const FadeIn = ({ children, url }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="fade-in" key={url}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="fade-in-children">{children}</div>
      )}
    </div>
  );
};

export const useDocumentTitle = (title) => {
  return (
    <Helmet>
      <title>{title} - Dash Dish, your friendly food service</title>
    </Helmet>
  );
};
