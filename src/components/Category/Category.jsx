"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import "./Category.css";
import { HiArrowNarrowRight } from "react-icons/hi";
import { getCategoryProductsData } from "@/lib/api";
import ProductCard from "../ProductCard/ProductCard";
import AccordionFilter from "../accordian/accordian";
import PriceRangeSlider from "../priceRangeSlider/priceRangeSlider";
import CheckboxOpt2 from "../ChckboxOpt2/checkboxOpt";
import { FaArrowLeftLong } from "react-icons/fa6";
import ShimmerProductCard from "../productSkeleton/productSkeleton";
import Pagination from "../pagenation/pagenation";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { MdOutlineArrowRight, MdOutlineArrowLeft } from "react-icons/md";
import { CartContext } from "../../context/addToCart";

import CategoryCard2 from "../categoryCard2/categoryCard2";
import SortDropdown from "../customDropdown/customDropDown";
import SideCart from "../SideCart/SideCart";
import GridToggle from "../gridToggle/gridToggle";
import ComingSoonPopup from "../comingSoon/comingSoon";
import ComingSoonPopupMain from "../comingSoon2/comingSoon";

export default function Category({ deptCategories }) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const scrollRef = useRef(null);
  const scrollRefTop = useRef(null);

  const {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    setShowSideCart,
  } = useContext(CartContext);


  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };






  console.log("Department Categories:", deptCategories);

  // Get category ID from URL like /category/[categoryId]
  const categoryId = params?.categoryId;

  // Get page from query string (default = 1)
  const pageFromURL = Number(searchParams.get("page")) || 1;

  const sortOptions = ["Relevance", "Price: Low to High", "Price: High to Low", "Newest First"];

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(pageFromURL);
  const [totalPages, setTotalPages] = useState(1);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);



  useEffect(() => {
    // scroll selected card into view
    if (scrollRefTop.current) {
      scrollRefTop.current.scrollIntoView({
        behavior: "smooth",
        inline: "center", // horizontal scroll
        block: "nearest",
      });
    }
  }, [categoryId, deptCategories]); // run whenever selected category changes




  const limit = 20;

  const brands = ["Tysen", "Perdue", "Halal Chicken CO"];
  const modes = [
    { id: "lb", name: "Pound" },
    { id: "kg", name: "Kilogram" },
    { id: "each", name: "Each" },
  ];

  useEffect(() => {
    async function fetchData() {
      if (!categoryId) return;
      setLoading(true);
      const res = await getCategoryProductsData(limit, page, categoryId);
      if (res.data) setProducts(res.data);
      if (res.pagination) {
        setPagination(res.pagination);
        setTotalPages(res.pagination?.totalPages);
        setTotalProducts(res.pagination?.totalProducts);
      }
      setLoading(false);
    }

    fetchData();
  }, [categoryId, page]);



  // 🧭 Update URL when page changes
  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("page", page);
    router.replace(`?${currentParams.toString()}`, { scroll: false });
  }, [page, router]);

  const nextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  useEffect(() => {
    if (!loading) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [loading]);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };


  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScroll(); // initial check

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll); // recalc on resize

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [deptCategories]);


  const [activeView, setActiveView] = useState(1);
  const [isOpen, setIsOpen] = useState(false)

  const handleNextAisle = () => {
    if (!deptCategories || deptCategories.length === 0) return;

    const currentIndex = deptCategories.findIndex(
      (cat) => cat._id === categoryId
    );

    const nextIndex =
      currentIndex === -1
        ? 0
        : (currentIndex + 1) % deptCategories.length;

    const nextCategory = deptCategories[nextIndex];

    setPage(1);
    router.push(`/category/${nextCategory._id}?page=1`, {
      scroll: false,
    });
  };




  return (
    <div className="main_category_page">
      {/* HEADER */}
      <div className="category-header">
        <div className="category-Image-with-name">
          <img src="/assets/Images/depart1.png" alt="category" />
          <span>Butcher Shop</span>
        </div>
        {deptCategories && deptCategories.length > 0 && (
          <div className="dept-categories-wrapper">
            {canScrollLeft && (
              <button className="scroll-btn left" onClick={scrollLeft}>
                <MdOutlineArrowLeft size={25} />
              </button>
            )}

            <div className="dept-categories-scroll" ref={scrollRef}>
              {deptCategories.map((cat, i) => {
                const isSelected = cat._id === categoryId;
                return (
                  <CategoryCard2
                    ref={isSelected ? scrollRefTop : null}
                    isSelected={isSelected}
                    key={i}
                    image={"https://api.delcofarmersmarket.com" + cat.image}
                    catName={cat.name}
                    onClick={() => {
                      setPage(1);
                      router.push(`/category/${cat._id}?page=1`, { scroll: false });
                    }}
                  />
                );
              })}
            </div>

            {canScrollRight && (
              <button className="scroll-btn right" onClick={scrollRight}>
                <MdOutlineArrowRight size={25} />
              </button>
            )}

          </div>


        )}
        {cart.length === 0 && <span onClick={handleNextAisle} className="next-aisle-btn">
          Next Aisle <HiArrowNarrowRight />
        </span>}
      </div>
      <div className="archive_product_section">
        {/* ---------- LEFT FILTERS ---------- */}
        <div className="left_side_filters">
          <div className="filter_section_header">
            <h2>Filters</h2>
            <div className="close_btn_filter">
              {/* <FaArrowLeftLong size={20} /> */}
            </div>
          </div>

          <AccordionFilter title="Price Range">
            <div className="filter_block">
              <PriceRangeSlider min={10} max={100} />
            </div>
          </AccordionFilter>

          <AccordionFilter title="Brand">
            <div className="filter_block">
              <div className="filter_body">
                {brands.map((item, i) => (
                  <CheckboxOpt2 key={i} label={item} />
                ))}
              </div>
            </div>
          </AccordionFilter>

          <AccordionFilter title="Mode">
            <div className="filter_block">
              <div className="filter_body">
                {modes.map((item, i) => (
                  <CheckboxOpt2 key={i} label={item.name} id={item.id} />
                ))}
              </div>
            </div>
          </AccordionFilter>
        </div>

        {/* ---------- RIGHT PRODUCTS GRID ---------- */}
        <div className="right_side_products" >
          <div className="right_side_products_header">
            <div className="heading_rsph">
              <h2>{totalProducts} Products Found</h2>
              {/* <p>Starting From $5</p> */}
            </div>
            <SortDropdown options={sortOptions} />
            <GridToggle activeView={activeView} onOneColumn={() => {
              setActiveView(1)
            }} onTwoColumn={() => {
              setActiveView(2)
            }} />
          </div>


          {loading ? (

            <div className={activeView === 1 ? "product_grid" : "product_grid two"}>
              {Array.from({ length: 12 }).map((_, i) => (
                <ShimmerProductCard key={i} isArchivePage={true} />
              ))}
            </div>

          ) : products.length > 0 ? (
            <div className={activeView === 1 ? "product_grid" : "product_grid two"}>
              {products.map((product, i) => (
                <div onClick={() => { setIsOpen(true); console.log("workinggggg") }}>  <ProductCard isArchivePage={true} key={i} product={product} /></div>
              ))}
            </div>
          ) : (
            <div className="no_products">No products found</div>
          )}

          <Pagination
            prevPage={prevPage}
            page={page}
            totalPages={totalPages}
            nextPage={nextPage}
            goToPage={(num) => setPage(num)}
          />
        </div>
      </div>
      <ComingSoonPopupMain isOpen={isOpen} onClose={() => { setIsOpen(false) }} />
    </div>
  );
}
