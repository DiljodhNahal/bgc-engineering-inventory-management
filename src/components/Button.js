import React from "react";

import "../styles/components/Button.css";
import { ClipLoader } from "react-spinners";

const Button = ({ children, onClick, size, loading = false }) => {
  let sizeClass = "button-md";
  if (size) {
    switch (size.toLowerCase()) {
      case "large":
        sizeClass = "button-lg";
        break;
      case "small":
        sizeClass = "button-sm";
        break;
      case 'xs':
        sizeClass = "button-xs";
        break;
    }
  }

  const getText = () => {
    if (loading === true)
      return <ClipLoader color={"#ffffff"} loading={true} size={50} />;

    return children;
  };

  return (
    <div onClick={onClick} className={`button ${sizeClass}`}>
      {getText()}
    </div>
  );
};

export default Button;
