import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext.jsx";
import { useCartContext } from "../../context/cartContext.jsx";

const Navbar = () => {
  const { user, setUser } = useUserContext();
  const { cartItems } = useCartContext();

  // console.log(user)

  const navigate = useNavigate();

  return (
    <>
      <div className="w-full flex sm:flex-row navbar bg-purple-700 p-1 sm:p-4">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            Food Delivery App
          </Link>
        </div>
        <div className="flex-none gap-2 sm:gap-5">
          {/* <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow bg-none w-full" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-9 h-9 opacity-80"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label> */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-lg text-2xl indicator-item">
                  {cartItems?.length || 0}
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-40 bg-base-100 shadow"
            >
              <div className="card-body rounded-xl bg-amber-200 text-black">
                <span className="font-bold text-lg">
                  {cartItems?.length || 0} Items
                </span>
                <div className="card-actions">
                  <Link to="/view-cart">
                    <button className="active:scale-90 transition duration-150 hover:scale-105 py-2 px-5 rounded-lg text-lg cursor-pointer bg-rose-500 border-0">
                      View cart
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user?.user.profilePicture}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white text-black rounded-box w-52"
            >
              <li>
                <Link to="/Profile" className="justify-between">
                  Profile
                </Link>
              </li>
              {}
              {user?.user.role === "admin" && (
                <li>
                  <Link to="/Addfood">Add Food</Link>
                </li>
              )}
              <li>
                <Link to="/OurMenu">our menu</Link>
              </li>
              <li>
                <Link to="/MyOrders">my orders</Link>
              </li>
              {user?.user.role === "admin" && (
                <li>
                  <Link to="/AllOrders">All Orders</Link>
                </li>
              )}
              {user?.user.role === "user" && (
                <li>
                  {/* <Link to="/MyOrders">All Orders</Link> */}
                </li>
              )}
              {user?.user.isVerified === false && (
                <li>
                  <Link to="/VerifyOTP">Please Verify OTP</Link>
                </li>
              )}
              {user ? (
                <li
                  onClick={() => {
                    localStorage.clear();
                    location.reload();
                    navigate("/");
                  }}
                >
                  <a>Logout</a>
                </li>
              ) : (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
