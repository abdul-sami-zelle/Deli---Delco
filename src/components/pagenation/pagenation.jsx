import React from "react";
import "./style.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";


export default function Pagination({ prevPage, page, totalPages, nextPage, goToPage }) {
  return (
    <div className="pagenation">
      <button className="arrow_btn" onClick={prevPage} disabled={page === 1}>
        <IoIosArrowBack  size={24}/>
      </button>

      <div className="page-numbers">
        {Array.from({ length: totalPages }, (_, idx) => {
          const pageNum = idx + 1;
          return (
            <button
              key={pageNum}
              className={pageNum === page ? "pg_nmbr active" : "pg_nmbr"}
              onClick={() => goToPage(pageNum)}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button className="arrow_btn" onClick={nextPage} disabled={page === totalPages}>
        <IoIosArrowForward size={20} />
      </button>
    </div>
  );
}
