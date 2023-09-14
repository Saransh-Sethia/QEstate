import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({onPage}) => {
  let navigate = useNavigate();

  const handleNavigate1 = () => {
    navigate('/listings')
  }

  const handleNavigate2 = () => {
    navigate('/')
  }
  
  return (
    <div className="header">
      <div className="logo" onClick={()=>handleNavigate2()}>QEstate</div>
{
    onPage === "home" ? (
        <div className='nav-link'>
            <span onClick={() => handleNavigate1()}>Explore</span>
            </div>
    ) : onPage === "explore" ? (
      <div className='nav-link'>
      <span onClick={() => handleNavigate2()}>Featured Listings</span>
      </div>
    ) : (
      <div className='nav-list'>
        <div className='nav-link' onClick={()=>navigate('/')}>Featured</div>  
        <div className='nav-link' onClick={()=>navigate('/listings')}>Explore</div> 
      </div>
    )
}
    </div>
  )
}

export default Header
