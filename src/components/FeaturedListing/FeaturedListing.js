import React, { useState, useEffect } from "react";
import "./FeaturedListing.css";
import axios from "axios";
import config from "../config";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import  CardActionArea  from '@mui/material/CardActionArea';

const FeaturedListing = () => {
  const [listingData, setListingData] = useState([]);

  const fetchListings = async () => {
    try {
      const response = await axios.get(
        `${config.backendEndpoint}/real-estate-data`
      );
      const data = response.data.listings
      setListingData(data.slice(0,8));
    } catch (e) {
      setListingData([]);
      console.log("error", e);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  {listingData.length === 0 ? (
    <Grid item>
      <div className='error-message'>
      <p>No Featured Listing Found</p>
      </div>
    </Grid>
  ):(
    listingData.map((ele, index) => (
      <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`/assets/real-estate-${index}.jpg`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
{ele.property_name.slice(0,6)}
        </CardContent>
        <CardActions>
          <div className="listing-detail">
            <span className="property-price">Rs{ele.price}</span>
            <span className="property-city">{ele.city.slice(0,5)}</span>
          </div>
        </CardActions>
      </CardActionArea>
    </Card>
    </Grid> 
    ))

  )}
      </Grid>
    </Box>
  )
};

export default FeaturedListing;
