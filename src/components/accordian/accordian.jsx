import React, { useState } from "react";
import { FaPlus ,FaMinus} from "react-icons/fa6";
import "./style.css";

export default function AccordionFilter({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion_filter_section">
      <div
        className="accordion_header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4>{title}</h4>
        <span className={`accordion_icon `}>
          {isOpen ? <FaMinus/> : <FaPlus />}
        </span>
      </div>

      <div className={`accordion_body ${isOpen ? "open" : "closed"}`}>
        {children}
      </div>
    </div>
  );
}
