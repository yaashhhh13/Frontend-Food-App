import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { Link, useParams } from "react-router-dom";

const SingleOrderDets = () => {
  const [singleOrderDets, setSingleOrderDets] = useState([]);
  const [OrderDets, setOrderDets] = useState([]);
  const { user, setUser } = useUserContext();
  const jwtToken = localStorage.getItem("token");
  const params = useParams();

  const GetSingleOrderDetails = async () => {
    try {
      // console.log("sending api req");
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/Order/GetOrder`,
        {
          OrderId: params.id,
          token: localStorage.getItem("token"),
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            Accept: "application/json",
          },
        }
      );

      // console.log(res.data);
      // console.log(res.data.data.Items);

      if (res.data.success) {
        setSingleOrderDets(res.data.data.Items);
        setOrderDets(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetSingleOrderDetails();
  }, []);

  const onCheckboxclick = async (mark) => {
    try {
      // console.log(params.id);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/Order/DeliveredOrder`,
        {
          OrderId: params.id,
          token: localStorage.getItem("token"),
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            Accept: "application/json",
          },
        }
      );
      // console.log(res);
      setOrderDets(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="dets p-4">
        <center className="text-4xl">Order Details</center>
        <center className="mb-4">Order Id {OrderDets._id}</center>
        <div className="item-head w-full flex items-center text-sm sm:text-md md:text-lg justify-around mb-5">
          <h1>S.No</h1>
          <h1>Items Bought</h1>
          <h1>Quantity</h1>
          <h1>Sub total</h1>
        </div>
        <div className="item-details flex flex-col gap-4">
          {singleOrderDets.map((item, index) => {
            return (
              <>
                <div key={index} className="order-dets w-full">
                  <div className="item-dets w-full flex items-center justify-around max-[350px]:gap-2">
                    <h1>{index + 1}</h1>
                    <div className="food-name flex items-center justify-center gap-4">
                      <div className="Food-Img ">
                        <img
                          className="w-12 sm:w-28 md:w-48 h-12 sm:h-28 md:h-48"
                          src={item.Food.FoodImage}
                          alt=""
                        />
                      </div>
                      <div className="Name flex flex-col gap-2">
                        <h2 className="text-sm sm:text-md md:text-lg">
                          {item.Food.FoodName}
                        </h2>
                        <div className="descrp w-32 md:w-48 h-16 sm:h-24 md:h-32 overflow-hidden">
                          <p className="text-sm sm:text-md md:text-lg w-48 line-clamp">
                            {item.Food.FoodDescription}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="qty flex items-center justify-center text-sm sm:text-md md:text-lg">
                      {item.qty}x{item.Food.FoodPrice}
                    </div>
                    <div className="total text-sm sm:text-md md:text-lg">
                      {item.qty * item.Food.FoodPrice}
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="order-summary w-full flex flex-col text-center">
          <center className="text-lg sm:text-2xl text-center flex align-center justify-center whitespace-nowrap">
            Payment status :{" "}
            {OrderDets.Payement === false ? <h1>Not Paid</h1> : <h1>paid</h1>}
          </center>
          <center className="text-lg sm:text-2xl text-center flex justify-center items-center gap-2">
            Delivery status : {OrderDets.status}
            {OrderDets.status === "Pending" && (
              <div className="flex items-center gap-2">
                <input
                  onClick={onCheckboxclick}
                  className="checkbox w-6 h-6"
                  type="checkbox"
                />
                <small>(mark as delivered)</small>
              </div>
            )}
          </center>
          <center className="text-lg sm:text-2xl text-center">
            Order Date : {OrderDets.createdAt}
          </center>
          <center className="text-lg sm:text-2xl">
            Total Amount : {OrderDets.TotalAmount}$
          </center>
        </div>
        <center>
          <Link>
            <button className="active:scale-90 self-center transition duration-150 hover:scale-95 py-2 px-5 my-4 rounded-full text-lg cursor-pointer bg-rose-500 border-0">
              Download Invoice
            </button>
          </Link>
        </center>
      </div>
    </>
  );
};

export default SingleOrderDets;
