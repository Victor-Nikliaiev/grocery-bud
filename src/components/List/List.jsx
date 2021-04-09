import React from "react";
import Item from "./Item";
import { ImFilesEmpty } from "react-icons/im";

const List = ({
  list,
  deleteItem,
  editItem,
  isEditing,
  selectedID,
  setList,
  showAlert,
}) => {
  return (
    <>
      <h2>items:</h2>
      <div className="items-group">
        {list.map((item) => {
          return (
            <Item
              key={item.id}
              item={item}
              deleteItem={deleteItem}
              editItem={editItem}
              isEditing={isEditing}
              selectedID={selectedID}
            />
          );
        })}
      </div>
      <button
        className="deleteAllbtn"
        data-tooltip="Remove all"
        onClick={() => {
          setList([]);
          showAlert(true, "danger", "All items have been removed.");
        }}
      >
        <ImFilesEmpty />
      </button>
    </>
  );
};

export default List;
