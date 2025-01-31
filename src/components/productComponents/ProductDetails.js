import React, { useEffect } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function ProductDetails({
  categories,
  name,
  average_rating,
  price,
  short_description,
  regular_price,
  sale_price,
  on_sale,
  sku,
  metadata,
  brands,
}) {
  return (
    <div className="mb-6">
      {/* name */}
      <h1 className="text-gray-900 text-2xl lg:text-4xl font-semibold  my-4">
        {name}
      </h1>

      {/* rating */}

      {+average_rating > 0 && (
        <div className="my-4 flex items-center">
          {[...Array(Math.floor(+average_rating))].map((e, i) => (
            <StarIcon key={i} className="text-rachel-red-700 w-5 h-5" />
          ))}
          <span className="ml-1 pt-1">({average_rating})</span>
        </div>
      )}

      {/* price */}
      {on_sale && sale_price && (
        <div className="font-semibold flex justify-start gap-x-2 my-4">
          <span className="font-medium line-through text-2xl lg:text-4xl text-rachel-black-500">
            {regular_price && "$" + Number(regular_price).toFixed(2)}
          </span>
          <span className=" text-2xl lg:text-4xl ">
            ${Number(sale_price).toFixed(2) || 0}
          </span>
        </div>
      )}
      {!on_sale && (
        <span className="font-semibold text-2xl lg:text-4xl">
          {price !== "Non disponible" && price !== "" && !isNaN(price) && "$"}
          {isNaN(price) ? 
          <div dangerouslySetInnerHTML={{__html:price}} />
          : 
          price}
        </span>
      )}

      {/* short description */}
      <h5
        className="my-4 text-sm text-rachel-black-400"
        dangerouslySetInnerHTML={{ __html: short_description }}
      />
      {/* SKU  */}
      {sku !== "" && (
        <h5 className="my-4 text-sm text-rachel-black-600">
          <b>UGS:</b> {sku}
        </h5>
      )}
      {/* Part N */}
      {metadata?.length > 0 && metadata[0]?.value && (
        <h5 className="my-4 text-sm text-rachel-black-600">
          <b>Numéro de modéle:</b> {metadata[0]?.value}
        </h5>
      )}

      {/* category */}
      <div className="flex gap-y-2 flex-wrap items-center gap-x-2 overflow-hidden ">
        <span className="text-sm text-rachel-black-600 font-bold">
          Catégories:
        </span>{" "}
        {categories?.map((cat) => (
          <Link
            href={"/boutique?categorie_id=" + cat.id}
            key={cat.id}
            className="text-xs bg-rachel-black-100 p-1.5 rounded mr-2 hover:text-rachel-red-600 duration-200"
            dangerouslySetInnerHTML={{ __html: cat.name }}
          />
        ))}
      </div>
      {/* Marque */}
      <div className="flex gap-y-2 flex-wrap items-center gap-x-2 overflow-hidden mt-4">
        <span className="text-sm text-rachel-black-600 font-bold">Marque:</span>{" "}
        {brands && brands?.length > 0 && (
          <Link
            href={"/boutique?marque=" + brands[0].term_id}
            className="text-xs bg-rachel-black-100 p-1.5 rounded mr-2 hover:text-rachel-red-600 duration-200"
          >
            {brands[0].name}
          </Link>
        )}
      </div>
    </div>
  );
}
