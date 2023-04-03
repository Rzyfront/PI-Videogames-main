import React from "react";
import "./Loading.css";

export const Loading = ({ color = "#000" }) => {
  return (
    <div className="spinner-container Loading">
      <div className="spinner" style={{ borderTopColor: color }} />
    </div>
  );
};
