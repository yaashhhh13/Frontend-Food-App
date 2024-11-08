import { useUserContext } from "../../context/UserContext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { user, setUser } = useUserContext();

  const [image, setImage] = useState();
  const [uploading, setUploading] = useState(false);
  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/all/upload-image`,
        formData
      );
      // console.log("sending data to backend")
      setUploading(false);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      toast.success("image updated succesfully")
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const City = form.City.value;
    const State = form.State.value;
    const country = form.country.value;
    const PinCode = form.PinCode.value;
    const role = form.role.value;
    const profilePicture = image?.url;

    console.log(e.target)

      try {
        const res = await axios.put(
          `${import.meta.env.VITE_API_URL}/user/UpdateProfiledetails`,
          {
            userID: user.user._id,
            name,
            City,
            State,
            country,
            PinCode,
            profilePicture,
            role
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.success) {
          toast.success(res.data.message);
          form.reset();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <>
      <div className="Edit-profile flex flex-col justify-center items-center">
        <center className="text-3xl mt-4 sm:text-5xl text-black font-semibold">Update Profile</center>
        <div className="edit w-full md:w-2/3 mt-3 p-4">
          <form
            onSubmit={handleUpdateFormSubmit}
            className="w-full p-2 sm:p-5 md:p-9 flex flex-col justify-center items-center gap-3 bg-amber-200 text-black"
          >
            <label htmlFor="file-upload">
              <img
                src={image?.url || user?.user.profilePicture}
                alt=""
                className="h-32 w-32 rounded-full"
              />
            </label>
            <label>Profile Picture</label>
            <input
              type="file"
              id="file-upload"
              label="Image"
              name="profilePicture"
              className="hidden w-full"
              accept=".jpeg, .png, .jpg"
              onChange={handleImage}
            />
            <input
              type="text"
              placeholder={user?.user.name || "enter your name"}
              name="name"
              className="input input-bordered input-secondary w-full sm:w-2/3"
            />
            <input
              type="text"
              placeholder={user?.user.email}
              name="email"
              disabled
              className="input input-bordered input-secondary w-full sm:w-2/3"
            />
            <input
              type="text"
              name="City"
              placeholder={user?.user.City || "enter your city name"}
              className="input input-bordered input-secondary w-full sm:w-2/3"
            />
            <input
              type="text"
              name="State"
              placeholder={user?.user.State || "enter your state name"}
              className="input input-bordered input-secondary w-full sm:w-2/3"
            />
            <input
              type="text"
              name="country"
              placeholder={user?.user.country || "enter your country name"}
              className="input input-bordered input-secondary w-full sm:w-2/3"
            />
            <input
              type="text"
              name="PinCode"
              placeholder={user?.user.PinCode || "enter your pin Code"}
              className="input input-bordered input-secondary w-full sm:w-2/3"
            />
            <input
              type="text"
              name="role"
              placeholder={user?.user.role || "enter your role"}
              className="input input-bordered input-secondary w-full sm:w-2/3"
            />
            <button className="w-full sm:w-2/3 bg-rose-500 text-2xl py-3 text-white rounded-full cursor-pointer">
              Update Profile
            </button>
            <ToastContainer />
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
