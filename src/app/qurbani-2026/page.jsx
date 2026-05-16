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
import Link from "next/link";


function page() {
    //   const [scrollToSection, setScrollToSection] = useState(null);
    //   const [scrollToSectionSale, setScrollToSectionSale] = useState(null);
    return (
        <>
            <div className="main_page_1_lo">
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

                                {/* <button onClick={()=>{window.location.href = "/qurbani-2026/booking"}} className="Qurbani-2026-primary-btn">
                                Book Your Qurbani →
                            </button> */}

                                <Link
                                    href="/qurbani-2026/booking"
                                    className="Qurbani-2026-primary-btn"
                                >
                                    Book Your Qurbani →
                                </Link>

                                <a href="tel:+16108621955">
                                    <button onClick={() => { }} className="Qurbani-2026-secondary-btn">
                                        <FaPhoneAlt />
                                        Call 610-862-1955
                                    </button>
                                </a>

                            </div>



                            <div className="Qurbani-2026-footer-text">
                                <p>
                                    We will Zabiha, Cut & Prepare it professionally according to halal standards.
                                </p>
                            </div>
                        </div>

                        {/* RIGHT IMAGE / SLIDER */}
                        <div className="Qurbani-2026-right">

                            <div className="Qurbani-2026-option-card">
                                <div style={{ display: 'flex ', justifyContent: 'flex-start', alignItems: 'center', gap: '20px', flexDirection: 'column' }}>
                                    <img src="/animal.png" alt="" className="image_Qurbani-2026" />
                                    <div style={{
                                        display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center',
                                    }}>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                                            <h3>Goat or Lamb</h3>
                                            <span>45-55 LBS / per animal</span>
                                            <p className="Qurbani-2026-price">$499 </p>
                                        </div>
                                        <div>
                                            <Link className="Qurbani-2026-card-btn" href="/qurbani-2026/booking">
                                            Choose
                                            </Link>
                                            {/* <button onClick={() => { window.location.href = "/qurbani-2026/booking" }} >Choose</button> */}

                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>


                </section>
                <section className="subscription">
                    <span>
                        © 2026 Delco Farmers Market. Designed & Managed by
                    </span>
                    <a href="https://zellesolutions.com">Zelle Solutions Pvt. Ltd</a>
                </section>
            </div>
        </>

    );
}

export default page;