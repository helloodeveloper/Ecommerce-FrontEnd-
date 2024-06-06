import NavBar from "../features/navbar/Navbar";
import UserProfile from "../features/user/components/UserProfile";

function UserProfilePage() {
  return (
    <div>
      <NavBar>
        <h1 className="mx-auto px-2 py-4 text-4xl font-semibold mb-0 underline font-serif text-blue-950 flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="blue"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-10 h-10 font-semibold ml-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          User Profile :
        </h1>
        <UserProfile />
      </NavBar>
    </div>
  );
}

export default UserProfilePage;
