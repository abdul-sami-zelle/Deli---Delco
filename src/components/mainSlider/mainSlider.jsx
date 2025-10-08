"use client";
import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { FaRegCirclePause } from "react-icons/fa6";
import { FaRegCirclePlay } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";



export default function MainSlider() {
    const slides = [

        { id: 1, color: "#FE6463", heading: "Premium Deli Beef", paragraph: "Tender, flavorful cuts—perfect for sandwiches, wraps & everyday meals.", btnText: "Shop Deli Beef", image: "./slider/beef.png" },
        { id: 2, color: "#50274B", heading: "Authentic Italian Flavors", paragraph: "Prosciutto, salami, and artisanal cured meats—crafted for true taste lovers.", btnText: "Shop Italian Meats", image: "./slider/salami.png" },
        { id: 3, color: "#5C0002", heading: "Fresh & Lean Turkey", paragraph: "Sliced to perfection—your go-to choice for light and healthy meals.", btnText: "Shop Turkey", image: "./slider/turkey.png" }
    ];
    const [current, setCurrent] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const sliderRef = useRef(null);
    const intervalRef = useRef(null);

    // Auto slide
    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                setCurrent((prev) => (prev + 1) % slides.length);
            }, 3000);
        }
        return () => clearInterval(intervalRef.current);
    }, [isPlaying, slides.length]);

    // Drag functionality
    let startX = 0;
    let endX = 0;

    const handleTouchStart = (e) => {
        startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) {
            setCurrent((prev) => (prev + 1) % slides.length); // swipe left
        } else if (endX - startX > 50) {
            setCurrent((prev) => (prev - 1 + slides.length) % slides.length); // swipe right
        }
    };

    return (
        <div className="main_slider">
            <div
                className="slides_main_slider"
                ref={sliderRef}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`slide_main_slider ${current === index ? "active" : ""}`}
                        style={{ background: slide.color }}
                    >
                        <div
                            className="arrow_main_slider left"
                            onClick={() =>
                                setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
                            }
                        >
                            <IoIosArrowBack />
                        </div>
                        <div
                            className="arrow_main_slider right"
                            onClick={() =>
                                setCurrent((prev) => (prev + 1) % slides.length)
                            }
                        >
                            <IoIosArrowForward />
                        </div>
                        <div className="main_slider_content_left">
                            <h2>{slide.heading}</h2>
                            <p>{slide.paragraph}</p>
                            <button>{slide.btnText}</button>
                        </div>
                        <div
                            style={{ backgroundImage: `url(${slide.image})` }}
                            className="main_slider_content_right"
                        />
                    </div>
                ))}
            </div>

            {/* Controls */}
            <div className="slider_main_controllers">
                <button
                    className="pause_slider_main_btn"
                    onClick={() => setIsPlaying(!isPlaying)}
                >
                    {isPlaying ? <FaRegCirclePause /> : <FaRegCirclePlay />}
                </button>

                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`dots_btn_main_slider ${current === index ? "active" : ""}`}
                        onClick={() => setCurrent(index)}
                    ></button>
                ))}
            </div>
        </div>

    );
}
