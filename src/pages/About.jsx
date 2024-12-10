import React from "react";
import { motion } from "framer-motion";
import hero1 from "../images/hero_bg_1.jpg"
import hero2 from "../images/hero_bg_2.jpg"
import Navbar from "../components/Navbar"
import MyCampany from "./MyCompany"
import Footer from "../components/Footer"

function About() {
  return (
    <div className="bg-gray-50">
      <Navbar />
      {/* Header Section */}
      <header className="bg-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-xl font-bold">Home / About Us</h1>
        </div>
      </header>

      {/* Property Selling Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          {/* Images Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            <img
              src={hero1}
              alt="Property 1"
              className="rounded-lg shadow-lg"
            />
            <img
              src={hero2}
              alt="Property 2"
              className="rounded-lg shadow-lg"
            />
            <img
              src={hero1}
              alt="Property 3"
              className="col-span-2 rounded-lg shadow-lg"
            />
          </motion.div>

          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Property Selling
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              venenatis erat id nunc suscipit, a bibendum risus facilisis. Sed
              vehicula nisi nec felis tincidunt, sit amet posuere erat aliquet.
            </p>
            <button className="px-6 py-2 bg-slate-800 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300">
              Learn More
            </button>
          </motion.div>
        </div>
      </section>
      <MyCampany />

      {/* Why Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Us</h2>
          <p className="text-gray-600 mb-8">
            Best real estate agents you will ever see in your life. If you
            encounter any problems, do not hesitate to knock on our agents.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: "Wide Range of Properties", icon: "🏠" },
              { title: "Finest Community", icon: "🌟" },
              { title: "Investment", icon: "💼" },
              { title: "Homes That Match", icon: "🏡" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition transform"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

export default About;
