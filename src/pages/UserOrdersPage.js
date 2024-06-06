import { useSelector } from "react-redux";
import NavBar from "../features/navbar/Navbar";
import UserOrders from "../features/user/components/UserOrders";
import { selectUserOrders } from "../features/user/userSlice";

function UserOrdersPage() {
  const orders = useSelector(selectUserOrders);

  // console.log(orders);
  return (
    <div>
      <NavBar>
        <h1 className="mx-auto px-2 py-4 text-4xl font-semibold mb-0 underline font-serif text-blue-950 flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-10 font-semibold mt-0 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>
          My Orders :
        </h1>
        <UserOrders />
      </NavBar>
    </div>
  );
}

export default UserOrdersPage;
