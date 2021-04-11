import React from "react";
import Alert from "./Alert";
import { IoIosBasket } from "react-icons/io";

const Header = ({ alert, showAlert }) => {
  return (
    <header>
      {alert.show && <Alert alert={alert} removeAlert={showAlert} />}
      <h1>
        <span>
          <IoIosBasket />
        </span>
        Grocery Bud{" "}
      </h1>
    </header>
  );
};

export default Header;
