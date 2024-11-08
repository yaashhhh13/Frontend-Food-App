import { useState } from "react";
import "./App.css";
import Navbar from "./Shared/Navbar";
import Footer from "./Shared/Footer";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProtectedRoute from "./Pages/ProtectedRoute";
import VerifyOTP from "./Pages/VerifyOTP";
import Addfood from "./Pages/Admin/Addfood";
import Menu from "./Pages/Menu";
import FoodDetsPage from "./Pages/FoodDetsPage";
import Profile from "./Pages/Profile";
import ViewCart from "./Pages/ViewCart";
import PaymentSuccess from "./Pages/PaymentSucces";
import PaymentFailure from "./Pages/PayementFailure";
import Checkout from "./Pages/Checkout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AllOrder from "./Pages/AllOrder";
import MyOrders from "./Pages/MyOrders";
import SingleOrderDets from "./Pages/SingleOrderDets";

function App() {
  const [count, setCount] = useState(0);

  const stripePromise = loadStripe(
    'pk_test_51OosFhSHn7i3OBEmYYZbktMXAhm0I4BBLLdjh8Wk7KT44l62crotit8zwJF9MhkQXCLYaK8IUPigRzNRxYw24uFl00pD4CfFwg'
  );

  return (
    <>
      <div className="main bg-white overflow-x-hidden">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route
            path="/VerifyOTP"
            element={
              <ProtectedRoute>
                <VerifyOTP />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Addfood"
            element={
              <ProtectedRoute>
                <Addfood />
              </ProtectedRoute>
            }
          />
          <Route
            path="/OurMenu"
            element={
              <ProtectedRoute>
                <Menu />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Menu/:id"
            element={
              <ProtectedRoute>
                <FoodDetsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view-cart"
            element={
              <ProtectedRoute>
                <ViewCart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/SuccesfullPayment"
            element={
              <ProtectedRoute>
                <PaymentSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/PaymentFailure"
            element={
              <ProtectedRoute>
                <PaymentFailure />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Elements stripe={stripePromise}>
                  <Checkout />
                </Elements>
              </ProtectedRoute>
            }
          />
          <Route
            path="/AllOrders"
            element={
              <ProtectedRoute>
                <AllOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/singleOrderDets/:id"
            element={
              <ProtectedRoute>
                <SingleOrderDets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/MyOrders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
