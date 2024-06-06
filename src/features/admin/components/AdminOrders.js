import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import {
  PencilIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/solid";
import Pagination from "../../common/Pagination";

function AdminOrders() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };

  const handleOrderStatus = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };
  
  const handleOrderPaymentStatus = (e, order) => {
    const updatedOrder = { ...order, paymentStatus: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    console.log({ sort });
    setSort(sort);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-purple-200 py-3  text-purple-900";
      case "Dispatched":
        return "bg-yellow-200 py-3  text-yellow-900";
      case "Delivered":
        return "bg-green-200 py-3  text-green-900";
      case "received":
        return "bg-green-200 py-3  text-green-900";
      case "Cancelled":
        return "bg-red-200 py-3  text-red-900";
      default:
        return "bg-purple-200 py-3 text-purple-900";
    }
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  return (
    <div className="overflow-x-auto">
      <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-2 px-2 text-left">Order_id </th>
                  <th className="py-2 px-16 text-left">Items</th>
                  <th
                    className="py-2 px-2 text-left cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "totalAmount",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Total Amount{" "}
                    {sort._sort === "totalAmount" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="py-2 px-2 text-center">Shipping Address</th>
                  <th className="py-2 px-2 text-center">Order Status</th>
                  <th className="py-2 px-2 text-center">Payment Method</th>
                  <th className="py-2 px-2 text-center">Payment Status</th>
                  <th className="py-2 px-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 shadow-2xl">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-2 px-3 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span className="font-medium">{order.id}</span>
                      </div>
                    </td>
                    <td className="py-2 px-3 text-left">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex-col text-center items-center"
                        >
                          <span className="font-bold ">
                            {item.product.title}
                          </span>
                          <div className="font-serif">
                            {" "}
                            Discounted Price: ${discountedPrice(item.product)}
                          </div>
                          <div className="font-semibold">
                            Qty: #{item.quantity}{" "}
                          </div>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <div className="flex items-center font-bold justify-center">
                        ${order.totalAmount}
                      </div>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <div className="">
                        <div>
                          <strong>{order.selectedAddress.name}</strong>,
                        </div>
                        <div className="text-sm">
                          {order.selectedAddress.city},
                          {order.selectedAddress.state},
                        </div>
                        <div className="text-sm">
                          {order.selectedAddress.pinCode},{" "}
                        </div>
                        <div className="text-sm">
                          {order.selectedAddress.phone}{" "}
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-3 text-center">
                      {order.id === editableOrderId ? (
                        <select
                          onChange={(e) => handleOrderStatus(e, order)}
                          className="cursor-pointer rounded-lg items-center text-center"
                        >
                          <option value="pending">Pending</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.status
                          )}  px-3 rounded-full text-sm font-serif`}
                        >
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <div className="flex items-center font-bold justify-center">
                        {order.paymentMethod}
                      </div>
                    </td>  

                    <td className="py-2 px-3 text-center">
                      {order.id === editableOrderId ? (
                        <select
                          onChange={(e) => handleOrderPaymentStatus(e, order)}
                          className="cursor-pointer rounded-lg items-center text-center"
                        >
                          <option value="pending">Pending</option>
                          <option value="received">Received</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.paymentStatus
                          )}  px-3 rounded-full text-sm font-serif`}
                        >
                          {order.paymentStatus}
                        </span>
                      )}
                    </td>


                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                          <PencilIcon
                            className="w-6 h-5 cursor-pointer"
                            onClick={(e) => handleEdit(order)}
                          ></PencilIcon>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        totalItems={totalOrders}
      ></Pagination>
    </div>
  );
}

export default AdminOrders;
