import { useEffect, useState, useRef } from "react";
import List from "./components/List/List";
import Alert from "./components/Alert";
import Form from "./components/Form";
import { IoIosBasket } from "react-icons/io";
import { GoCloudDownload, GoCloudUpload } from "react-icons/go";
import { BiSelectMultiple } from "react-icons/bi";

const getStorage = () => {
  const local = JSON.parse(localStorage.getItem("list"));
  if (!local) {
    return [];
  }
  return local;
};
function App() {
  const [list, setList] = useState(getStorage());
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
    showAlert(true, "danger", "Item has been removed.");
  };

  const editItem = (id) => {
    let selectedItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setName(selectedItem.title);
    setSelectedID(id);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "Field cannot be empty.");
      return;
    }

    if (name.length > 30) {
      showAlert(true, "danger", "Field cannot be more than 30 characters");
      return;
    }

    if (isEditing && selectedID) {
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

    setList((prev) => [
      ...prev,
      { id: new Date().getTime().toString(), title: name },
    ]);
    setName("");
    showAlert(true, "success", "Item has been added.");
  };

  const downloadFile = (filename, data) => {
    if (JSON.parse(data).length === 0) {
      showAlert(
        true,
        "danger",
        "The list is empty, nothing is to download, try to add some items."
      );
      return;
    }

    try {
      let a = document.createElement("a");
      let file = new Blob([data], { type: "application/json" });
      a.href = URL.createObjectURL(file);
      a.download = filename;
      a.click();
    } catch (error) {
      console.log("ERROR: in DownloadFile :D");
    }
  };

  const handleFileChange = (e) => {
    // e.preventDefault();

    if (realBtnRef.current.value) {
      setCustomTxt(realBtnRef.current.value.match(/[\\]([\w\d\s.\-()]+)$/)[1]);
    }

    try {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        // console.log(reader.result);
        setListFromFile(reader.result);
      };
      reader.readAsText(file);
    } catch (error) {
      console.log("ERROR: in HandleFileChange");
    }
  };

  const areListOk = (settings) => {
    let isOk = true;
    settings.forEach((item) => {
      if (!item.id || !item.title) {
        isOk = false;
      }
    });
    return isOk;
  };
  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (!listFromFile) {
      showAlert(true, "danger", "There is no file, please choose it first.");
      return;
    }

    try {
      let newList = JSON.parse(listFromFile);
      if (newList.length === 0 || areListOk(newList)) {
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

  return (
    <div className="section-center">
      {alert.show && <Alert alert={alert} removeAlert={showAlert} />}
      <h1>
        <span>
          <IoIosBasket />
        </span>
        Grocery Bud{" "}
      </h1>

      <div>
        <p className="fileIntro">You can download or upload, your list</p>
        <button
          onClick={() =>
            downloadFile("itemsList.json", localStorage.getItem("list"))
          }
          className="fileBtn"
        >
          <GoCloudDownload />
          <span>download the list</span>
        </button>

        {/*//////////// Upload Form */}
        <form onSubmit={(e) => handleFileSubmit(e)}>
          <input
            ref={realBtnRef}
            type="file"
            accept="application/JSON"
            id="realFileBtn"
            onChange={(e) => handleFileChange(e)}
            className="inputFile"
          />
          <div className="fileGroup">
            <button
              type="button"
              id="custom-button"
              onClick={(e) => {
                realBtnRef.current.click();
              }}
              className="fileBtn"
            >
              <BiSelectMultiple />
              <span>choose a list</span>
            </button>
            <span id="custom-text">{customTxt}</span>
            <button type="submit" className="fileBtn">
              <GoCloudUpload />
              <span>upload a list</span>
            </button>
          </div>
        </form>
        {/* ////////////// End Upload Form */}
      </div>

      <Form
        onSubmit={handleSubmit}
        name={name}
        setName={setName}
        isEditing={isEditing}
      />
      {list.length !== 0 && (
        <List
          list={list}
          deleteItem={deleteItem}
          editItem={editItem}
          isEditing={isEditing}
          selectedID={selectedID}
          setList={setList}
          showAlert={showAlert}
        />
      )}
    </div>
  );
}

export default App;
