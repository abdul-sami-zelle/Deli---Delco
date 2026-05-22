import { useState } from "react";

export default function RadioButton({ id = "radio-7", name = "radio-examples", label = "Radio 7", value, checked, onChange }) {
  return (
    <div style={{ display: "inline-block" }}>
      <label
        htmlFor={id}
        style={{
          padding: "6px",
          borderRadius: "50px",
          display: "inline-flex",
          cursor: "pointer",
          transition: "background 0.2s ease",
          WebkitTapHighlightColor: "transparent",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(159,159,159,0.1)"}
        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
      >
        <input
          id={id}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          style={{
            verticalAlign: "middle",
            width: "20px",
            height: "20px",
            borderRadius: "10px",
            background: "none",
            border: "0",
            boxShadow: checked ? "inset 0 0 0 6px #4B5320" : "inset 0 0 0 1.5px #9F9F9F",
            appearance: "none",
            WebkitAppearance: "none",
            padding: "0",
            margin: "0",
            transition: "box-shadow 150ms cubic-bezier(0.95, 0.15, 0.5, 1.25)",
            pointerEvents: "none",
            cursor: "pointer",
            outline: "none",
          }}
        />
        <span
          style={{
            verticalAlign: "middle",
            display: "inline-block",
            lineHeight: "20px",
            fontSize:"12px",
            padding: "0 8px",
          }}
        >
          {label}
        </span>
      </label>
    </div>
  );
}