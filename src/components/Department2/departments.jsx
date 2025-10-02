"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import CategoryCard from "./categoryCard/categoryCard";
import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const staticDepartments = [
  { _id: 1, visi_name: "Bakery", image: "/assets/banners/1.jpg" },
  { _id: 2, visi_name: "Butcher", image: "/assets/banners/2.jpg" },
  { _id: 3, visi_name: "Seafood", image: "/assets/banners/3.jpg" },
  { _id: 4, visi_name: "Produce", image: "/assets/banners/4.jpg" },
  { _id: 5, visi_name: "Butcher", image: "/assets/banners/5.jpg" },
  { _id: 6, visi_name: "Seafood", image: "/assets/banners/6.jpg" },
  { _id: 7, visi_name: "Produce", image: "/assets/banners/7.jpg" },
];

// ✅ Custom Arrow Components
const NextArrow = ({ onClick }) => (
  <div className="custom-arrow custom-next" onClick={onClick}>
    &#10095; {/* Right arrow icon */}
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow custom-prev" onClick={onClick}>
    &#10094; {/* Left arrow icon */}
  </div>
);

export default function Departments2() {
  const [slidesToShow, setSlidesToShow] = useState(5);

  const updateSlidesToShow = () => {
    const width = window.innerWidth;
    if (width < 480) setSlidesToShow(1);
    else if (width < 768) setSlidesToShow(2);
    else if (width < 992) setSlidesToShow(3);
    else if (width < 1200) setSlidesToShow(4);
    else setSlidesToShow(5);
  };

  useEffect(() => {
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: staticDepartments.length > slidesToShow, // show arrows only if needed
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="categories_slider">
      <Slider {...settings}>
        {staticDepartments.map((cat) => (
          <CategoryCard key={cat._id} id={cat._id} image={cat.image} />
        ))}
      </Slider>
    </div>
  );
}
