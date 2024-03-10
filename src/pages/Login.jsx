import { React, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN } from "../apis/apiRoutes";
import axios from '../apis/axios'

const Login = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData);
    if (
      Object.keys(formData).some((key) => formData[key] === "") ||
      Object.keys(formData).length < 2
    ) {
      alert("all fields are required");
    } else {
      try {
        setLoading(true)
        const response = await axios.post(LOG_IN, formData);
        console.log("response", response);
        if (response.data.success) {
          setLoading(false)
          navigate("/");
          localStorage.setItem('isAuthenticated', response.data.payload.token)
        } else {
          setLoading(false)

          alert(response.data.message);
        }

      }

      catch (error) {
        setLoading(false)

        console.error(error);
      }
    }

  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div className="bg-gray-200 min-h-screen flex flex-col">
        <div className="container md:w-5/12 w-full mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Login</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />

              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                onChange={handleChange}

              />

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-blue-600 text-white hover:bg-blue-500 focus:outline-none my-1"
                onClick={handleSubmit}
              >
                {!loading ? ' Login' : 'Please wait...'}
              </button>
            </form>



          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
