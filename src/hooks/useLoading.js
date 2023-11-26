import { useState, useEffect } from "react";

const useLoading = () => {
  const [loading, setLoading] = useState(true);

  const handleLoading = (value) => setLoading(value);

  useEffect(() => {}, [loading]);

  return [loading, handleLoading];
};
export default useLoading;
