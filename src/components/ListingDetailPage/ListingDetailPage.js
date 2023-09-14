import React, { useEffect, useState } from "react";
import "./ListingDetailPage.css";
import Header from "../Header/Header";
import config from "../config";
import axios from "axios";
import { useParams } from "react-router-dom";

const ListingDetailPage = () => {
  const [property, setProperty] = useState(null);

  const { property_id } = useParams();
  const fetchListings = async () => {
    try {
      const response = await axios.get(
        `${config.backendEndpoint}/real-estate-data`
      );
      const data = response.data.listings;
      setProperty(data.find((ele) => ele.property_id === Number(property_id)));
    } catch (err) {
      setProperty(null);
      console.log("error", err);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <>
      <Header />

      <div className="details-page-container">
        {property ? (
          <>
            <div className="image-container">
              <img
                src="/assets/real-estate-detail.jpg"
                alt={"real-estate-img"}
              />
            </div>
            <div className="property-detail">
              <h1>{property.property_name}</h1>
              <div className="property-description">
                {property.description} Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur.
              </div>
              <div className="agent-details">
              <h2 className="agent-details-header">Contact</h2>
              <div className="agent-details-content">
                <span className="title">Agent Name: </span>
                <span>John Smith</span>
                <span className="title">Email: </span>
                <span>johnsmith@gmail.com</span>
              </div>
            </div>
            </div>
          </>
        ) : (
          <div> Details Unavailabe at the moment </div>
        )}
      </div>
    </>
  );
};

export default ListingDetailPage;
