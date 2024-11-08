import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Addfood = () => {
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

      if (uploading === false) {
        toast.success("Successfully Uploaded");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(image)

  const navigate = useNavigate();

  const handleAddFoodFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const FoodName = form.FoodName.value;
    const FoodImage = image?.url;
    const FoodPrice = form.FoodPrice.value;
    const FoodDescription = form.FoodDescription.value;
    const FoodCategory = form.FoodCategory.value;
    const FoodWeight = form.FoodWeight.value;
    const FoodLocation = form.FoodLocation.value;
    const FoodData = {
      FoodName,
      FoodImage,
      FoodPrice,
      FoodDescription,
      FoodCategory,
      FoodWeight,
      FoodLocation,
    };

    // console.log(`starting form submitting process with this data ${FoodData}`);

    const res = await axios.post(
      "${import.meta.env.VITE_API_URL}/FoodRoute/Addfood",
      { FoodName,
        FoodImage,
        FoodPrice,
        FoodDescription,
        FoodCategory,
        FoodWeight,
        FoodLocation, },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    // console.log(`sent response ${res}`);

    if (res.data.success) {
      toast.success(res.data.message);
      form.reset()
    } else {
      toast.error(res.data.message);
    }


  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight ">
            Add new food
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={handleAddFoodFormSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Food name
              </label>
              <div className="mt-2">
                <input
                  id="FoodName"
                  name="FoodName"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="foodImage" className="block text-sm font-medium">
                food image
              </label>
              <div className="mt-2">
                <input
                  type="file"
                  id="FoodImage"
                  name="FoodImage"
                  label="Image"
                  accept=".jpeg, .png, .jpg"
                  onChange={handleImage}
                  className="file-input file-input-bordered bg-amber-200 border-0 text-black w-full max-w-xs"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Food Price
              </label>
              <div className="mt-2">
                <input
                  id="FoodPrice"
                  name="FoodPrice"
                  type="Number"
                  required
                  className="block w-full rounded-md px-2 border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium">
                  Food Description
                </label>
              </div>
              <div className="mt-2">
                <textarea
                  id="FoodDescription"
                  name="FoodDescription"
                  type="text"
                  rows="3"
                  required
                  className="block w-full rounded-md border-0 px-2 text-black py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium">
                  Food Category
                </label>
              </div>
              <select
                name="FoodCategory"
                className="select text-black select-secondary w-full max-w-xs"
              >
                <option disabled selected>
                  none
                </option>
                <option>Rice</option>
                <option>Desert</option>
                <option>Drinks</option>
                <option>Fruits</option>
                <option>Non-veg</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="FoodWeight"
                  className="block text-sm font-medium"
                >
                  Food Weight
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="FoodWeight"
                  name="FoodWeight"
                  type="Number"
                  required
                  className="block w-full text-black rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="FoodLocation"
                  className="block text-sm font-medium"
                >
                  Food Restaurant location
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="FoodLocation"
                  name="FoodLocation"
                  type="text"
                  required
                  className="block w-full text-black rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full mt-7 justify-center rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Food
              </button>
            </div>
            <ToastContainer />
          </form>
        </div>
      </div>
    </>
  );
};

export default Addfood;
