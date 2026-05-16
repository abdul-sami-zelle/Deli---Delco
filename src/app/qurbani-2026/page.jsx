"use client";

import React from "react";
import "./Qurbani2026.css";
import {
    FaPhoneAlt,
    FaWhatsapp,
    FaRegClock,
} from "react-icons/fa";
import Header from "@/components/Header/Header copy";
import Footer_2 from "@/components/footer_2/footer";

function page() {
    //   const [scrollToSection, setScrollToSection] = useState(null);
    //   const [scrollToSectionSale, setScrollToSectionSale] = useState(null);
    return (
        <>
            <Header />
            <section className="Qurbani-2026-wrapper">
                <div className="Qurbani-2026-container">

                    {/* LEFT CONTENT */}
                    <div className="Qurbani-2026-left">

                        <div className="Qurbani-2026-badge">
                            <span>☪</span>
                            EID-AL-ADHA MUBARAK
                        </div>

                        <div className="Qurbani-2026-timer">
                            <FaRegClock />
                            <span>11 DAYS UNTIL EID AL-ADHA</span>
                            <div className="Qurbani-2026-dot"></div>
                            <span>CLOSES MAY 27, 2026</span>
                        </div>

                        <h1 className="Qurbani-2026-heading">
                            Book Your <span>Qurbani</span> <br />
                            Today
                        </h1>

                        {/* <p className="Qurbani-2026-description">
                            Fulfill your duty. Share your blessings. Bereket Marketplace
                            offers fresh, premium-quality halal lamb, goat, and beef —
                            Islamically slaughtered and cut and packed your way.
                        </p> */}

                        <div className="Qurbani-2026-buttons">

                            <button className="Qurbani-2026-primary-btn">
                                Book Your Qurbani →
                            </button>

                            <button className="Qurbani-2026-secondary-btn">
                                <FaPhoneAlt />
                                Call +1 610-862-1955
                            </button>

                        </div>



                        <div className="Qurbani-2026-footer-text">
                            <p>
                                Reserve with a non-refundable <strong>$100 deposit per item.</strong>{" "}
                                Balance due at pickup.
                            </p>

                            <p>
                                Online booking closes <strong>May 27, 2026</strong> (end of day,
                                ET).
                            </p>
                        </div>
                    </div>

                    {/* RIGHT IMAGE / SLIDER */}
                    <div className="Qurbani-2026-right">

                        <div className="Qurbani-2026-slider-card">

                            {/* Replace this image with your own */}
                            <img
                                src="./Qurbani_Destop Banner_Delco_small.jpeg"
                                alt="Qurbani Poster"
                                className="Qurbani-2026-slider-image"
                            />

                        </div>

                    </div>
                </div>


            </section>

            <section>
                <div className="Qurbani-2026-options-wrapper">
                    <div className="Qurbani-2026-options-wrapper_second">
                        <div className="Right_OPTIONs_Wrapper">
                            <img src="./TAG.png" alt="" />
                        </div>


                        <div className="Qurbani-2026-options-grid">
                            {/* Card 2 */}
                            <div className="Qurbani-2026-option-card">
                                <div style={{ display: 'flex ', justifyContent: 'flex-start', alignItems: 'center', gap: '20px', flexDirection:'column' }}>
                                    <img src="/animal.png" alt="" className="image_Qurbani-2026" />
                                    <div style={{
                                        display: 'flex', justifyContent: 'space-between', width:'100%', alignItems:'center',
                                    }}>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                                            <h3>Goat or Lamb</h3>
                                            <span>45-55 LBS / per animal</span>
                                            <p className="Qurbani-2026-price">$499 </p>
                                        </div>
                                        <div>
                                            <button className="Qurbani-2026-card-btn">Choose</button>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            {/* <Footer_2 /> */}
            <section className="subscription">
                <span>
                    © 2026 Delco Farmers Market. Designed & Managed by
                </span>
                <a href="https://zellesolutions.com">Zelle Solutions Pvt. Ltd</a>
            </section>
        </>

    );
}

export default page;