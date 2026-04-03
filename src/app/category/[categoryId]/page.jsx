import Category from "@/components/Category/Category";
import Header from "@/components/Header/Header";
import { getDeptCategories } from "@/lib/api";
import React from "react";
import SideCart from "@/components/SideCart/SideCart";
import Footer_2 from "@/components/footer_2/footer";
import FtBanner from "@/components/footerBanner/ftBanner";

export default async function Page({ params, searchParams }) {
  // ­ЪДа Server-side fetch (runs before render)
  const deptCategories = await getDeptCategories("68b5adf44ecbd3f008330c1a");

  return (
    <div>
      <Header />
      {/* Pass server-fetched data to client Category component */}
      
      <div className={`main-layout`}>
        <div className="main-content">
            <Category deptCategories={deptCategories} />
            <SideCart/>
        </div>
        
      </div>
      
      <Footer_2/>
    </div>
  );
}
