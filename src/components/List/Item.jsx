import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  useListFunctions,
  useListVariables,
} from "../../providers/ListProvider";

const Item = ({ item }) => {
  const { isEditing, selectedID } = useListVariables();
  const { deleteItem, editItem, showAlert } = useListFunctions();
  const handleDeleteOnClick = (id) => {
    deleteItem(id);
    showAlert(true, "danger", "Item has been removed.");
  };

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
        <button
          className="deleteBtn"
          onClick={() => handleDeleteOnClick(item.id)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default Item;
