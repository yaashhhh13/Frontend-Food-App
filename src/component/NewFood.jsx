import { useEffect, useState } from "react";
import { useFoodContext } from "../../context/FoodContext";
import axios from "axios";
import Foods from "./Foods";

const NewFood = () => {
  const [newFood, setNewFood] = useState([]);
  const { food, setFood } = useFoodContext();

  const GetNewFood = async () => {
    try {
      const jwtToken = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:8000/api/v1/FoodRoute/GetNewFood`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            Accept: "application/json",
            // other headers as needed
          },
        }
      );

      //   console.log("sent food dets request")

      if (res.data.success) {
        setNewFood(res.data.data.food);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(newFood)

  useEffect(() => {
    GetNewFood();
  }, []);

  return (
    <>
      <div className="recomended-Food container w-full mx-auto p-2 sm:p-5">
        <center>
          <h1 className="text-2xl sm:text-5xl text-rose-600">New Food</h1>
        </center>
        <div className="Foods mt-8 align-center text-black w-full grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {newFood.splice(0,8).map((curElem) => (
            <Foods key={curElem._id} curElem={curElem} />
          ))}
        </div>
      </div>
    </>
  );
};

export default NewFood;
