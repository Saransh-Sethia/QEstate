import React from 'react';
import './LandingPage.css'
import Header from '../Header/Header';
import HeroSection from '../HeroSection/HeroSection';
import FeaturedListing from '../FeaturedListing/FeaturedListing';
import Footer from '../Footer/Footer';

const LandingPage = () => {
  return (
    <div className="landing-page-container">
     <Header onPage="home" />

    <HeroSection />

<div className='card-container'>
  <h1 className='featured-listing-title'>
    Here are some of our featured listings:
  </h1>
  <FeaturedListing/>
</div>
    < Footer />
    </div>
  )
}

export default LandingPage
