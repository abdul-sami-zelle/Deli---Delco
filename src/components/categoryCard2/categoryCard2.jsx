import React from "react";
import "./style.css";


export default function CategoryCard2({image,catName,isSelected,onClick}) {
    return(
        <div onClick={onClick} className={isSelected ? "category_card_2 selected" : "category_card_2"}>
            <img src={image} alt="" srcset="" />
            <div className="category_name_2">
                {catName}
            </div>
        </div>
    )
}