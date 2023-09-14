import React, { useEffect, useState } from "react";
import "./Explore.css";
import Header from "../Header/Header";
import axios from "axios";
import config from "../config";
import CheckBoxFilter from "../CheckBoxFilter/CheckBoxFilter";
import SortingFilter from "../SortingFilter/SortingFilter";
import ListingTableView from "../ListingTableView/ListingTableView";

const Explore = () => {
  //states
  const [listingData, setListingData] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);
  const [priceRangeFilter, setPriceRangeFilter] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const fetchListings = async () => {
    try {
      const response = await axios.get(
        `${config.backendEndpoint}/real-estate-data`
      );
      setListingData(response.data.listings);
    } catch (error) {
      console.log("error", error);
    }
  };

    //useEffect
    useEffect(() => {
      fetchListings();
    }, []);

  //Handle Filters
  const handleLocationFilterChange = (event) => {
    const isChecked = event.target.checked;
    //if the location filter is checked, then add it to the locationFilter State
if(isChecked){
    setLocationFilter((prevState)=> [...prevState, event.target.value])
}
    //if the location filter is not checked, then remove it from the locationFilter State
    else 
    {
        setLocationFilter((prevState) => prevState.filter((item) => item !== event.target.value))
    }
  };

  const handlePriceRangeFilterChange = (event) => {
    const isChecked = event.target.checked;
    //if the price filter is checked, then add it to the priceFilter State
    if(isChecked){
        setPriceRangeFilter((prevState) => [...prevState, event.target.value])
    }

    //if the price filter is not checked, then remove it from the priceFilter State
    else 
    {
        setPriceRangeFilter((prevState) => prevState.filter((item) => item !== event.target.value))
    }
  };

  const handleSortByChange = (event) => {
    //if a dropdown is selected, then add it to the sortBy state
    setSortBy(event.target.value)
  };


  return (
    <>
      {/* Header */}
      <Header onPage='explore'/>

      <div className="property-listings-view">
        {/* CheckBoxFilters */}
        <CheckBoxFilter 
        locationFilter={locationFilter}
        priceRangeFilter={priceRangeFilter}
        handleLocationFilterChange={handleLocationFilterChange}
        handlePriceRangeFilterChange={handlePriceRangeFilterChange}
        />

        {/* sortingFilters */}
        <SortingFilter 
        sortBy={sortBy}
        handleSortByChange={handleSortByChange}/>

        {/* ListingTable */}
        <ListingTableView
        listingData={listingData}
        priceRangeFilter={priceRangeFilter}
        locationFilter={locationFilter}
        sortBy={sortBy } />
      </div>
    </>
  );
};

export default Explore;
