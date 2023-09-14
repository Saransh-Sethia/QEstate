import React from "react";

const CheckBoxFilter = ({
  handleLocationFilterChange,
  handlePriceRangeFilterChange,
  locationFilter,
  priceRangeFilter
}) => {
  const locations = ["Sintra", "Amper", "Świnna", "Hanji"];
  const prices = ["0-300000", "300001-600000", "600001-1000000"];
  return (
    <div className="checkbox-filter-container">
      {/* LOCATION BASED FILTERS */}
      <div className="filter">
        <h2>Location</h2>
        {locations.map((location, index) => (
          <div key={index}>
            <input
              type="checkbox"
              value={location}
              checked={locationFilter.includes(location)}
              onChange={handleLocationFilterChange}
            />
            <label>{location}</label>
          </div>
        ))}
      </div>

      {/* CLASS BASED FILTERS */}
      <div className="filter">
        <h2>Price</h2>
        {prices.map((price, index) => (
          <div key={index}>
            <input
              type="checkbox"
              value={price}
              checked={priceRangeFilter.includes(price)}
              onChange={handlePriceRangeFilterChange}
            />
            <label>{price}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckBoxFilter;
