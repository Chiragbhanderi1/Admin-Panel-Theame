import React from "react";

export const TabSelector = ({
  isActive,
  children,
  onClick,
}) => (
  <button
    style={{ width: "50%" }}
    className={`${
      isActive
        ? "selected-tab"
        : "unselected-tab"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);
