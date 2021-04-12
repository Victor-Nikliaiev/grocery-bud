import React from "react";
import Alert from "./Alert";
import { IoIosBasket } from "react-icons/io";
import { useListVariables } from "../providers/ListProvider";

const Header = () => {
  const { alert } = useListVariables();
  return (
    <header>
      {alert.show && <Alert />}
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
