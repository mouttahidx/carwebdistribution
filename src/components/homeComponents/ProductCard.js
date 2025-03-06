import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProductVariations } from "@/lib/api";
import ContentLoader from "react-content-loader";

export default function ProductCard({ product, searchTerm }) {
  /* -------------------- prepare loading placeholder data -------------------- */
  const MyLoader = (props) => (
    <ContentLoader
      speed={2}
      width={70}
      height={11}
      viewBox="0 0 70 11"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="0" rx="3" ry="3" width="67" height="11" />
    </ContentLoader>
  );
  const [isLoading, setIsLoading] = useState(false);

  /* ---------------- work prices if simple or variable product --------------- */
  const Prices = () => {
    if (isLoading) {
      return <MyLoader />;
    }

    if (product.type === "simple" || product.type == "variation") {
      return product?.on_sale && product?.on_sale !== "" ? (
        <div className="font-semibold flex justify-between gap-x-1">
          <span className="font-medium line-through text-rachel-black-500">
            {new Intl.NumberFormat("fr-CA",{style:"currency",currency:"cad"}).format(product?.regular_price)}
          </span>
          <span className="">
            
            {(product?.sale_price && new Intl.NumberFormat("fr-CA",{style:"currency",currency:"cad"}).format(Number(product?.sale_price).toFixed(2))) ||
              0}
          </span>
        </div>
      ) : (
        <span className="font-semibold">
          {product?.price && new Intl.NumberFormat("fr-CA",{style:"currency",currency:"cad"}).format((+product?.price).toFixed(2))}
        </span>
      );
    }
    if (product.type === "variable") {
      return (
        <span className="font-semibold">
          <p className="font-normal text-xs">à partir de:</p>
          {new Intl.NumberFormat("fr-CA",{style:"currency",currency:"cad"}).format(Number(product?.price).toFixed(2))}
        </span>
      );
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                               product render                               */
  /* -------------------------------------------------------------------------- */
  return (
    <Link
      key={product.id}
      href={"/produits/" + product?.slug}
      className="flex flex-col justify-start h-full items-start w-full border rounded-md"
    >
      {/* product image */}
      <div className="rounded-t-md relative w-full h-44 border-b">
        <Image
          src={
            product?.image ||
            (product?.images?.length > 0 && product?.images[0]?.src) ||
            product?.categories_image ||
            "/slider2.jpg"
          }
          fill
          sizes="100vw"
          className={`rounded-t-md object-${
            product?.categories_image ? "cover" : "contain"
          } w-full`}
          alt={product.name || "thumbnail of product"}
        />

        {/* ------------------------- product promotion badge ------------------------ */}
        {(product?.on_sale ||
          (product.supplier?.length > 0 &&
            product?.supplier[0]?.term_id === 29339)) && (
          <span className="bg-rachel-red-800 absolute z-[9] text-xs text-white px-2 rounded-md top-2 right-2">
            Promotion
          </span>
        )}
      </div>

      <div className="px-2 py-3 w-full bg-white rounded-md flex flex-col grow">
        {/* category */}
        <div className="flex gap-y-2 flex-wrap max-h-11 overflow-hidden rounded-md mb-1 truncate">
          {product?.categories &&
            product?.categories?.map((cat) => (
              <p
                key={cat.slug}
                className="text-xs bg-rachel-black-100 h-fit max-h-10 p-1 rounded mr-2 w-fit max-w-[180px] break-words truncate"
                dangerouslySetInnerHTML={{ __html: cat.name }}
              />
            ))}
        </div>

        {/* name */}
        <div className="mt-1 overflow-hidden mb-2">
          <h2
            className="text-sm capitalize break-words h-fit"
            dangerouslySetInnerHTML={{ __html: product.name }}
          />
        </div>

        {/* price and rating */}
        <div className="block mt-auto">
          <Prices />
        </div>

        {/* brand tags */}
        {product?.brands && product?.brands?.length > 0 && (
          <span className="mt-2 text-sm text-rachel-black-500 ml-0.5 overflow-hidden h-5 block">
            {product?.brands?.map((brand, i, arr) => {
              if (i < arr.length - 1) {
                return <span key={brand.term_id}>{brand.name + ", "}</span>;
              } else {
                return <span key={brand.term_id}>{brand.name}</span>;
              }
            })}
          </span>
        )}
      </div>
    </Link>
  );
}
