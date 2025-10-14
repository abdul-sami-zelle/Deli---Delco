import React, { useEffect, useMemo, useState } from "react";
import "./style.css";

export default function PriceRangeSlider({
    min = 0,
    max = 1000,
    step = 1,
    initialMin,
    initialMax,
    currency = "$",
    onChange = () => { },
    showResetBtn = false
}) {
    const clamp = (v, a, b) => Math.min(Math.max(v, a), b);

    const [minVal, setMinVal] = useState(
        initialMin !== undefined ? clamp(initialMin, min, max) : min
    );
    const [maxVal, setMaxVal] = useState(
        initialMax !== undefined ? clamp(initialMax, min, max) : max
    );

    // Ensure minVal <= maxVal
    useEffect(() => {
        if (minVal > maxVal) setMinVal(maxVal);
    }, [maxVal]);

    useEffect(() => {
        if (maxVal < minVal) setMaxVal(minVal);
    }, [minVal]);

    // Inform parent when values change
    useEffect(() => {
        onChange({ min: minVal, max: maxVal });
    }, [minVal, maxVal, onChange]);

    // Calculate positioning for colored range (as percent)
    const minPercent = useMemo(
        () => ((minVal - min) / (max - min)) * 100,
        [minVal, min, max]
    );
    const maxPercent = useMemo(
        () => ((maxVal - min) / (max - min)) * 100,
        [maxVal, min, max]
    );

    const format = (v) => `${currency}${Number(v).toLocaleString()}`;

    return (
        <div className="prs-container">


            <div className="prs-slider-wrapper">
                {/* Invisible range inputs stacked to create two-thumb slider */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={minVal}
                    onChange={(e) => {
                        const val = Math.min(Number(e.target.value), maxVal);
                        setMinVal(val);
                    }}
                    className="prs-range prs-range-min"
                    style={{ zIndex: minVal === max ? 5 : 3 }} // ensure thumb stacking
                />

                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={maxVal}
                    onChange={(e) => {
                        const val = Math.max(Number(e.target.value), minVal);
                        setMaxVal(val);
                    }}
                    className="prs-range prs-range-max"
                    style={{ zIndex: 4 }}
                />

                {/* Visual track */}
                <div className="prs-track">
                    <div
                        className="prs-track-active"
                        style={{
                            left: `${minPercent}%`,
                            right: `${100 - maxPercent}%`,
                        }}
                    />
                </div>

                {/* Optional tick marks (uncomment in CSS if you want) */}
            </div>

            <div className="prs-values">
                <div className="prs-value">{format(minVal)}</div>
                <div className="prs-value">{format(maxVal)}</div>
            </div>

            {showResetBtn && <div className="prs-actions">
                <button
                    type="button"
                    onClick={() => {
                        setMinVal(min);
                        setMaxVal(max);
                    }}
                    className="prs-btn"
                >
                    Reset
                </button>
            </div>}
        </div>
    );
}
