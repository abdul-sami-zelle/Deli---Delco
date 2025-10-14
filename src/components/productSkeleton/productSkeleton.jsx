"use client";
import React from "react";
import "./style.css";

export default function ShimmerProductCard({ isArchivePage = false }) {
  return (
    <div className="product-card-container">
      <div
        className="product-card shimmer-card"
        style={{
          padding: isArchivePage ? "5px" : undefined,
          width: isArchivePage ? "100%" : undefined,
        }}
        aria-hidden="true"
      >
        <div className="product-card-inner">
          <div className="shimmer-image" />

          <div className="product-info">
            <div className="shimmer-line shimmer-price" />
            <div className="shimmer-line shimmer-name" />
            <div className="shimmer-line shimmer-weight" />
          </div>
        </div>

        <div className="add-to-cart others shimmer-qty">
          <div className="shimmer-btn small" />
          <div className="shimmer-count" />
          <div className="shimmer-btn small" />
        </div>
      </div>
    </div>
  );
}
