"use client";

import React, { useState } from "react";
import "./ChooseQurbani.css";
import {
    FaPhoneAlt,
    FaRegClock,
} from "react-icons/fa";
import Header from "@/components/Header/Header copy";
import { IoIosArrowDown } from "react-icons/io";

function Page() {

    const [currentStep, setCurrentStep] = useState(1);
    const [selectedAnimal, setSelectedAnimal] = useState("Goat");
    const [quantity, setQuantity] = useState(1);
    const [selectedDay, setSelectedDay] = useState("day 1");
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        streetAddress: "",
        city: "",
        state: "",
        zip: "",
        instructions: ""
    });
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const animalOptions = [
        { id: "Lamb", name: "Lamb", weight: "45-55 LBS", price: 499, emoji: "🐑" },
        { id: "Goat", name: "Goat", weight: "45-55 LBS", price: 499, emoji: "🐐" },
    ];

    const activeAnimalData = animalOptions.find(item => item.id === selectedAnimal) || animalOptions[1];

    const unitPrice = activeAnimalData.price;
    const subtotal = unitPrice * quantity;
    const depositTotal = 100 * quantity;
    const balanceAtPickup = subtotal;

    const handleQuantityChange = (type) => {
        if (type === "decrement" && quantity > 1) {
            setQuantity(prev => prev - 1);
        } else if (type === "increment" && quantity < 10) {
            setQuantity(prev => prev + 1);
        }
    };

    const handleNextStep = () => {
        setCurrentStep(prev => prev + 1);
    };

    const handleSubmitBooking = () => {
        console.log("BOOKING DATA:", {
            selectedAnimal,
            quantity,
            formData,
            subtotal,
            depositTotal,
            balanceAtPickup
        });

        alert("Booking Submitted Successfully!");
    };

    return (
        <>
            <Header />

            <section className="Qurbani-2026-wrapper">
                <div className="Qurbani-2026-container">

                    {/* LEFT SIDE */}
                    <div className="Qurbani-2026-left">
                        <div className="Qurbani-2026-badge">
                            <span>☪</span>
                            EID-AL-ADHA MUBARAK
                        </div>

                        {/* <div className="Qurbani-2026-timer">
                            <FaRegClock />
                            <span>11 DAYS UNTIL EID AL-ADHA</span>
                            <div className="Qurbani-2026-dot"></div>
                            <span>CLOSES MAY 27, 2026</span>
                        </div> */}

                        <h1 className="Qurbani-2026-heading">
                            Book Your <span>Qurbani</span> <br />
                            Today
                        </h1>

                        <div className="Qurbani-2026-buttons">
                            <button className="Qurbani-2026-primary-btn">
                                Book Your Qurbani →
                            </button>
                            <button className="Qurbani-2026-secondary-btn">
                                <FaPhoneAlt />
                                Call 732-798-6099
                            </button>
                        </div>

                        <div className="Qurbani-2026-footer-text">
                            <p>
                                Online booking closes <strong>May 27, 2026</strong> (end of day, ET).
                            </p>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="Qurbani-2026-right">

                        <div className="Qurbani-stepper-card_QURBANI_STEPPER_">

                            {/* ================= STEP 1 ================= */}
                            {currentStep === 1 && (
                                <div className="Qurbani-step-one_QURBANI_STEPPER_">

                                    <h3 className="Qurbani-step-title_QURBANI_STEPPER_">
                                        1. Choose your Qurbani
                                    </h3>

                                    <div className="Qurbani-animal-grid_QURBANI_STEPPER_">
                                        {animalOptions.map((animal) => (
                                            <div
                                                key={animal.id}
                                                className={`Qurbani-animal-card_QURBANI_STEPPER_ ${selectedAnimal === animal.id ? "active_QURBANI_STEPPER_" : ""}`}
                                                onClick={() => setSelectedAnimal(animal.id)}
                                            >
                                                <div className="Qurbani-animal-emoji_QURBANI_STEPPER_">{animal.emoji}</div>
                                                <div className="Qurbani-animal-name_QURBANI_STEPPER_">{animal.name}</div>
                                                <div className="Qurbani-animal-weight_QURBANI_STEPPER_">{animal.weight}</div>
                                                <div className="Qurbani-animal-price_QURBANI_STEPPER_">
                                                    ${animal.price.toFixed(2)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="Qurbani-checkout-row_QURBANI_STEPPER_">

                                        <div className="Qurbani-quantity-block_QURBANI_STEPPER_">
                                            <span className="Qurbani-quantity-label_QURBANI_STEPPER_">
                                                Quantity
                                            </span>

                                            <div className="Qurbani-counter-wrapper_QURBANI_STEPPER_">
                                                <button
                                                    type="button"
                                                    className="Qurbani-counter-btn_QURBANI_STEPPER_"
                                                    onClick={() => handleQuantityChange("decrement")}
                                                    disabled={quantity <= 1}
                                                >
                                                    —
                                                </button>

                                                <div className="Qurbani-counter-value_QURBANI_STEPPER_">
                                                    {quantity}
                                                </div>

                                                <button
                                                    type="button"
                                                    className="Qurbani-counter-btn_QURBANI_STEPPER_"
                                                    onClick={() => handleQuantityChange("increment")}
                                                    disabled={quantity >= 10}
                                                >
                                                    +
                                                </button>

                                                <span className="Qurbani-quantity-range_QURBANI_STEPPER_">
                                                    1–10
                                                </span>
                                            </div>
                                        </div>

                                        <div className="Qurbani-invoice-block_QURBANI_STEPPER_">
                                            <div className="Qurbani-invoice-line_QURBANI_STEPPER_">
                                                <span>Unit price</span>
                                                <span>${unitPrice.toFixed(2)}</span>
                                            </div>

                                            <div className="Qurbani-invoice-line_QURBANI_STEPPER_">
                                                <span>Quantity</span>
                                                <span>x {quantity}</span>
                                            </div>

                                            <div className="Qurbani-invoice-line_QURBANI_STEPPER_ highlighted-row_QURBANI_STEPPER_">
                                                <span>Subtotal</span>
                                                <strong>${subtotal.toFixed(2)}</strong>
                                            </div>

                                            <div className="Qurbani-invoice-line_QURBANI_STEPPER_ highlighted-row_QURBANI_STEPPER_ balance-line_QURBANI_STEPPER_">
                                                <span>Balance</span>
                                                <strong>${balanceAtPickup.toFixed(2)}</strong>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="Qurbani-stepper-actions_QURBANI_STEPPER_">
                                        <button
                                            className="Qurbani-stepper-next-btn_QURBANI_STEPPER_"
                                            onClick={handleNextStep}
                                        >
                                            Next →
                                        </button>
                                    </div>

                                </div>
                            )}

                            {/* ================= STEP 2 ================= */}
                            {currentStep === 2 && (
                                <div className="Qurbani-step-two_QURBANI_STEPPER_">

                                    <h3 className="Qurbani-step-title_QURBANI_STEPPER_">
                                        2. Your contact info
                                    </h3>

                                    <p className="Qurbani-step-subtitle_QURBANI_STEPPER_">
                                        We’ll send your confirmation to this phone and email.
                                    </p>

                                    <form onSubmit={(e) => e.preventDefault()} className="Qurbani-form-layout_QURBANI_STEPPER_">

                                        <div className="Qurbani-form-row-split_QURBANI_STEPPER_">
                                            <div className="Qurbani-field-group_QURBANI_STEPPER_">
                                                <label>Full name</label>
                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="Qurbani-field-group_QURBANI_STEPPER_">
                                                <label>Select Day</label>

                                                <div className="Qurbani-custom-select">

                                                    <div
                                                        className="Qurbani-select-box"
                                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                                    >
                                                        {selectedDay === "day 1" && "Day 1 "}
                                                        {selectedDay === "day 2" && "Day 2 "}
                                                        {selectedDay === "day 3" && "Day 3 "}

                                                        <span className="arrow_qurbani-2026"><IoIosArrowDown /></span>
                                                    </div>

                                                    {dropdownOpen && (
                                                        <div className="Qurbani-select-options">
                                                            <div onClick={() => { setSelectedDay("day 1"); setDropdownOpen(false); }}>
                                                                Day 1
                                                            </div>

                                                            <div onClick={() => { setSelectedDay("day 2"); setDropdownOpen(false); }}>
                                                                Day 2
                                                            </div>

                                                            <div onClick={() => { setSelectedDay("day 3"); setDropdownOpen(false); }}>
                                                                Day 3
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                        </div>

                                        <div className="Qurbani-phone-block-row_QURBANI_STEPPER_">
                                            <div className="Qurbani-field-group_QURBANI_STEPPER_">
                                                <label>Phone</label>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="Qurbani-field-group_QURBANI_STEPPER_">
                                                <label>Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="Qurbani-phone-block-row_QURBANI_STEPPER_">
                                            <div className="Qurbani-field-group_QURBANI_STEPPER_">
                                                <label>Street address</label>
                                                <input
                                                    type="text"
                                                    name="streetAddress"
                                                    value={formData.streetAddress}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="Qurbani-phone-block-row_QURBANI_STEPPER_">
                                           
                                           <div className="Qurbani-field-group_QURBANI_STEPPER_">
                                                <label>City</label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="Qurbani-field-group_QURBANI_STEPPER_">
                                                <label>State</label>
                                                <input
                                                    type="text"
                                                    name="state"
                                                    value={formData.state}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className="Qurbani-field-group_QURBANI_STEPPER_">
                                                <label>ZIP</label>
                                                <input
                                                    type="text"
                                                    name="zip"
                                                    value={formData.zip}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            
                                        </div>

                                        <div className="Qurbani-field-group_QURBANI_STEPPER_">
                                            <label>Instructions</label>
                                            <textarea
                                                name="instructions"
                                                rows="3"
                                                value={formData.instructions}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        {/* 🔥 ONLY CHANGE DONE HERE */}
                                        <div className="Qurbani-stepper-footer-panel_QURBANI_STEPPER_">

                                            <button
                                                type="button"
                                                className="Qurbani-stepper-back-btn_QURBANI_STEPPER_"
                                                onClick={() => setCurrentStep(1)}
                                            >
                                                ← Back
                                            </button>

                                            <button
                                                type="button"
                                                className="Qurbani-stepper-submit-btn_QURBANI_STEPPER_"
                                                onClick={() => setCurrentStep(3)}
                                            >
                                                Next →
                                            </button>

                                        </div>

                                    </form>
                                </div>
                            )}

                            {/* ================= STEP 3 (UPDATED ONLY PRICE LOGIC) ================= */}
                            {currentStep === 3 && (
                                <div className="Qurbani-step-three_QURBANI_STEPPER_">

                                    <h3 className="Qurbani-step-title_QURBANI_STEPPER_">
                                        3. Review Your Booking
                                    </h3>

                                    <div className="Qurbani-review-box_QURBANI_STEPPER_">

                                        <p><strong>Name:</strong> {formData.fullName}</p>
                                        <p><strong>Email:</strong> {formData.email}</p>
                                        <p><strong>Phone:</strong> {formData.phone}</p>
                                        <p><strong>Selected Day:</strong> {selectedDay}</p>
                                        <p>
                                            <strong>Address:</strong>{" "}
                                            {formData.streetAddress}, {formData.city}, {formData.state}, {formData.zip}
                                        </p>

                                        {/* <p><strong>Instructions:</strong> {formData.instructions}</p> */}

                                        <hr />


                                        <p style={{ display: 'flex', flexDirection: 'column' }}>
                                            <strong style={{ marginBottom: '10px' }}>Booking Summary:</strong>{" "}

                                            <div className="bookingSumarryLayout" >
                                                <p style={{ marginBottom: '10px', width: '100%' }}><strong>Animal:</strong> {selectedAnimal}</p>
                                                <p style={{ marginBottom: '10px', width: '100%' }}><strong>Quantity:</strong> {quantity}</p>

                                            </div>
                                            <div className="bookingSumarryLayout">
                                                <p style={{ marginBottom: '10px', width: '100%' }}><strong>Unit Price:</strong> ${unitPrice.toFixed(2)}</p>
                                                <p style={{ marginBottom: '10px', width: '100%' }}><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
                                            </div>

                                        </p>

                                    </div>

                                    <div className="Qurbani-stepper-footer-panel_QURBANI_STEPPER_">

                                        <button
                                            type="button"
                                            className="Qurbani-stepper-back-btn_QURBANI_STEPPER_"
                                            onClick={() => setCurrentStep(2)}
                                        >
                                            ← Back
                                        </button>

                                        <button
                                            type="button"
                                            className="Qurbani-stepper-submit-btn_QURBANI_STEPPER_"
                                            onClick={handleSubmitBooking}
                                        >
                                            Confirm Booking
                                        </button>

                                    </div>

                                </div>
                            )}

                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}

export default Page;