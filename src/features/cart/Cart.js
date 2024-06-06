import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectCartLoaded,
  selectItems,
  updateCartAsync,
} from "./cartSlice";
import { Link } from "react-router-dom";
import { HomeIcon, ShoppingBagIcon } from "@heroicons/react/20/solid";
import { Navigate } from "react-router-dom";
import { discountedPrice } from "../../app/constants";
import { useState } from "react";
import Modal from "../common/Modal";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const cartLoaded = useSelector(selectCartLoaded)
  const [openModal, setOpenModal] = useState(null);

  const totalAmount = items.reduce(
    (amount, item) => discountedPrice(item.product) * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };
  return (
    <>
      {cartLoaded && !items.length && <Navigate to="/" replace={true}></Navigate>}
      <div className="py-4">
        <div className=" flex justify-between  mx-auto shadow-orange-200 border-b-2 bg-white rounded-b-none rounded-lg mt-4 max-w-7xl px-6 py-6 sm:px-6 lg:px-8 ">
          <h1 className="flex  text-3xl font-bold font-serif tracking-tight text-blue-950 py-2">
            {" "}
            Cart{" "}
            <ShoppingBagIcon
              className="h-8 w-7 ml-2 text-blue-900"
              aria-hidden="true"
            />
          </h1>
          <Link to="/">
            <div className="flex justify-center items-center px-3 py-3 cursor-pointer hover:bg-slate-100 rounded-md">
              <HomeIcon
                className="inline h-8 w-7 text-blue-900"
                aria-hidden="true"
              />
              <p className="font-2xl ml-2 text-cyan-950 font-serif font-semibold ">
                Home
              </p>
            </div>
          </Link>
        </div>
        <div className="mt-1 shadow-md bg-white  mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flow-root">
            <ul className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className=" shadow-md h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={item.product.id}>{item.product.title}</a>
                        </h3>
                        <p className="ml-4">${discountedPrice(item.product)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.product.brand}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500 space-x-2">
                        <label
                          htmlFor="quantity"
                          className="inline text-sm font-medium leading-6 text-gray-900 justify-center "
                        >
                          Qty :
                        </label>
                        <select
                          className="rounded-md cursor-pointer"
                          onChange={(e) => handleQuantity(e, item)}
                          value={item.quantity}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>

                      <div className="flex">
                        <Modal
                          title={`Delete ${item.product.title}`}
                          message="Are you sure you want to delete this Cart item ?"
                          dangerOption="Delete"
                          cancelOption="Cancel"
                          dangerAction={(e) => handleRemove(e, item.id)}
                          cancelAction={() => setOpenModal(null)}
                          showModal={openModal === item.id}
                        ></Modal>

                        <button
                          onClick={(e) => {
                            setOpenModal(item.id);
                          }}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t shadow-md rounded-lg rounded-t-none bg-white mt-1 border-gray-200 px-4 py-4 sm:px-6 mx-auto max-w-7xl lg:px-8">
          <div className="flex justify-between text-base font-lg font-semibold text-gray-900">
            <p>Subtotal</p>
            <p>$ {totalAmount}</p>
          </div>
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p>Total Items in Cart</p>
            <p>{totalItems} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-4 flex items-center justify-center pb-4">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Check-Out
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
