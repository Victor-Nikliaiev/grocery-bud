import { useEffect, useState } from "react";
import List from "./components/List/List";
import Alert from "./components/Alert";
import Form from "./components/Form";
import { IoIosBasket } from "react-icons/io";

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

  return (
    <div className="section-center">
      {alert.show && <Alert alert={alert} removeAlert={showAlert} />}
      <h1>
        <span>
          <IoIosBasket />
        </span>
        Grocery Bud{" "}
      </h1>
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
