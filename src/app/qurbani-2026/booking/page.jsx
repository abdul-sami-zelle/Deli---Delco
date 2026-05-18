"use client";

import React, { useState } from "react";
import "./ChooseQurbani.css";
import {
    FaPhoneAlt,
    FaRegClock,
} from "react-icons/fa";
import Header from "@/components/Header/Header copy";
import { IoIosArrowDown } from "react-icons/io";
import Loader from "@/components/Loader/Loader";

function Page() {

    const [currentStep, setCurrentStep] = useState(1);
    const [selectedAnimal, setSelectedAnimal] = useState("6a08851df5082f90aa481fda");
    const [selectedAnimalName, setSelectedAnimalName] = useState("Goat");
    const [bookingNo, setBookingNo] = useState("")

    const [errors, setErrors] = useState({});
    const validateStepTwo = () => {

        let newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        }

        if (!selectedDay.trim()) {
            newErrors.selectedDay = "Please select a day";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
        ) {
            newErrors.email = "Invalid email address";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const [quantity, setQuantity] = useState(1);
    const [selectedDay, setSelectedDay] = useState("Day 1");
    const [selectedDayDate, setSelectedDayDate] = useState("05/27");
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

    const handleZipLookup = async (zip) => {

        // only call api when zip is 5 digits
        if (zip.length !== 5) return;

        try {

            const response = await fetch(
                `https://zip.getziptastic.com/v2/US/${zip}`
            );

            const data = await response.json();

            console.log("ZIP RESPONSE:", data);

            if (data.city) {

                setFormData(prev => ({
                    ...prev,
                    zip: zip,
                    city: data.city,
                    state: data.state_short || data.state
                }));

            }

        } catch (error) {

            console.error("ZIP Lookup Failed:", error);

        }
    };
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleInputChange = async (e) => {

        const { name, value } = e.target;

        // PHONE FORMAT
        if (name === "phone") {

            let numbers = value.replace(/\D/g, "");

            // limit to 10 digits
            numbers = numbers.substring(0, 10);

            let formattedPhone = numbers;

            if (numbers.length > 0) {
                formattedPhone = `(${numbers.substring(0, 3)}`;
            }

            if (numbers.length >= 4) {
                formattedPhone += `) ${numbers.substring(3, 6)}`;
            }

            if (numbers.length >= 7) {
                formattedPhone += `-${numbers.substring(6, 10)}`;
            }

            setFormData(prev => ({
                ...prev,
                phone: formattedPhone
            }));

            setErrors(prev => ({
                ...prev,
                phone: ""
            }));

            return;
        }

        // ZIP AUTO LOOKUP
        if (name === "zip") {

            const zipValue = value.replace(/\D/g, "");

            setFormData(prev => ({
                ...prev,
                zip: zipValue
            }));

            setErrors(prev => ({
                ...prev,
                zip: ""
            }));

            if (zipValue.length === 5) {
                handleZipLookup(zipValue);
            }

            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        setErrors(prev => ({
            ...prev,
            [name]: ""
        }));
    };
    const animalOptions = [
        { id: "6a0884fef5082f90aa481fd8", name: "Lamb", main_id: "6a0884fef5082f90aa481fd8", weight: "45-55 LBS", price: 499, emoji: "/lamb.png" },
        { id: "6a08851df5082f90aa481fda", name: "Goat", main_id: "6a08851df5082f90aa481fda", weight: "45-55 LBS", price: 499, emoji: "/goat.png" },
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

    const [loading, setLoading] = useState(false);

    const handleSubmitBooking = async () => {

        try {

            setLoading(true);

            const payload = {
                animal: selectedAnimal,
                quantity: quantity,
                preferred_day: selectedDay,
                full_name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                address: formData.streetAddress,
                city: formData.city,
                state: formData.state,
                zip_code: formData.zip,
                instruction: formData.instructions
            };

            const response = await fetch(
                "https://api.delcofarmersmarket.com/api/v1/qurbani-booking",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            console.log("BOOKING RESPONSE:", data);
            setBookingNo(data?.data?.booking_no || data?.booking_no);

            // OPTIONAL RESET
            setCurrentStep(4);

        } catch (error) {

            console.error(error);

            alert(error.message || "Failed to submit booking");

        } finally {

            setLoading(false);

        }
    };

    return (
        <>
            <Header />

            <section className="Qurbani-2026-wrapper">
                <div className="Qurbani-2026-container">

                    {/* LEFT SIDE */}
                    <div className="Qurbani-2026-left booking_page_left">
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
                            <a href="tel:+16108621955">
                                <button className="Qurbani-2026-primary-btn">
                                    <FaPhoneAlt />
                                    Call 610-862-1955
                                </button>
                            </a>
                            {/* <button className="Qurbani-2026-secondary-btn">
                               
                            </button> */}
                        </div>

                        <div className="Qurbani-2026-footer-text">
                            <p>
                                From Selection to Slaughter. Complete Peace of Mind
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
                                                onClick={() => { setSelectedAnimal(animal.id); setSelectedAnimalName(animal.name) }}
                                            >
                                                {/* <div className="Qurbani-animal-emoji_QURBANI_STEPPER_">{animal.emoji}</div> */}
                                                <img style={{ height: "45px", width: "auto" }} src={animal.emoji} alt="" srcset="" />
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
                                                <label>Full name*</label>
                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleInputChange}
                                                    className={errors.fullName ? "input-error" : ""}
                                                />
                                            </div>
                                            <div className="Qurbani-field-group_QURBANI_STEPPER_">
                                                <label>Select Day*</label>

                                                <div className="Qurbani-custom-select">

                                                    <div
                                                        className="Qurbani-select-box"
                                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                                    >
                                                        {selectedDay === "Day 1" && "Day 1 - 05/27"}
                                                        {selectedDay === "Day 2" && "Day 2 - 05/28"}
                                                        {selectedDay === "Day 3" && "Day 3 - 05/29"}

                                                        <span className="arrow_qurbani-2026"><IoIosArrowDown /></span>
                                                    </div>

                                                    {dropdownOpen && (
                                                        <div className="Qurbani-select-options">
                                                            <div onClick={() => { setSelectedDay("Day 1");setSelectedDayDate("05/27"); setDropdownOpen(false); }}>
                                                                Day 1 - 05/27
                                                            </div>

                                                            <div onClick={() => { setSelectedDay("Day 2");setSelectedDayDate("05/28"); setDropdownOpen(false); }}>
                                                                Day 2 - 05/28
                                                            </div>

                                                            <div onClick={() => { setSelectedDay("Day 3");setSelectedDayDate("05/29"); setDropdownOpen(false); }}>
                                                                Day 3 - 05/29
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                        </div>

                                        <div className="Qurbani-phone-block-row_QURBANI_STEPPER_">
                                            <div className="Qurbani-field-group_QURBANI_STEPPER_">
                                                <label>Phone*</label>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className={errors.phone ? "input-error" : ""}

                                                />
                                            </div>
                                            <div className="Qurbani-field-group_QURBANI_STEPPER_">
                                                <label>Email*</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className={errors.email ? "input-error" : ""}
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
                                                <label>Zip Code</label>
                                                <input
                                                    type="text"
                                                    name="zip"
                                                    value={formData.zip}
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
                                                <label>City</label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
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
                                                onClick={() => {

                                                    const isValid = validateStepTwo();

                                                    if (isValid) {
                                                        setCurrentStep(3);
                                                    }

                                                }}
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
                                        <p className="min-f"><strong>Email:</strong> {formData.email}</p>
                                        <p><strong>Phone:</strong> {formData.phone}</p>
                                        <p><strong>Selected Day:</strong> {selectedDay} - {selectedDayDate}</p>
                                        <p className="min-f">
                                            <strong>Address:</strong>{" "}
                                            {formData.streetAddress}, {formData.city}, {formData.state}, {formData.zip}
                                        </p>

                                        {/* <p><strong>Instructions:</strong> {formData.instructions}</p> */}

                                        <hr />


                                        <p style={{ display: 'flex', flexDirection: 'column' }}>
                                            <strong style={{ marginBottom: '10px' }}>Booking Summary:</strong>{" "}

                                            <div className="bookingSumarryLayout" >
                                                <p style={{ marginBottom: '10px', width: '100%' }}><strong>Animal:</strong> {selectedAnimalName}</p>
                                                <p style={{ marginBottom: '10px', width: '100%' }}><strong>Quantity:</strong> {quantity}</p>

                                            </div>
                                            <div className="bookingSumarryLayout">
                                                <p style={{ marginBottom: '10px', width: '100%' }}><strong>Unit Price:</strong> ${unitPrice.toFixed(2)}</p>
                                                <p style={{ marginBottom: '10px', width: '100%' }}><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
                                            </div>

                                        </p>

                                    </div>

                                    <div className="Qurbani-stepper-footer-panel_QURBANI_STEPPER_ confirmation_step">





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


                            {/* ================= STEP 3 (UPDATED ONLY PRICE LOGIC) ================= */}
                            {currentStep === 4 && (
                                <div className="Qurbani-step-three_QURBANI_STEPPER_">

                                    <h3 className="Qurbani-step-title_QURBANI_STEPPER_ confirmation" style={{ textAlign: "center" }}>
                                        <img src="/check.png" alt="" srcset="" />
                                        Your Booking Has Been Received
                                    </h3>

                                    <p className="para_2">Thank you for booking your Eid-ul-Adha Qurbani with Delco Farmers Market. We have successfully received your booking, our team will shortly contact you for confirmation.</p>

                                    <div className="Qurbani-2026-slider-card-confirmation-page">

                                        {/* Replace this image with your own */}
                                        <img
                                            src="/Qurbani_Destop Banner_Delco_small.jpeg"
                                            alt="Qurbani Poster"
                                            className="Qurbani-2026-slider-image"
                                        />

                                    </div>

                                    <div className="Qurbani-review-box_QURBANI_STEPPER_">




                                        <p style={{ display: 'flex', flexDirection: 'column' }}>
                                            <div style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: "5px"
                                            }}>
                                                <strong style={{ marginBottom: '10px' }}>Booking No :</strong>{" "}
                                                <strong style={{ marginBottom: '10px' }}>{bookingNo}</strong>{" "}
                                            </div>

                                             <div className="bookingSumarryLayout" >
                                                <p style={{ marginBottom: '10px', width: '100%' }}><strong>Full Name:</strong> {formData.fullName}</p>
                                                <p style={{ marginBottom: '10px', width: '100%' }}><strong>Selected Day:</strong> {selectedDay} - {selectedDayDate}</p>

                                            </div>

                                            <div className="bookingSumarryLayout" >
                                                <p style={{ marginBottom: '10px', width: '100%' }}><strong>Animal:</strong> {selectedAnimalName}</p>
                                                <p style={{ marginBottom: '10px', width: '100%' }}><strong>Quantity:</strong> {quantity}</p>

                                            </div>
                                            <div className="bookingSumarryLayout">
                                                <p style={{ marginBottom: '10px', width: '100%' }}><strong>Unit Price:</strong> ${unitPrice.toFixed(2)}</p>
                                                <p style={{ marginBottom: '10px', width: '100%' }}><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
                                            </div>

                                        </p>

                                    </div>

                                    <div className="Qurbani-stepper-footer-panel_QURBANI_STEPPER_ desktop_bth_tn confirmation_step">




                                        <button
  type="button"
  className="Qurbani-stepper-submit-btn_QURBANI_STEPPER_"
  onClick={() => {
    window.location.href = "https://delcofarmersmarket.com";
  }}
>
  Back to Home
</button>

                                    </div>



                                </div>
                            )}


                        </div>
                    </div>

                </div>
            </section>
            {loading && <Loader />}
        </>
    );
}

export default Page;