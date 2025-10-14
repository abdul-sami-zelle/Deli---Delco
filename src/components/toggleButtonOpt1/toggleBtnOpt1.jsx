import React from "react";
import "./style.css";

export default function ToggleBtnOpt1({ label }) {
  return (
    <label className="checkbox-wrapper-2">
      <input type="checkbox" className="sc-gJwTLC ikxBAC" />
      <h5 className="toggle-label">{label}</h5>
    </label>
  );
}
