import { useEffect, useState } from "react";
import { useFoodContext } from "../../context/FoodContext";
import axios from "axios";
import Foods from "./Foods";

const RecomendedFood = () => {
  
  const [TopRatedFood, setTopRatedFood] = useState([]);
  const { food, setFood } = useFoodContext();

  const GetTopRatedFood = async () => {
    try {
      const jwtToken = localStorage.getItem("token");
      // console.log("sent food dets request 1");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/FoodRoute/TopRatedFood`,{
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            Accept: "application/json",
            // other headers as needed
          },
        }
      );


      // console.log(res)

      // console.log("sent food dets request 2");

      if (res.data.success) {
        setTopRatedFood(res.data.data.food);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(TopRatedFood);

  useEffect(() => {
    GetTopRatedFood();
  }, []);


  return (
    <>
      <div className="recomended-Food container w-full mx-auto p-2 sm:p-5">
        <center>
          <h1 className="text-2xl text-rose-500 font-semibold sm:text-5xl">Recomended Food</h1>
        </center>
          <div className="Foods mt-8 align-center text-black w-full grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {TopRatedFood.map(curElem => <Foods key={curElem._id} curElem={curElem}/>)}
        </div>
      </div>
    </>
  );
};

export default RecomendedFood;
