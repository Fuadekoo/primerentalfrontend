import React from 'react'
import HousesList from '../components/HousesList';
import ExplorePage from "./ExplorePage";
import Footer from "../components/Footer";

function AuthHome() {
  return (
    <div>
        <HousesList />
        <ExplorePage /> 
        <Footer />
    </div>
  )
}

export default AuthHome
