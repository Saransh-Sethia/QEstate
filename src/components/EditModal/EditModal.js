import React,{useState} from "react";
import './EditModal.css'

const EditModal = ({editingItem, handleEditSave, handleCloseEditModal}) => {

    const [editedItem, setEditedItem] = useState({...editingItem});

   const handleInputChange = (event) => {
        const {name, value} = event.target;
 setEditedItem((prevItem) => ({...prevItem, [name]: value})) 
    }

    const handleSaveClick = () => {
handleEditSave(editedItem);
handleCloseEditModal();
    }
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Property</h2>
        <label>Property Name</label>
        <input type="text" name="property_name" value={editedItem.property_name} onChange={handleInputChange} />
        <label>Price</label>
        <input type="text" name="price" value={editedItem.price} onChange={handleInputChange} />
        <label>Address</label>
        <input type="text" name="address" value={editedItem.address} onChange={handleInputChange} />

        <div className="modal-buttons">
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCloseEditModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
