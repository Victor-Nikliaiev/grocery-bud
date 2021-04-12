import React from "react";
import Item from "./Item";
import { ImFilesEmpty } from "react-icons/im";
import {
  useListFunctions,
  useListVariables,
} from "../../providers/ListProvider";

const List = () => {
  const { list } = useListVariables();
  const { setList, showAlert } = useListFunctions();

  return (
    <>
      <h2>items:</h2>
      <div className="items-group">
        {list.map((item) => {
          return <Item key={item.id} item={item} />;
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
