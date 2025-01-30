import React, { useState } from "react";
import { Form, message } from "antd";
import { Link } from "react-router-dom";
import axiosInstance from "../helpers/axiousInstance"; // Correct import
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import Navbar from "../components/Navbar";
import keyhouse from "../images/keyhouse.jpg";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // Add loading state

  const onFinish = async (values) => {
    const { name, email, password, password_confirmation } = values;
    if (password !== password_confirmation) {
      message.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true); // Set loading state
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/register", {
        name,
        email,
        password,
        password_confirmation,
      });
      dispatch(HideLoading());
      setLoading(false); // Unset loading state
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/login");
      } else {
        message.error("User already exists");
      }
    } catch (error) {
      dispatch(HideLoading());
      setLoading(false); // Unset loading state
      message.error("User already exists");
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className="py-4">
        <div className="object-cover flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div
            className="hidden lg:block lg:w-1/2 bg-cover bg-center object-contain"
            style={{ backgroundImage: `url(${keyhouse})` }}
          ></div>
          <div className="w-full p-4 lg:w-1/2">
            <h1 className="text-lg text-center font-semibold">Register</h1>
            <Form
              layout="vertical"
              onFinish={onFinish}
              className="flex flex-col gap-0.5"
            >
              <Form.Item
                name="name"
                className="border p-1 rounded-lg focus:outline-none focus:border-blue-500"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <input
                  type="text"
                  className="p-0.5 border-none rounded-lg focus:outline-none focus:border-blue-500 w-full"
                  placeholder="Enter your name"
                />
              </Form.Item>
              <Form.Item
                name="email"
                className="border p-1 rounded-lg focus:outline-none focus:border-blue-500"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Invalid email address" },
                ]}
              >
                <input
                  type="email"
                  className="p-1 border-none rounded-lg focus:outline-none focus:border-blue-500 w-full"
                  placeholder="Enter your email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                className="border p-1 rounded-lg focus:outline-none focus:border-blue-500"
                rules={[
                  { required: true, message: "Please enter your password" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              >
                <input
                  type="password"
                  className="border-none p-1 rounded-lg focus:outline-none focus:border-blue-500 w-full"
                  placeholder="Enter your password"
                />
              </Form.Item>
              <Form.Item
                name="password_confirmation"
                className="border p-1 rounded-lg focus:outline-none focus:border-blue-500"
                rules={[
                  { required: true, message: "Please confirm your password" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              >
                <input
                  type="password"
                  className="border-none p-1 rounded-lg focus:outline-none focus:border-blue-500 w-full"
                  placeholder="Confirm your password"
                />
              </Form.Item>
              <button
                className="bg-slate-700 text-white p-2 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                type="submit"
                disabled={loading} // Disable button when loading
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </Form>
            <div className="flex gap-1 mt-1">
              <p>Already have an account?</p>
              <Link to="/Login" className="text-blue-700">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
