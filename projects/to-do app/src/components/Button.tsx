import React from "react";

type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
};

export default function Button({
  onClick,
  className = "",
  children,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-3 py-1 rounded-md text-white ${className}`}
    >
      {children}
    </button>
  );
}
