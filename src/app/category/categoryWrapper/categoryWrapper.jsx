"use client";

import React, { Suspense } from "react";
import Category from "@/components/Category/Category";

export default function CategoryClientWrapper({ deptCategories }) {
  return (
    <Suspense fallback={<div>Loading category...</div>}>
      <Category deptCategories={deptCategories} />
    </Suspense>
  );
}
