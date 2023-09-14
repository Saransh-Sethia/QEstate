import React, { useEffect, useState } from "react";
import "./ListingTableView.css";
import {AiFillDelete} from 'react-icons/ai';
import {BiSolidEdit} from 'react-icons/bi'
import { selectClasses } from "@mui/material";
import EditModal from "../EditModal/EditModal";

const ListingTableView = ({
  listingData,
  priceRangeFilter,
  locationFilter,
  sortBy,
}) => {
  //STATES
  //currentPage
  //filteredData
  //selectedRows

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editingItem, setEdititngItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  let itemsPerPage = 10;
  const isAllSelected = selectedRows.length === itemsPerPage;

  //Editing Functions
const handleEdit = (item) => {
  setEdititngItem(item);
  setIsEditModalOpen(true);
}

const handleEditSave = (editedItem) => {
  const updatedData = [...filteredData];

  const indexToBeEdited = updatedData.findIndex((item) => item.property_id === editedItem.property_id)

  if(indexToBeEdited !== -1) {
    updatedData[indexToBeEdited] = editedItem;
    setFilteredData(updatedData);
    
  }
  setEdititngItem(null)
};

const handleCloseEditModal = () => {
  setIsEditModalOpen(false);
  setEdititngItem(null);
};
  //DELETE
  const handleDelete = (id) => {
    const updatedData = filteredData.filter((ele) => ele.property_id !== id);

    const updatedTotalPages = Math.ceil(updatedData.length / itemsPerPage);

    if(currentPage > updatedTotalPages){
      setCurrentPage(updatedTotalPages);
    }
    setFilteredData(updatedData)
    setSelectedRows([]);
  }
  
  const handleDeleteSelectedAll = () => {
    if(selectedRows.length === 0)
    return;

    const updatedData = filteredData.filter((property) => !selectedRows.includes(property.property_id));
    const updatedTotalPages = Math.ceil(updatedData.length / itemsPerPage);
    if(currentPage > updatedTotalPages) {
      setCurrentPage(updatedTotalPages)
    }
    setFilteredData(updatedData);
    setSelectedRows([]);
  }
  //CHECKBOX HANDLERS
  const handleRowCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;
    //if the item is checked, then add it to the selectedRow State
    if (isChecked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      //if the item is not checked, then remove it from the selectedRow State
      setSelectedRows(selectedRows.filter((item) => item !== id));
    }
  };

  const handleSelectAll = (event, displayData) => {
    const isAllChecked = event.target.checked;

    if (isAllChecked) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      let rowsSelected = [];
      for (let i = startIndex; i < startIndex + itemsPerPage; i++) 
        if (i < displayData.length) {
          rowsSelected.push(displayData[i].property_id);
        } else {
          rowsSelected.push(Math.random());
        }
      
      setSelectedRows(rowsSelected);
    } else {
      setSelectedRows([]);
    }
  };

  //PAGINATION HANDLERS
  const handleFirstPage = () => {
    setCurrentPage(1);
    setSelectedRows([]);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
    setSelectedRows([]);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    setSelectedRows([]);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
    setSelectedRows([]);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    setSelectedRows([]);
  };

  //NORMAL METHODS

  //Apply all the selected filters
  const applyFilters = (filteredData, location, priceRange, sortBy) => {
    let updatedData = [...filteredData]; //create a copy

    if (location.length) {
      updatedData = updatedData.filter((listing) =>
        locationFilter.includes(listing.city)
      );
    }

    if (priceRange.length) {
      updatedData = updatedData.filter((listing) => {
        let found = false;
        priceRange.forEach((rangeEntry) => {
          let low = rangeEntry.split("-")[0];
          let high = rangeEntry.split("-")[1];
          if (
            Number(listing.price) >= Number(low) &&
            Number(listing.price) <= Number(high)
          )
            found = true;
        });
        return found;
      });
    }

    if (sortBy === "price") {
      updatedData.sort(
        (firstListing, secondListing) =>
          firstListing.price - secondListing.price
      );
    } else if (sortBy === "date") {
      updatedData.sort(
        (firstListing, secondListing) =>
          new Date(firstListing.listing_date) -
          new Date(secondListing.listing_date)
      );
    }
    console.log("Updated Data", updatedData);
    return updatedData;
  };
  let displayData = applyFilters(
    filteredData,
    locationFilter,
    priceRangeFilter,
    sortBy
  );

  //VARIABLES

  let totalPages = Math.ceil(displayData.length / itemsPerPage);
  let startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;

  //Handle Page numbers along with filter

  const getPageNumbers = (totalPages) => {
    const pageNumbers = [];
    for (let currPage = 1; currPage <= totalPages; currPage++) {
      pageNumbers.push(currPage);
    }
    return pageNumbers;
  };
  const pageNumbers = getPageNumbers(totalPages);

  // USE-EFFECTS

  useEffect(() => {
    setFilteredData(listingData);
  }, [listingData]);

  useEffect(()=>{
    setCurrentPage(1);
    setSelectedRows([]);
  },[locationFilter, priceRangeFilter])

  return (
    <div className="listings-table-container">
      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={(event) => handleSelectAll(event, displayData)}
              />
            </th>
            <th>Property Name</th>
            <th>Price</th>
            <th>Address</th>
            <th>Listing Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {displayData.slice(startIndex, endIndex).map((items, index) => (
            <tr className="table-row">
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(items.property_id)}
                  onChange={(event) =>
                    handleRowCheckboxChange(event, items.property_id)
                  }
                />
              </td>
              <td className="property_name">{items.property_name}</td>
              <td>₹ {items.price}</td>
              <td>{items.address}</td>
              <td>{items.listing_date}</td>
              <td className="action-items">
              <AiFillDelete onClick={()=>handleDelete(items.property_id)}/>
              <BiSolidEdit onClick={()=>handleEdit(items)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TABLE FOOTER */}
      <div className="table-footer">
        <button onClick={handleDeleteSelectedAll}>Delete Selected</button>
        <div className="pagination-container">
          <span>
            Page {totalPages < 1 ? 0 : currentPage} of {totalPages}
          </span>
          <div className="pagination">
            <button onClick={handleFirstPage} disabled={currentPage === 1}>
              First
            </button>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            {pageNumbers.map((page) => (
              <button key={page} onClick={() => handlePageClick(page)}>
                {page}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <button
              onClick={handleLastPage}
              disabled={currentPage === totalPages}
            >
              Last
            </button>
          </div>
        </div>
      </div>
      {isEditModalOpen && (
       <EditModal 
       editingItem={editingItem} 
       handleEditSave={handleEditSave}
       handleCloseEditModal={handleCloseEditModal}/> 
      )}
    </div>
  );
};

export default ListingTableView;
