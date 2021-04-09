import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Item = ({ item, deleteItem, editItem, isEditing, selectedID }) => {
  return (
    <div
      className={`item-group ${
        isEditing && item.id === selectedID ? "editing" : ""
      }`}
    >
      <h3>{item.title}</h3>
      <div className="btn-group">
        <button className="editBtn" onClick={() => editItem(item.id)}>
          <FaEdit />
        </button>
        <button className="deleteBtn" onClick={() => deleteItem(item.id)}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default Item;
