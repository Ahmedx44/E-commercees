import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const OrderSuccess = () => {
  const history = useHistory();

  useEffect(() => {
    // After a delay (e.g., 3 seconds), redirect the user to the cart page
    const timeoutId = setTimeout(() => {
      history.push("/cart");
    }, 3000);

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [history]);

  return (
    <div>
      <h1>Order Successful!</h1>
      <p>You will be redirected to the cart page in a few seconds.</p>
    </div>
  );
};

export default OrderSuccess;
