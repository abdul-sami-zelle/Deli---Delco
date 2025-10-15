import React from "react";
import "./style.css"; 

export default function CheckBoxOpt1({label}) {
  return (
    <div className="checkbox-wrapper-65">
      <label htmlFor="cbk1-65">
        <input type="checkbox" id="cbk1-65" />
        <span className="cbx">
          <svg width="12px" height="11px" viewBox="0 0 12 11">
            <polyline points="1 6.29411765 4.5 10 11 1"></polyline>
          </svg>
        </span>
        <h5>{label}</h5>
      </label>
    </div>
  );
}
