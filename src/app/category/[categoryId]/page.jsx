import Category from "@/components/Category/Category";
import Header from "@/components/Header/Header";
import { getDeptCategories } from "@/lib/api";
import React from "react";
import SideCart from "@/components/SideCart/SideCart";

export default async function Page({ params, searchParams }) {
  // 🧠 Server-side fetch (runs before render)
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
    </div>
  );
}
