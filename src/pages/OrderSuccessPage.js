import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetCartAsync } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetOrder } from "../features/order/orderSlice";

function OrderSuccessPage() {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    // reset cart
    dispatch(resetCartAsync());
    // reset currentOrder
    dispatch(resetOrder());
  }, [dispatch]);

  return (
    <>
      {!params.id && <Navigate to="/" replace={true}></Navigate>}
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 md:p-10 shadow-lg max-w-md md:max-w-xl rounded-lg w-full">
          <svg
            className="mx-auto h-16 w-16 text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-800 text-center">
            Order Placed Successfully!
          </h2>

          <h2 className="mt-1 text-xl md:text-xl font-semibold text-green-900 text-center">
            Order Number #{params?.id}
          </h2>

          <p className="mt-2 text-gray-600 text-center">
            Thank you for your purchase. Your order was successful.
          </p>
          <strong className="mt-2 text-gray-800 block text-center">
            You can check your order in{" "}
            <span className="underline">My Account</span> {">"}{" "}
            <span className="underline">My Orders.</span>
          </strong>
          <Link
            to="/"
            className="mt-8 text-center font-semibold  bg-green-500 text-gray-50 px-6 py-3 rounded-md block mx-auto hover:bg-green-600"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </>
  );
}

export default OrderSuccessPage;
