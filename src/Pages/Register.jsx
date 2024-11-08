import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import {toast, ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

  const [image , setImage] = useState();
  const [uploading, setUploading] = useState(false);
  const handleImage = async (e) =>{
    const file = e.target.files[0]
    let formData = new FormData()
    formData.append("image",file);
    setUploading(true)
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/all/upload-image`,formData);
      // console.log("sending data to backend")
      setUploading(false)
      setImage({
        url: data.url,
        public_id: data.public_id
      })
    } catch (error) {
      console.log(error)
    }
  }
  // console.log(image)

  const navigate = useNavigate()

  const handleFormSubmit = async (e) =>{
    e.preventDefault();
    const form = e.target;
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    const confirmPassword = form.confirmPassword.value
    const profilePicture = image?.url
    const userData = {name, email, password, confirmPassword, profilePicture}

    // console.log(userData)

    fetch(`${import.meta.env.VITE_API_URL}/user/register`,{
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData)

    }).then(res => res.json())
      .then(data => {
      if(data.success){
        // console.log("data sent to backend successfully")
        localStorage.setItem("token", data.data.token),
        toast.success(data.message)
        form.reset()
        navigate('/')
      } else{
        toast.error(data.message)
      }
    })
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img src={image?.url} alt="" className="h-32 w-32 rounded-full cursor-pointer mx-auto"/>
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight ">
            Create new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" onSubmit={handleFormSubmit}>
          <form className="space-y-4" action="#" method="POST">

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium"
              >
                Fullname
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 text-black p-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="profilePicture"
                className="block text-sm font-medium"
              >
                profile picture
              </label>
              <div className="mt-2">
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  accept=".jpeg, .png, .jpg"
                  onChange={handleImage}
                  className="file-input file-input-bordered bg-amber-200 border-0 text-black w-full max-w-xs"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 text-black p-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 p-2 text-black py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium"
                >
                  confirm password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="block w-full text-black rounded-md border-0 p-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 text-black p-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full mt-7 justify-center rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create account
              </button>
            </div>
            <ToastContainer/>
          </form>

          <p className="mt-3 text-center text-sm text-gray-100">
            Already registered?{" "}
            <Link
              to="/Login"
              className="font-semibold leading-6 text-indigo-100 hover:text-indigo-500"
            >
              click to sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
