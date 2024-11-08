import { Link } from "react-router-dom";
import { useCartContext } from "../../context/cartContext";
import FoodCartdetsPricing from "../component/FoodCartDetsPricing";

const ViewCart = ({ food }) => {
  const { cartItems, removeItem, addToCart } = useCartContext();

  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.FoodPrice, 0);

  const taxPrice = itemsPrice * 0.14;

  const TaxPriceLength = parseFloat(taxPrice.toFixed(2));

  const shippingCharge = itemsPrice > 2000 ? 0 : 20;

  const totalPrice = itemsPrice + TaxPriceLength + shippingCharge;

  const FinalTotalPrice = totalPrice.toFixed(3);

  //   console.log(cartItems);

  return (
    <>
      <div className="cart p-1 xs:px-4 sm:px-8 py-4 text-black">
        <div className="cart-head">
          <h1 className="text-3xl sm:text-5xl border-b border-b-zinc-100 py-7">
            My Food Cart
          </h1>
        </div>
        <div className="cart-body py-4 flex flex-col gap-3">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="cart-body-head bg-gray-100">
                <th className="name-head w-1/6 p-1 sm:p-2 text-xs xs:text-md sm:text-lg md:text-xl lg:text-2xl text-center">
                  Food Details
                </th>
                <th className="category-head w-1/6 p-1 sm:p-2 text-xs xs:text-md sm:text-lg md:text-xl lg:text-2xl text-center">
                  Food Category
                </th>
                <th className="name-head w-1/6 p-1 sm:p-2 text-xs xs:text-md sm:text-lg md:text-xl lg:text-2xl text-center">
                  Quantity
                </th>
                <th className="name-head w-1/6 p-1 sm:p-2 text-xs xs:text-md sm:text-lg md:text-xl lg:text-2xl text-center">
                  Food Price
                </th>
                <th className="name-head w-1/6 p-1 sm:p-2 text-xs xs:text-md sm:text-lg md:text-xl lg:text-2xl text-center">
                  Total Price
                </th>
              </tr>
            </thead>
            <tbody className="cart-body-content">
              {cartItems.map((item) => (
                <FoodCartdetsPricing key={item.id} food={item} />
              ))}
            </tbody>
          </table>
          {cartItems.length !== 0 && (
            <div className="cart-footer flex flex-col items-end">
              <h1 className="text-lg sm:text-2xl">Delivery Charge : ${shippingCharge}</h1>
              <h1 className="text-lg sm:text-2xl">Tax : ${TaxPriceLength}</h1>
              <h2 className="text-lg sm:text-2xl">Total Price : ${FinalTotalPrice}</h2>
            </div>
          )}
          {cartItems.length !== 0 && (
            <center>
              <Link to="/checkout">
                <button className="active:scale-90 transition duration-150 hover:scale-105 py-1 sm:py-2 px-3 sm:px-5 rounded-lg text-lg cursor-pointer bg-rose-500 border-0 w-fit">
                  Check out
                </button>
              </Link>
            </center>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewCart;
