import React from 'react';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";

const Explore = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Explore</h1>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScD23KyrhMEsaX7xtYVNcw-_FkEE04qsyIwIqD73YWcOyH8xw/viewform?embedded=true"
            width="640"
            height="1277"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            className="w-full"
          >
            Loading…
          </iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Explore;