import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import contactImage from "../images/contact.jpg"; // Adjust the path as necessary

const Contacts = () => {
  const form = useRef();
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!form.current.name.value.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!form.current.email.value.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!form.current.project.value.trim()) {
      newErrors.project = "Project description is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // If the form is not valid, return early
    }

    const formData = {
      name: form.current.name.value,
      email: form.current.email.value,
      project: form.current.project.value,
    };

    emailjs
      .send(
        "service_u3hi3gs",
        "template_rxyyv74",
        formData,
        "g7nkkRf8lv62395-c"
      )
      .then(
        (result) => {
          setSuccessMessage("Message sent successfully!");
          toast.success("Message sent successfully!");
          e.target.reset();
        },
        (error) => {
          toast.error("Failed to send the message");
          console.log(error.text);
        }
      );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <section className="flex-grow py-16" id="contact">
        <h2 className="text-4xl font-bold text-center mb-4">Get In Touch</h2>
        <span className="text-xl text-center block mb-8">
          Contact Prime Rental
        </span>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Talk To PrimeRental</h3>

            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <div className="container mx-auto mt-8">
                  {/* <img src="/pp.png" alt="Prime Rental Logo" className="w-full h-auto rounded-lg shadow-md mb-4" /> */}
                  <img
                    src={contactImage}
                    alt="Contact"
                    className="rounded-lg shadow-md w-40 h-40 mx-auto"
                  />
                </div>
                <i className="bx bx-phone text-2xl text-blue-500"></i>

                <h3 className="text-xl font-semibold mt-2">Call</h3>
                <span className="text-gray-600">+251-933571691</span>
                <h3 className="text-xl font-semibold mt-2">Mail Us</h3>
                <span className="text-gray-600">
                  natnaelyohannes1212@gmail.com
                </span>
                <a
                  href="tel:+251910737199"
                  className="text-blue-500 hover:underline mt-2 block"
                >
                  Call To Organization
                </a>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Write Your Idea</h3>

            <form ref={form} onSubmit={sendEmail} className="space-y-4">
              {successMessage && (
                <div className="text-green-500 mb-4">{successMessage}</div>
              )}
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={`mt-1 block w-full p-2 border rounded-md ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Insert your Name"
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name}</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`mt-1 block w-full p-2 border rounded-md ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Insert your email"
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email}</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="project"
                  className="block text-lg font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  name="project"
                  id="project"
                  className={`mt-1 block w-full p-2 border rounded-md ${
                    errors.project ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Write your message"
                ></textarea>
                {errors.project && (
                  <span className="text-red-500">{errors.project}</span>
                )}
              </div>
              <button className="bg-black text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200">
                Send Message
              </button>
              <ToastContainer />
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contacts;
