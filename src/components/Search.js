import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef, useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import Image from "next/image";
import Link from "next/link";
import {
  searchCategory,
  searchProductCustom,
  searchProductNav,
} from "@/lib/api";
import { useRouter } from "next/router";
import { Spinner } from "flowbite-react";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const [noResult, setNoResult] = useState(false);
  const router = useRouter();
  const hideSearch = () => {
    setResult([]);
    setNoResult(false);
  };
  useOutsideClick(ref, hideSearch);

  useEffect(() => {
    let getData;

    const getResults = async () => {
      setLoading(true);

      const { data: products } = await searchProductNav(searchQuery);
      const { data: products_ids } = await searchProductCustom(searchQuery);
      const { data: categories } = await searchCategory(searchQuery);

      let result_local = [...products, ...products_ids];
      setResult(result_local);
      setCategories(categories);

      if (result_local.length === 0) {
        setNoResult(true);
      } else {
        setNoResult(false);
      }
      setLoading(false);
    };
    if (searchQuery !== "" && searchQuery.length >= 3) {
      getData = setTimeout(() => {
        getResults();
      }, 900);
    } else {
      setResult([]);
      setNoResult(false);
    }

    return () => clearTimeout(getData);
  }, [searchQuery]);

  useEffect(() => {
    setSearchQuery("");
    setResult([]);
  }, [router]);


  function goSearch() {
    setLoading(false);
    searchQuery !== "" &&
      searchQuery.length >= 3 &&
      router.push("/recherche?produit=" + searchQuery);
    
  }
  return (
    <>
      <div className="relative w-full">
        <input
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          value={searchQuery}
          className="relative pr-8 pl-3 w-full bg-gray-50 placeholder:text-sm placeholder:text-gray-400 py-1  border text-md rounded-md"
          placeholder="Rechercher par marque, model, année, produit..."
        />
        {loading ? (
          <Spinner className="right-2 absolute top-1 fill-rachel-red-700" />
        ) : (
          <MagnifyingGlassIcon
            className=" hover:cursor-pointer hover:text-red-700 w-6 h-6 right-2 top-1 z-50 absolute text-gray-500"
            onClick={() => {
              goSearch();
            }}
          />
        )}
      </div>
      {result?.length > 0 ? (
        <div
          className="absolute bg-white lg:top-24 top-20 border z-50 p-4 gap-y-2 left-0 lg:left-auto w-screen lg:w-[400px] rounded "
          ref={ref}
        >
          <h3 className="font-semibold text-lg">Catégories</h3>
          <hr className="my-2" />
          {categories.length > 0 &&
            categories?.map((cat) => (
              <div
                className="py-2 border-b last:border-none hover: duration-300"
                key={cat.id}
              >
                <Link
                  href={"/boutique/?categorie_id=" + cat?.id}
                  className="flex items-center"
                >
                  <Image
                    src={cat?.image?.src || "/slider2.jpg"}
                    width={50}
                    height={50}
                    alt={cat?.name}
                    unoptimized
                  />
                  <div className="ml-2 flex flex-col">
                    <p
                      className=" hover:text-red-800 duration-500"
                      dangerouslySetInnerHTML={{ __html: cat.name }}
                    />
                    <span className="text-gray-500 text-xs">Catégorie</span>
                  </div>
                </Link>
              </div>
            ))}
          <h3 className="font-semibold text-lg mt-4">Produits</h3>
          <hr className="my-2" />
          {result?.map((res) => (
            <div
              className="py-2 border-b last:border-none hover: duration-300"
              key={res.id}
            >
              <Link
                href={"/produits/" + res?.slug}
                className="flex items-center"
              >
                <Image
                  src={res?.image || "/slider2.jpg"}
                  width={50}
                  height={50}
                  alt={res?.name}
                  unoptimized
                />
                <div className="ml-2 flex flex-col">
                  <p
                    className=" hover:text-red-800 duration-500"
                    dangerouslySetInnerHTML={{ __html: res.name }}
                  />
                  <b>
                    #{res.part_id || (res.meta_data && res.meta_data[0]?.value)}
                  </b>

                  {res?.type === "variable" ? (
                    <p className="text-sm text-red-700 pl-1">
                      Voir les options
                    </p>
                  ) : (
                    <p className="text-sm text-red-700 pl-1">${res.price}</p>
                  )}
                </div>
              </Link>
            </div>
          ))}
          <Link
            href={"/recherche?produit=" + searchQuery}
            className="mt-5 text-center w-full block hover:text-red-800 duration-500"
          >
            Voir plus
          </Link>
        </div>
      ) : (
        noResult && (
          <div
            className="absolute bg-white lg:top-24 top-20 border z-50 p-4 gap-y-2 left-0 lg:left-auto w-screen lg:w-[400px] rounded "
            ref={ref}
          >
            <h3 className="font-semibold text-md">Aucun Resultat.</h3>
          </div>
        )
      )}
    </>
  );
}
