import React from "react";
import "./style.css";

export default function CheckboxOpt2({ label = "Radio 7", name = "radio-examples", id = "example-7" }) {
  return (
    <div className="radio-wrapper-7">
      <label className="radio-wrapper-7" htmlFor={id}>
        <input id={id} type="checkbox" name={name} />
        <span>{label}</span>
      </label>
    </div>
  );
}
