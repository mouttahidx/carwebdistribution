import BrandsCard from "@/components/brandsComponents/BrandsCard";
import Layout from "@/layout";
import {  getBrandsPage } from "@/lib/api";
import React, { useEffect, useRef, useState } from "react";
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

export default function Marques({ brands,headers}) {
  const [loading, setLoading] = useState(false);
  const [totalProduct, setTotalproducts] = useState(0);
  const [products,setProducts] = useState([])
  const page = useRef(1);
  const [perPage, setPerPage] = useState(5);
  const [pageTotal, setPageTotal] = useState(1);


  function handlePageClick({ selected }) {
    page.current = selected + 1;
    getUpdatedProducts();
  }

  // first render effect
  useEffect(() => {
    setProducts(brands);
    setPageTotal(headers?.["x-wp-totalpages"]);
    setTotalproducts(headers?.["x-wp-total"]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  
  // fetch products methode
  const getUpdatedProducts = async () => {
    
    setLoading(true);
    const { data, headers } =
      (await getBrandsPage(perPage, page.current)) || {};
    setProducts(data);
    setPageTotal(headers?.["x-wp-totalpages"]);
    setTotalproducts(headers?.["x-wp-total"]);
    setLoading(false);
  };

  return (
    <Layout>
      <div className="flex flex-col items lg:flex-row lg:gap-x-8">


        {/* marques */}
        <section className="flex-grow lg:w-9/12 xl:10/12 xl:px-6">
          <div className="mb-6 flex justify-between">
            <div>
              {products?.length > 0 && (
                !loading && <p className="text-sm font-light">
                Affichage de{" "}
                <span className="font-semibold">
                  {perPage < totalProduct ? products?.length : totalProduct} sur{" "}
                  {totalProduct}
                </span>{" "}
                marques
              </p>
              )}
            </div>
            
          </div>

          <div className="grow grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {!loading ? (
              products?.length > 0 ? (
                products.map((product) => (
                  <BrandsCard item={product } key={product.id}/>
                ))
              ) : (
                <p>Il n&apos;ya aucun produit.</p>
              )
            ) : (
              <>
                {Array(5)
                  .fill()
                  .map((e, i) => (
                    <DoorDashFavorite key={i} />
                  ))}
              </>
            )}
          </div>
          {!loading &&
            (pageTotal > 0 ? (
              <ReactPaginate
                previousLabel={"← Précedent"}
                nextLabel={"Suivant →"}
                pageCount={+pageTotal}
                forcePage={page.current - 1}
                onPageChange={handlePageClick}
                containerClassName={
                  "pagination w-full flex gap-x-2 justify-center my-8"
                }
                previousLinkClassName={
                  "pagination__link hover:text-rachel-red-700"
                }
                nextLinkClassName={"pagination__link hover:text-rachel-red-700"}
                disabledClassName={
                  "pagination__link--disabled text-gray-500 cursor-default hover:text-gray-500"
                }
                activeClassName={"pagination__link--active text-rachel-red-700"}
              />
            ) : (
              ""
            ))}
        </section>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  
  const {data,headers}  = await getBrandsPage(30);

  return {
    props: {
      brands: data || [],
      headers: JSON.parse(JSON.stringify(headers)) || [],
    },
  };

}
