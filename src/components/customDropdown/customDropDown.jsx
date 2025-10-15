import React, { useState, useRef, useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";
import "./style.css";

export default function SortDropdown({
    label = "Sort By", // ✅ added label support
    options = [],
    onSelect,
    width,
    inlineLabel = false, // ✅ optional prop: true → label beside dropdown
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(options[0] || "Select");
    const dropdownRef = useRef(null);

    // ✅ close on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        setSelected(option);
        setIsOpen(false);
        if (onSelect) onSelect(option);
    };

    return (
        <div

            className={`sort_dropdown_wrapper ${inlineLabel ? "inline" : "stacked"
                }`}
        >
            {label && <label className="sort_dropdown_label">{label}</label>}

            <div style={{
                width: width
            }} className="sort_dropdown" ref={dropdownRef}>
                <button
                    style={{
                        width: width
                    }}
                    className="sort_dropdown_btn"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span>{selected}</span>
                    <BsChevronDown
                        className={`arrow_icon ${isOpen ? "rotated" : ""}`}
                    />
                </button>

                {isOpen && (
                    <div className="sort_dropdown_menu">
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className={`sort_dropdown_item ${option === selected ? "active" : ""
                                    }`}
                                onClick={() => handleSelect(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
