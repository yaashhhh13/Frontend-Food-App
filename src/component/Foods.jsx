import { FaStar } from "react-icons/fa";
import { useCartContext } from "../../context/cartContext";
import { Link } from "react-router-dom";

const Foods = ({ curElem }) => {
  const { addToCart } = useCartContext();

  console.log(curElem);

  // console.log(curElem)
  return (
    <>
      <div className="card w-full text-black bg-purple-300">
        <Link to={`/Menu/${curElem?._id}`}>
          <figure>
            <img src={curElem.FoodImage} className="w-full h-40 sm:h-54" />
          </figure>
        </Link>
        <div className="card p-4">
          <h1 className="card-title text-lg sm:text-xl">
            {curElem.FoodName}
            <div className="badge badge-secondary">
              {" "}
              {curElem.FoodReviews?.length}
              <FaStar />
            </div>
          </h1>
          <h1>{curElem.FoodPrice}$</h1>
          <div className="card-actions justify-center">
            <div
              className="active:scale-90 text-center text-white transition duration-150 hover:scale-105 py-1 sm:py-2 px-3 sm:px-5 rounded-lg text-md sm:text-lg cursor-pointer bg-rose-500 border-0"
              onClick={() => addToCart(curElem)}
            >
              Add to cart
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Foods;
