import React from "react";
import { Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../helpers/axiousInstance"; // Correct import
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import Navbar from "../components/Navbar";
import keyhouse from "../images/keyhouse.jpg";
import Footer from "../components/Footer";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.alerts.loading);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      // First, fetch the CSRF cookie
      await axiosInstance.get("/sanctum/csrf-cookie");

      const response = await axiosInstance.post("/login", values);

      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        dispatch(HideLoading());
        navigate("/myhome");
      } else {
        message.error(response.data.message);
        dispatch(HideLoading());
      }
    } catch (error) {
      dispatch(HideLoading());
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message.error(error.response.data.message);
      } else {
        message.error(error.message);
      }
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className="py-16">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div
            className="hidden lg:block lg:w-1/2 bg-cover bg-center object-contain"
            style={{ backgroundImage: `url(${keyhouse})` }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <h1 className="text-3xl text-center font-semibold my-7">Login</h1>
            <Form
              layout="vertical"
              onFinish={onFinish}
              className="flex flex-col gap-2"
            >
              <Form.Item
                name="email"
                className="border p-1 rounded-lg focus:outline-none focus:border-blue-500"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Email is invalid" },
                ]}
              >
                <input
                  type="email"
                  className="border-none p-2 rounded-lg focus:outline-none focus:border-blue-500 w-full"
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
                  className="border-none p-2 rounded-lg focus:outline-none focus:border-blue-500 w-full"
                  placeholder="Enter your password"
                />
              </Form.Item>
              <button
                className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:bg-green-600 disabled:opacity-80"
                type="submit"
                disabled={loading}
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </Form>
            <div className="flex gap-2 mt-5">
              <p>Don't have an account?</p>
              <Link to="/Register" className="text-blue-700">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
