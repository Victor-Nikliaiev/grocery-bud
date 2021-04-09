import React, { useEffect } from "react";

const Alert = ({ alert, removeAlert }) => {
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
