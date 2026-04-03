"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryContainer from "../categoryContainer/categoryContainer";

const NextArrow = ({ onClick }) => (
  <div className="custom-arrow custom-next" onClick={onClick}>
    &#10095;
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow custom-prev" onClick={onClick}>
    &#10094;
  </div>
);

export default function Departments3({ departments , onClick }) {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false, // ❌ slick ke apne arrows hata do
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 2000, settings: { slidesToShow: 7 } },
      { breakpoint: 1600, settings: { slidesToShow: 6 } },
      { breakpoint: 1200, settings: { slidesToShow: 6 } },
      { breakpoint: 992, settings: { slidesToShow: 5 } },
      { breakpoint: 768, settings: { slidesToShow: 4 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="categories_slider_wrapper">
      {/* ✅ Prev Button outside */}

      <NextArrow onClick={() => sliderRef.current.slickPrev()}  />

      <div className="categories_slider">
        <Slider ref={sliderRef} {...settings}>
          {departments?.map((cat) => (
            <CategoryContainer
              key={cat._id}
              image={cat.image}
              name={cat.visi_name}
              onClick={() => onClick(cat._id)}
            />
          ))}
        </Slider>
      </div>

      <PrevArrow onClick={() => sliderRef.current.slickNext()}/>

  
    </div>
  );
}
