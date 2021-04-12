import React, { useContext, useEffect, useRef, useState } from "react";
import { Utils } from "../utils/Utils";

const ListVariablesContext = React.createContext();
const ListFunctionsContext = React.createContext();
export const useListVariables = () => useContext(ListVariablesContext);
export const useListFunctions = () => useContext(ListFunctionsContext);

export const ListProvider = ({ children }) => {
  const [list, setList] = useState(Utils.getStorage());
  const [name, setName] = useState("");
  const [alert, setAlert] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [listFromFile, setListFromFile] = useState(null);

  const realBtnRef = useRef();
  const [customTxt, setCustomTxt] = useState("No file choosen, yet");

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const deleteItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    let selectedItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setName(selectedItem.title);
    setSelectedID(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameChecker = Utils.checkName(name);
    const editConditions = isEditing && selectedID;

    if (nameChecker.hasError) {
      showAlert(true, "danger", nameChecker.errorMsg);
      return;
    }

    if (editConditions) {
      setList(
        list.map((item) => {
          if (item.id === selectedID) {
            item.title = name;
            return item;
          }
          return item;
        })
      );

      setSelectedID(null);
      setName("");
      setIsEditing(false);
      showAlert(true, "success", "Item has been edited.");
      return;
    }

    Utils.addItem(setList, name);
    setName("");
    showAlert(true, "success", "Item has been added.");
  };

  const downloadFile = (filename, data) => {
    const listChecker = Utils.checkList(data);
    if (listChecker.hasError) {
      showAlert(true, "danger", listChecker.errorMsg);
      return;
    }

    Utils.getFile(filename, data);
  };

  const setCustomFileLabel = () => {
    const fileHasBeenChoosed = realBtnRef.current.value;
    if (fileHasBeenChoosed) {
      setCustomTxt(realBtnRef.current.value.match(/[\\]([\w\d\s.\-()]+)$/)[1]);
    }
  };

  const handleFileChange = (e) => {
    setCustomFileLabel();
    Utils.setUpList(e, setListFromFile);
  };

  const submitFile = () => {
    try {
      let newList = JSON.parse(listFromFile);
      if (Utils.isListOK(newList)) {
        setList(newList);
        showAlert(true, "success", "List has been uploaded successfully.");
        return;
      }

      showAlert(
        true,
        "danger",
        "List is incorrect, please check the file and try again."
      );
    } catch (error) {
      showAlert(
        true,
        "danger",
        "Type of file is not JSON, please check a file, and try again."
      );
    }
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (!listFromFile) {
      showAlert(true, "danger", "There is no file, please choose it first.");
      return;
    }
    submitFile();
  };

  return (
    <ListVariablesContext.Provider
      value={{
        list,
        alert,
        realBtnRef,
        customTxt,
        name,
        isEditing,
        selectedID,
      }}
    >
      <ListFunctionsContext.Provider
        value={{
          handleFileChange,
          handleFileSubmit,
          downloadFile,
          handleSubmit,
          setName,
          setList,
          showAlert,
          deleteItem,
          editItem,
        }}
      >
        {children}
      </ListFunctionsContext.Provider>
    </ListVariablesContext.Provider>
  );
};
