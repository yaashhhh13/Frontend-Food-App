import { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const verifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const { user } = useUserContext();
  const handleInputChange = (index, value) => {
    const newOTP = { ...otp };
    newOTP[index] = value;
    setOtp(newOTP);
  };

  const navigate = useNavigate();
  const combineOTP = parseInt(otp.join(""));
  const handleOTPFormSubmit = async (e) => {
    e.preventDefault();
    const email = user?.user?.email;
    const dataOTP = { email, combineOTP };
    fetch(`${import.meta.env.VITE_API_URL}/user/verifyOTP`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(dataOTP),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message);
          location.reload();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <>
      <center>
        <h1>verify otp</h1>
      </center>
      <div className="verifyOTP">
        <form onSubmit={handleOTPFormSubmit}>
          {otp.map((digit, index) => {
            <input
              key={index}
              value={digit}
              type="text"
              className="w-12 h-12 mx-2 border border-white-200 rounded text-center text-xl"
              maxLength="1"
              onChange={(e) => handleInputChange(index, e.target.value)}
            />;
          })}
          <button className="btn btn-primary">verify OTP</button>
        </form>
      </div>
    </>
  );
};

export default verifyOTP;
