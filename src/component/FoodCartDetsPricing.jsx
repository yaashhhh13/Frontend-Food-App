import { useCartContext } from "../../context/cartContext";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

const FoodCartdetsPricing = ({ food }) => {
  const { cartItems, removeItem, addToCart } = useCartContext();

  return (
    <tr className="cart-item-dets border-b">
      <td className="food-dets w-1/6 p-1 sm:p-2 text-center">
        <img
          src={food.FoodImage}
          alt=""
          className="w-12 sm:w-24 md:w-40 h-12 sm:h-24 md:h-40 mx-auto"
        />
        <h1>{food.FoodName}</h1>
      </td>
      <td className="category w-1/6 p-1 sm:p-2 text-center">{food.FoodCategory}</td>
      <td className="quantity w-1/6 p-1 sm:p-2 text-center">
        <div className="amount flex items-center justify-center gap-2 sm:gap-4">
          <AiOutlineMinus
            onClick={() => removeItem(food)}
            className="bg-rose-500 rounded-full cursor-pointer text-md sm-text-xl md:text-2xl lg:text-3xl"
          />
          <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl py-2 px-0 sm:px-2 md:px-4">
            {food.qty}
          </h1>
          <AiOutlinePlus
            onClick={() => addToCart(food)}
            className="bg-rose-500 rounded-full cursor-pointer text-md sm-text-xl md:text-2xl lg:text-3xl"
          />
        </div>
      </td>
      <td className="price w-1/6 p-2 text-center">${food.FoodPrice}</td>
      <td className="total-price w-1/6 p-1 sm:p-2 text-center">
        ${food.FoodPrice * food.qty}
      </td>
    </tr>
  );
};

export default FoodCartdetsPricing;
