import React from 'react';
import HousesList from '../components/HousesList';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Filter from '../components/Filter';
import Slider from '../components/Slider';
import ExplorePage from "../pages/ExplorePage";

function Home() {
  return (
    <div>
        <Navbar />  
        <Filter />
        <HousesList />
        <ExplorePage /> 
        <Footer />
    </div>
  );
}

export default Home;