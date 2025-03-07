import ProductCard from "@/components/homeComponents/ProductCard";
import Filter from "@/components/shopComponents/Filter";
import useUserVehicle from "@/hooks/useUserVehicle";
import Layout from "@/layout";
import { allBrands, getProductsByBrand } from "@/lib/api";
import { Label, Select } from "flowbite-react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { use } from "react";
import ContentLoader from "react-content-loader";
import ReactPaginate from "react-paginate";

const DoorDashFavorite = (props) => (
  <ContentLoader
    viewBox="0 0 450 400"
    backgroundColor="#f0f0f0"
    foregroundColor="#dedede"
    className="w-full"
    uniqueKey="a11"
    {...props}
  >
    <rect x="43" y="304" rx="4" ry="4" width="271" height="9" />
    <rect x="44" y="323" rx="3" ry="3" width="119" height="6" />
    <rect x="42" y="77" rx="10" ry="10" width="388" height="217" />
  </ContentLoader>
);

export default function Shop({ results, brands, headers }) {
  const router = useRouter();
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalProduct, setTotalproducts] = useState(0);
  const page = useRef(1);
  const [perPage, setPerPage] = useState(24);
  const [pageTotal, setPageTotal] = useState(1);
  const [orderBy, setOrderBy] = useState("date");
  const [order, setOrder] = useState("desc");
  const [vehicle, setVehicle] = useState();
  const [sale, setSale] = useState();
  const firstRender = useRef(1);

  const categoryUpdate = (data) => {
    if (data.delete) {
      setCategory((curr) => curr.filter((x) => x !== data.id));
    }
    if (data.clear) {
      category.length > 0 && setCategory([]);
    } else {
      if (!category.includes(data.id))
        setCategory((curr) => [...curr, data.id]);
    }

    page.current = 1;
  };

  const brandsUpdate = (data) => {
    if (data.delete) {
      setBrand((curr) => curr.filter((x) => x !== data.id));
    }
    if (data.clear) {
      brand.length > 0 && setBrand([]);
    } else {
      if (!brand.includes(data.id)) setBrand((curr) => [...curr, data.id]);
    }

    page.current = 1;
  };

  function handlePageClick({ selected }) {
    if (selected === 0) {
      page.current = 1;
    } else {
      page.current = selected + 1;
    }
    getUpdatedProducts();
  }

  // fetch products method
  const getUpdatedProducts = async (cat = category, bran = brand) => {
    setLoading(true);
    try {
      const params = [
        cat,
        bran,
        sale || "",
        ...(vehicle === "1"
          ? [
              router.query.year || "",
              router.query.make || "",
              router.query.model || "",
              router.query.submodel || "",
            ]
          : ["", "", "", ""]),
        perPage,
        page.current,
        orderBy,
        order,
      ];

      const { data, headers } = (await getProductsByBrand(...params)) || {};

      if (data) {
        setProducts(data);
        setPageTotal(headers?.["x-wp-totalpages"]);
        setTotalproducts(headers?.["x-wp-total"]);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const orderByEventHandler = (e) => {
    setOrderBy(e.target.value);
    page.current = 1;
  };

  const perPageEventHandler = (e) => {
    setPerPage(e.target.value);
    page.current = 1;
  };

  const orderEventHandler = (e) => {
    setOrder(e.target.value);
    page.current = 1;
  };

  // EFFECTS
  // first render effect
  useEffect(() => {
    results?.length > 0 && setProducts(results);

    setPageTotal(headers?.["x-wp-totalpages"]);
    setTotalproducts(headers?.["x-wp-total"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * checkRender is a function that checks the router query parameters and manages
   * the rendering of updated products on the shop page. If the query has a
   * "categorie_id", "marque", or "sale" key and it's the second render or beyond,
   * it fetches updated products. If this is the first render, it increments the
   * render count. If no relevant query parameters are present and it's at least
   * the first render, it fetches updated products; otherwise, it increments the
   * render count.
   */

  function checkRender() {
    if (router.query.categorie_id || router.query.marque || router.query.sale) {
      if (firstRender.current >= 2) {
        getUpdatedProducts();
      } else {
        firstRender.current += 1;
      }
    } else if (firstRender.current > 1) {
      getUpdatedProducts();
    } else {
      firstRender.current += 1;
    }
  }

  useEffect(() => {
    checkRender();
  }, [brand, category, vehicle, orderBy, perPage, order, sale]);

  /**
   * checkRouter is a function that checks if the router query changed and
   * updates the state of the shop page accordingly. It sets the vehicle
   * state to "1" if the query has a "par_vehicule" key with a value of "1"
   * and the first render count is greater or equal to 2. If the query
   * changes to a blank shop, it resets the page, category, brand and
   * vehicle states. It also sets the category and brand states if the
   * query has a "categorie_id" or "marque" key.
   */
  function checkRouter() {
    if (router.query.categorie_id || router.query.marque) {
      if (firstRender.current >= 2 && router.query?.par_vehicule === "1") {
        setVehicle("1");
      }
    } else if (firstRender.current >= 1 && router.query?.par_vehicule === "1") {
      setVehicle("1");
    }
    // if router change to shop blank needs to empty everything
    page.current = 1;
    !router.query.categorie_id
      ? setCategory([])
      : setCategory([router.query.categorie_id]);
    !router.query.marque ? setBrand([]) : setBrand([router.query.marque]);
    !router.query.par_vehicule && setVehicle(null);
    !router.query.sale && setSale(null);
  }

  useEffect(() => {
    checkRouter();
  }, [router]);

  return (
    <Layout>
      <Head>
        <title key={"boutique"}>
          {`Boutique | ${process.env.NEXT_PUBLIC_WEBSITE_TITLE}`}
        </title>
      </Head>
      <div className="flex flex-col items lg:flex-row  px-1 container mx-auto">
        {/* sidebar */}
        <aside className="lg:w-4/12 pt-16 lg:pt-2 mb-10 lg:my-0 ">
          <Filter
            brands={brands}
            brandsUpdate={brandsUpdate}
            categoryUpdate={categoryUpdate}
            productsLoading={loading}
            activeCategories={category}
            activeBrands={brand}
            vehicle={router.query.par_vehicule}
          />
        </aside>

        {/* products */}
        <section className="flex-grow px-4 lg:w-8/12  xl:px-6">
          <div className="mb-6 flex-col lg:flex-row gap-y-4 flex justify-center md:justify-between items-center lg:items-start flex-wrap md:flex-nowrap pt-2">
          <div className="">
              <div className="flex items-center gap-x-2">
                <p className="">Filtres activés:</p>
                <div className="flex gap-x-2">
                  {category.length > 0 && (
                    <span className="px-2 py-1 bg-gray-200 rounded-full text-xs">
                      Catégories
                    </span>
                  )}
                  {brand.length > 0 && (
                    <span className="px-2 py-1 bg-gray-200 rounded-full text-xs">
                      Marques
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className=" text-center md:text-left mb-4 md:mb-0">
              {!loading && products?.length > 0 && (
                <p className="text-sm font-light">
                 
                  <span className="font-semibold">
                   ( {perPage * page.current < totalProduct
                      ? products?.length * page.current
                      : totalProduct}{" "}
                    sur {totalProduct} )
                  </span> Produits
                </p>
              )}
            </div>
            
            <div className="flex justify-end  gap-x-5">
              <div className="flex items-center gap-x-2 flex-col">
                <Label htmlFor="order" value="Tri" />
                <Select
                  id="order"
                  onChange={(e) => orderEventHandler(e)}
                  disabled={loading}
                  className="cursor-pointer"
                  value={order}
                >
                  <option value={"asc"}>Asc</option>
                  <option value="desc">Desc</option>
                </Select>
              </div>
              <div className="flex items-center gap-x-2 flex-col">
                <Label htmlFor="orderBy" value="Trier par" />
                <Select
                  id="orderBy"
                  onChange={(e) => orderByEventHandler(e)}
                  disabled={loading}
                  value={orderBy}
                  className="cursor-pointer"
                >
                  <option value={"date"}>Date</option>
                  <option value="title">Titre</option>
                  <option value="price">Prix</option>
                  <option value="rating">Évaluation</option>
                  <option value="popularity">Popularité</option>
                </Select>
              </div>
              <div className="flex items-center gap-x-2 flex-col">
                <Label htmlFor="perPage" value="Par page" />
                <Select
                  id="perPage"
                  onChange={(e) => perPageEventHandler(e)}
                  disabled={loading}
                  className="cursor-pointer"
                  value={perPage}
                >
                  <option value={"12"}>12</option>
                  <option value="24">24</option>
                  <option value="36">36</option>
                  <option value="48">48</option>
                  <option value="60">60</option>
                </Select>
              </div>
            </div>
          </div>

          <div className="grow grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 min-h-[20vh]">
            
            {!loading ? (
              products?.length > 0 ? (
                products?.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))
              ) : (
                <p className="w-full text-center my-40 col-span-5">
                  {
                    "Aucun résultat trouvé. Essayez d'ajuster vos filtres ou explorer d'autres catégories !"
                  }
                </p>
              )
            ) : (
              <>
                {Array.from({ length: 5 }, (_, i) => (
                  <DoorDashFavorite key={i} />
                ))}
              </>
            )}
          </div>
          {!loading &&
            (pageTotal > 0 ? (
              <div className="!mt-auto">
                <ReactPaginate
                  previousLabel={"← Précedent"}
                  nextLabel={"Suivant →"}
                  pageCount={+pageTotal}
                  forcePage={page.current - 1}
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={1}
                  marginPagesDisplayed={2}
                  containerClassName={
                    "pagination w-full flex gap-x-2 justify-center my-8 "
                  }
                  previousLinkClassName={
                    "pagination__link hover:text-rachel-red-700"
                  }
                  nextLinkClassName={
                    "pagination__link hover:text-rachel-red-700"
                  }
                  disabledClassName={
                    "pagination__link--disabled text-gray-500 cursor-default hover:text-gray-500"
                  }
                  activeClassName={
                    "pagination__link--active text-rachel-red-700"
                  }
                />
              </div>
            ) : (
              ""
            ))}
        </section>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  let categories = ctx.query.categorie_id ? ctx.query.categorie_id : "";
  let brands = ctx.query.marque ? ctx.query.marque : "";
  let sale = ctx.query.sale ? ctx.query.sale : "";

  let byVehicle = ctx.query.par_vehicule ? ctx.query.par_vehicule : "";
  let year = ctx.query.year ? ctx.query.year : "";
  let make = ctx.query.make ? ctx.query.make : "";
  let model = ctx.query.model ? ctx.query.model : "";
  let submodel = ctx.query.submodel ? ctx.query.submodel : "";

  let params = [categories, brands];

  if (
    byVehicle !== "" &&
    make !== "" &&
    model !== "" &&
    year !== "" &&
    submodel !== ""
  ) {
    params = [categories, brands, sale, year, make, model, submodel];
  }
  if (sale !== "") {
    params.push(true);
  }

  const { data: products, headers: prodHeaders } = await getProductsByBrand(
    ...params
  );

  return {
    props: {
      results: products || [],
      headers: prodHeaders || [],
    },
  };
}
