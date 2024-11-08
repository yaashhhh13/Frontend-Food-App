import axios from "axios";
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";

const AllOrder = () => {
  const { user, setUser } = useUserContext();
  const [orders, setOrders] = useState();
  const params = useParams();
  const RequestAllOrders = async () => {
    try {
      const jwtToken = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:8000/api/v1/Order/GetAllOrders`,
        {
          userId: user.user._id,
          token: localStorage.getItem("token"),
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            Accept: "application/json",
          },
        }
      );

      if (res.data.success) {
        // const result = await res.data
        setOrders(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    RequestAllOrders();
  }, []);

  // console.log(orders);

  return (
    <>
      <div className="MyOrder w-full text-black">
        <center>
          <h1 className="text-3xl md:text-5xl m-4">All Orders</h1>
          <div className="orders-list p-2 grid py-6 gap-8 xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 grid-cols-1 place-items-center md:place-items-start">
            {orders?.map((or, i) => {
              return (
                <div
                  key={or._id}
                  className="order max-[400px]:w-full w-3/4 sm:w-80 h-max shrink-0 bg-amber-200 rounded-xl text-black flex flex-col items-start p-4 gap-2"
                >
                  <div className="w-full item-nav flex items-end justify-end gap-2 text-sm sm:text-md md:text-lg">
                    <div>
                      <h1 className="text-xs font-semibold">ORDER ID</h1>
                      <h6 className="text-xs">{or._id}</h6>
                    </div>
                  </div>
                  <div className="order-details-table w-full">
                    <table className="min-w-full table-auto border-collapse">
                      {/* Table Header */}
                      <thead>
                        <tr className="font-semibold text-sm sm:text-md md:text-lg">
                          <th className="">S.No</th>
                          <th className="">Items Bought</th>
                          <th className="">Quantity</th>
                          <th className="">Sub Total</th>
                        </tr>
                      </thead>
                      {/* Table Body */}
                      <tbody>
                        {or.Items.map((item, index) => (
                          <tr
                            key={index}
                            className="text-xs sm:text-sm md:text-md text-center"
                          >
                            <td className=" px-4 py-2">{index + 1}</td>
                            <td className=" px-4 py-2">{item.Food.FoodName}</td>
                            <td className=" px-4 py-2">
                              {item.qty} x ${item.Food.FoodPrice}
                            </td>
                            <td className=" px-4 py-2">
                              ${item.qty * item.Food.FoodPrice}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="totalPrice w-full flex items-center justify-around text-sm sm:text-md md:text-lg">
                    <h1 className="font-semibold">Total</h1>
                    <h1>${or.TotalAmount} (inclusive of all taxes)</h1>
                  </div>
                  <Link to={`/singleOrderDets/${or._id}`}>
                    <button className="active:scale-90 self-center transition duration-150 hover:scale-95 py-1 sm:py-2 px-3 sm:px-5 rounded-full text-md md:text-lg cursor-pointer bg-rose-500 border-0">
                      More Details
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        </center>
      </div>
    </>
  );
};

export default AllOrder;
