import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useFoodContext } from "../../context/FoodContext";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Foods from "../component/Foods";

const Menu = () => {
  const { food, setFood } = useFoodContext();

  const [active, setActive] = useState(0);

  const [value, setValue] = useState("all");

  const FoodCategory = [
    {
      id: 0,
      name: "All",
      value: "all",
    },
    {
      id: 1,
      name: "Rice",
      value: "Rice",
    },
    {
      id: 2,
      name: "Desert",
      value: "Desert",
    },
    {
      id: 3,
      name: "Drinks",
      value: "Drinks",
    },
    {
      id: 4,
      name: "Fruits",
      value: "Fruits",
    },
    {
      id: 5,
      name: "Non-veg",
      value: "Non-veg",
    },
  ];

  const handleBtnToggle = (btn) => {
    setActive(btn.id);
    setValue(btn.value);
  };

  const params = useParams();
  
  const GetFoods = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/FoodRoute/GetAllFood?FoodCategory=${value}`
      );

      if (res.data.success) {
        setFood(res.data.data.food);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(food);
  useEffect(() => {
    GetFoods();
  }, [value]);

  return (
    <>
      <div className="menu px-2">
        <center>
          <h1 className="text-4xl">Menu</h1>
        </center>
        <div className="w-full px-4 mt-7 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 h-auto justify-around">
          {FoodCategory.map((btn) => (
            <button
              className={
                active === btn.id
                  ? "py-2 px-6 text-md md:text-xl lg:text-2xl rounded-md bg-purple-600 text-white"
                  : "py-2 px-6 text-md md:text-xl lg:text-2xl rounded-md bg-rose-400"
              }
              key={btn.id}
              onClick={() => {
                handleBtnToggle(btn);
                // console.log(btn)
              }}
            >
              {btn.name}
            </button>
          ))}
        </div>
        <div className="food-view my-6 align-center text-black w-full grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {food?.map((curElem) => (
            <Link to={`/Menu/${curElem?._id}`}>
              <Foods curElem={curElem}/>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Menu;
