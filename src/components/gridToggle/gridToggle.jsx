"use client";
import "./style.css";
import { FaBars, FaThLarge } from "react-icons/fa";

export default function GridToggle({
  activeView = 2,
  onOneColumn,
  onTwoColumn,
}) {
  return (
    <div className="grid-toggle">
      <button
        className={`toggle-btn ${activeView === 1 ? "active" : ""}`}
        onClick={onOneColumn}
      >
        <FaBars />
      </button>

      <button
        className={`toggle-btn ${activeView === 2 ? "active" : ""}`}
        onClick={onTwoColumn}
      >
        <FaThLarge />
      </button>
    </div>
  );
}