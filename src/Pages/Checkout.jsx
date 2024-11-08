import { Link } from "react-router-dom";
import { useCartContext } from "../../context/cartContext";
import { useUserContext } from "../../context/UserContext";
import { useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Checkout = () => {
  const { cartItems, removeItem, addToCart } = useCartContext();

  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.FoodPrice, 0);

  const taxPrice = itemsPrice * 0.14;

  const TaxPriceLength = parseFloat(taxPrice.toFixed(2))

  const shippingCharge = itemsPrice > 2000 ? 0 : 20;

  const totalPrice = itemsPrice + TaxPriceLength + shippingCharge;

  const FinalTotalPrice = totalPrice.toFixed(3)


  const { user } = useUserContext()
  const stripe = useStripe()

  const handleFinish = async () => {
    try {
      const orderItems = cartItems.map(item => ({
        Food: item._id,
        qty: item.qty
      }))

      // console.log("reached 34th line")
      
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/Order/createOrder`, {
        user: user?.user._id,
        Items: orderItems,
        TotalAmount:FinalTotalPrice,
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      // console.log("reached 45th line")

      if(res.data.success){

        const result = await stripe.redirectToCheckout({
          sessionId : res.data.sessionId
        })

        toast.success(res.data.message)
      } else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("something went wrong")
    }
  }
 
  return (
    <>
      <div className="Checkout w-full p-4 flex items-center justify-center">
        <div className="pay-dets w-3/4 md:w-1/3 bg-amber-200 text-black p-4 flex flex-col items-center justify-center">
          <div className="img">
            <img src="/Stripe-Logo.png" alt="" className="w-20 h-20" />
          </div>
          <div className="price mt-4">
            <h1>Items Price : ${itemsPrice}</h1>
            <h1>Tax Price : ${TaxPriceLength}</h1>
            <h1>Shipping Charge : ${shippingCharge}</h1>
            <h1>Total Price : ${FinalTotalPrice}</h1>
          </div>
          <Link to="/checkout">
            <button onClick={handleFinish} className="active:scale-90 transition duration-150 text-white mt-4 hover:scale-105 py-2 px-9 rounded-full text-lg cursor-pointer bg-rose-500 border-0 w-fit">
              pay
            </button>
          </Link>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Checkout;
