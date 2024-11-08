import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

const FoodDetsPage = () => {
  const params = useParams();
  const [foodDets, setFoodDets] = useState([]);

  const GetFoodDets = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/FoodRoute/Food-Dets/${params.id}`
      );

      //   console.log("sent food dets request")

      if (res.data.success) {
        setFoodDets(res.data.data.food);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetFoodDets();
  }, []);

  // console.log(foodDets.FoodImage);

  // console.log(params)

  return (
    <>
      <div className="Food-Dets p-5 text-black">
        <div className="head flex gap-2 text-2xl sm:text-4xl md:text-6xl">
          <Link to="/">Home / </Link>
          <h1> {foodDets.FoodName}</h1>
        </div>
        <div className="dets-container w-full flex flex-col sm:flex-row gap-3 mt-2 sm:mt-4 md:mt-8 bg-amber-200 text-black">
          <div className="food-img w-full sm:w-1/2 md:w-1/3 p-2 sm:p-5">
            <img
              src={foodDets.FoodImage}
              alt=""
              className="w-full rounded-xl"
            />
          </div>
          <div className="Food-Description w-full sm:1/2 md:w-2/3 p-2 sm:p-5 flex flex-col gap-3">
            <h1 className="text-2xl sm:text-3xl">{foodDets.FoodName}</h1>
            <h2 className="text-2xl sm:text-3xl">price : ${foodDets.FoodPrice}</h2>
            <p className="text-lg sm:text-2xl">{foodDets.FoodDescription}</p>
            <div className="quantity flex w-full justify-between pr-9">
              <h1 className="text-2xl sm:text-3xl">quantity</h1>
              <div className="amount flex items-center justify-center gap-2 md:gap-4">
                <AiOutlineMinus  className="bg-rose-500 rounded-full cursor-pointer p-1 text-lg sm-text-2xl md:text-3xl lg:text-4xl"/>
                <h1 className="text-xl sm:text-2xl md:text-3xl bg-white py-0 sm:py-1 md:py-2 px-2 sm:px-4 md:px-6 rounded-md">1</h1>
                <AiOutlinePlus  className="bg-rose-500 rounded-full cursor-pointer p-1 text-lg sm-text-2xl md:text-3xl lg:text-4xl"/>
              </div>
            </div>
            <div className="btns flex gap-3">
                <button className="bg-rose-500 rounded-full cursor-pointer max-[350px]:text-lg text-xl sm:text-2xl md:text-3xl py-1 sm:py-2 px-3 sm:px-5 rounded-lg pb-3">Add to cart</button>
                <button className="bg-rose-500 rounded-full cursor-pointer max-[350px]:text-lg text-xl sm:text-2xl md:text-3xl py-1 sm:py-2 px-3 sm:px-5 rounded-lg pb-3">Favourites</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodDetsPage;
