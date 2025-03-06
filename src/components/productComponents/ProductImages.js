import Image from "next/image";
import React, { useEffect } from "react";
import ProductCarousel from "./ProductCarousel";

export default function ProductImages({ images, on_sale }) {
  useEffect(() => {}, [images]);
  
  if (images?.length > 0) {
    return (
      <div className="md:w-1/2 w-full mb-10 relative">
        {on_sale && (
          <span className="bg-rachel-red-800 absolute text-xs text-white px-2 rounded-md top-3 left-3 z-20">
            Promotion
          </span>
        )}

        {images.length === 1 ? (
          <div className="relative aspect-square xl:aspect-video overflow-hidden">
            <Image
              alt={images[0]?.name || "Product - Car web"}
              fill
              className="object-contain object-center rounded w-full aspect-square"
              src={images[0]?.src || "/slider2.jpg"}
            />
          </div>
        ) : (
          <ProductCarousel data={images} />
        )}
      </div>
    );
  }

  return(<div className="md:w-1/2 w-full mb-10 relative">
    <div className="relative aspect-square xl:aspect-video overflow-hidden">
      <Image
        alt={"thumbnail"}
        fill
        className="object-cover object-center rounded w-full aspect-square"
        src={"/slider2.jpg"}
      />
    </div>
  </div>)
}
