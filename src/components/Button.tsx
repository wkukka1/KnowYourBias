import React, { ReactNode } from "react";
import "./Button.css";

interface Props {
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  buttonStyle?: "btn--primary" | "btn--outline";
  buttonSize?: "btn--medium" | "btn--large";
}

function Button({
  children,
  type = "button",
  onClick,
  buttonStyle = "btn--primary",
  buttonSize = "btn--medium",
}: Props) {
  return (
    <>
      <button
        className={`btn ${buttonStyle} ${buttonSize}`}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
}

export default Button;
