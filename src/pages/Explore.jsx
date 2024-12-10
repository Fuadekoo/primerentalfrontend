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
            src="https://docs.google.com/forms/d/e/1FAIpQLSd8E6H4PH0sWzCPAL6nou-Kno_YAJ4Tp-jNARGEAEzL1EE1yw/viewform?embedded=true"
            width="100%"
            height="1593"
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