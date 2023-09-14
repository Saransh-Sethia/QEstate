import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SortingFilter = ({sortBy, handleSortByChange}) => {
  const options = ["none", "price", "date"];
  return (
    <div className="sorting-filter-container">
      <h2>Sort By:</h2>
      <Box sx={{ minWidth: 120 }}>
        <FormControl sx={{width: "300px"}} size="small">

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
              value={sortBy}
            label="Age"
              onChange={handleSortByChange}
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option && option[0].toUpperCase() + option.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default SortingFilter;
