import { getBrandsPage } from "@/lib/api";
import { Accordion, Badge, Checkbox, Label } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import ContentLoader from "react-content-loader";
import ReactPaginate from "react-paginate";
import useBrands from "@/hooks/useBrands";
import useBrandsPartsCount from "@/hooks/useBrandsPartsCount";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function BrandsFilter({
  brandsUpdate,
  activeBrands,
  productsLoading,
  reset,
}) {
  const LoaderPlaceHolder = (props) => (
    <ContentLoader
      uniqueKey="catLoader"
      viewBox="0 0 400 150"
      height={130}
      width={400}
      {...props}
    >
      <circle cx="10" cy="20" r="8" />
      <rect x="0" y="15" rx="5" ry="5" width="220" height="10" />
      <circle cx="10" cy="50" r="8" />
      <rect x="0" y="45" rx="5" ry="5" width="220" height="10" />
      <circle cx="10" cy="80" r="8" />
      <rect x="0" y="75" rx="5" ry="5" width="220" height="10" />
      <circle cx="10" cy="110" r="8" />
      <rect x="0" y="105" rx="5" ry="5" width="220" height="10" />
    </ContentLoader>
  );

  const [brands, setBrands] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const page = useRef(1);
  const [loading, setLoading] = useState(true);
  const per_page = 30;

  const {
    brands: { data, headers },
    isLoading,
  } = useBrands(page.current);
  const { brandsCount, isCountLoading, isError, mutate } =
    useBrandsPartsCount();

  const getBrands = () => {
    setLoading(true);
    setBrands(data);
    setTotalPages(headers?.["x-wp-totalpages"]);

    setLoading(isLoading);
  };

  function handlePageClick({ selected }) {
    page.current = selected + 1;
    getBrands();
  }

  function clearSelection() {
    brandsUpdate({ clear: true });
  }

  useEffect(() => {
    setLoading(isLoading);
    setBrands(data);
    setTotalPages(headers?.["x-wp-totalpages"]);
  }, [isLoading, data]);

  useEffect(() => {}, [brands]);

  const handleBrandsClick = (e) => {
    if (e.target.checked) {
      brandsUpdate({ clear: true });
      brandsUpdate({ delete: false, id: e.target.id });
    } else {
      brandsUpdate({ delete: true, id: e.target.id });
    }
  };
  useEffect(() => {
    reset > 0 && clearSelection();
  }, [reset]);

  return (
    <div className="mb-4">
      {loading ? (
        <Accordion collapseAll>
          <Accordion.Panel>
            <Accordion.Title className=" !py-4 font-semibold text-sm !ring-0 text-black">
              Marques
            </Accordion.Title>
            <Accordion.Content className="!py-2">
              <LoaderPlaceHolder />
              <LoaderPlaceHolder />
              <LoaderPlaceHolder />
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      ) : (
        <Accordion collapseAll>
          <Accordion.Panel>
            <Accordion.Title className=" !py-4 font-semibold text-sm !ring-0 text-black ">
              <div className="flex items-center ">
              Marques{" "}
              {brandsCount?.length > 0 && (
                <span>&nbsp;compatibles: {brandsCount.length}</span>
              )}
              {activeBrands.length > 0 && (
                <CheckCircleIcon className=" w-5 h-5 fill-rachel-red-900 ml-2" />
              )}
              </div>
            </Accordion.Title>
            <Accordion.Content className="!py-2">
              <span
                className="my-5 text-sm underline-offset-4 underline decoration-rachel-red-700 cursor-pointer"
                onClick={clearSelection}
              >
                Effacer tout
              </span>
              {brands.length > 0 &&
                brands.map(
                  (brand) =>
                    brand.all_term.count > 0 && (
                      <div
                        key={brand.id}
                        className="flex items-center gap-2 mt-2 last:mb-2"
                      >
                        <Checkbox
                          id={brand.id}
                          disabled={productsLoading}
                          onChange={(e) => {
                            handleBrandsClick(e);
                          }}
                          checked={activeBrands.includes(String(brand.id))}
                          className="cursor-pointer disabled:cursor-not-allowed"
                        />
                        <Label
                          htmlFor={brand.id}
                          className="flex items-center grow"
                        >
                          <p dangerouslySetInnerHTML={{ __html: brand.name }} />
                          {!isCountLoading && brandsCount.length > 0 && (
                            <span className="text-black text-xs ml-auto font-bold">
                              {brandsCount.find((c) => c.id === brand.id)
                                ?.count > 0 &&
                                "(" +
                                  brandsCount.find((c) => c.id === brand.id)
                                    ?.count +
                                  ")"}
                            </span>
                          )}
                        </Label>
                      </div>
                    )
                )}
              {totalPages > 0 && !loading ? (
                <ReactPaginate
                  previousLabel={"← Précedent"}
                  nextLabel={"Suivant →"}
                  pageCount={+totalPages}
                  forcePage={page.current - 1}
                  onPageChange={handlePageClick}
                  containerClassName={
                    "pagination w-full flex gap-x-2 justify-center my-8"
                  }
                  previousLinkClassName={
                    "pagination__link hover:text-rachel-red-700 text-sm"
                  }
                  nextLinkClassName={
                    "pagination__link hover:text-rachel-red-700 text-sm"
                  }
                  disabledClassName={
                    "pagination__link--disabled text-gray-500 cursor-default hover:text-gray-500"
                  }
                  activeClassName={
                    "pagination__link--active text-rachel-red-700"
                  }
                />
              ) : (
                ""
              )}
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      )}
    </div>
  );
}
