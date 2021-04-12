import React, { useEffect } from "react";
import { useListFunctions, useListVariables } from "../providers/ListProvider";

const Alert = () => {
  const { alert } = useListVariables();
  const { showAlert: removeAlert } = useListFunctions();

  useEffect(() => {
    const time = setTimeout(() => {
      removeAlert();
    }, 3000);

    return () => clearTimeout(time);
  }, [alert, removeAlert]);
  return (
    <p className={`alert ${alert.type === "danger" ? "danger" : "success"}`}>
      {alert.msg}
    </p>
  );
};

export default Alert;
