import React from 'react';
import './LandingPage.css'
import Header from '../Header/Header';
import HeroSection from '../HeroSection/HeroSection';
import FeaturedListing from '../FeaturedListing/FeaturedListing';

const LandingPage = () => {
  return (
    <div className="landing-page-container">
     <Header onPage="home" />

    <HeroSection />

     <FeaturedListing/>

     {/* Footer */}
    </div>
  )
}

export default LandingPage
