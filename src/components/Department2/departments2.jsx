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

export default function Departments3({ departments, onClick }) {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: false, // ✅ don't loop, keeps alignment left
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false, // ❌ slick ke apne arrows hata diye
    autoplay: false, // ✅ autoplay off (better for categories)
  };

  // ✅ Hide arrows if no need to scroll
  const showArrows = departments?.length > settings.slidesToShow;

  return (
    <div className="categories_slider_wrapper">
      {/* ✅ Prev Button outside */}
      {showArrows && (
        <PrevArrow onClick={() => sliderRef.current.slickPrev()} />
      )}

      <div className="categories_slider">
        {/* <span className="heading">Shop from Seafood Shop</span> */}
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

      {/* ✅ Next Button outside */}
      {showArrows && (
        <NextArrow onClick={() => sliderRef.current.slickNext()} />
      )}
    </div>
  );
}
