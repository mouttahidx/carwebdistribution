import useCategories from "@/hooks/useCategories";
import useUserVehicle from "@/hooks/useUserVehicle";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Accordion, Checkbox, Label } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import ContentLoader from "react-content-loader";
import ReactPaginate from "react-paginate";
import { usePapaParse } from "react-papaparse";

export default function CategoriesFilter({
  productsLoading,
  categoryUpdate,
  activeCategories,
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

  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const page = useRef(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [localVehicle, setLocalVehicle] = useUserVehicle();
  const [categoriesCount, setCategoriesCount] = useState([]);

  async function getPartsCount() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WEBSITE_URL}/wp-json/wc/v3/user/vehicle/parts?slug=${localVehicle.slug}`
    );
    const data = await res.json();
    data && setCategoriesCount(data);
  }

  useEffect(() => {
    localVehicle && getPartsCount();
  }, [localVehicle]);

  const {
    categories: { data, headers },
    isLoading,
  } = useCategories(
    page.current,
    router.query?.parent_category === "1" ? router.query?.categorie_id : 0
  );

  const getCategories = () => {
    setLoading(true);
    setLoading(isLoading);
    setCategories(data);
    setTotalPages(headers?.["x-wp-totalpages"]);
  };

  function handlePageClick({ selected }) {
    if (selected === 0) {
      page.current = 1;
    } else {
      page.current = selected + 1;
    }

    getCategories();
  }

  function clearSelection() {
    if (router.query?.parent_category === "1") {
      const { categorie_id, parent_category, ...routerQuery } = router.query;

      router.replace({
        query: {
          ...routerQuery,
        },
      });
    } else {
      categoryUpdate({ clear: true });
    }
  }

  useEffect(() => {
    setLoading(isLoading);
    setCategories(data);
    setTotalPages(headers?.["x-wp-totalpages"]);
  }, [data, isLoading, headers]);

  useEffect(() => {
    getCategories();
  }, [router.query]);

  useEffect(() => {}, [activeCategories, categories]);

  useEffect(() => {
    reset > 0 && clearSelection();
  }, [reset]);

  const checkSubCategoryActive = function (category) {
    if (activeCategories.includes(String(category.id))) {
      return true;
    }
    return false;
  };

  const handleCategoryClick = (e) => {
    if (e.target.value === "all") {
      categoryUpdate({ clear: true });
      categoryUpdate({ delete: false, id: router.query.categorie_id });
    } else {
      if (e.target.checked) {
        if (
          router.query?.parent_category === "1" &&
          activeCategories.includes(String(router.query?.categorie_id))
        ) {
          categoryUpdate({
            delete: true,
            id: String(router.query?.categorie_id),
          });
        }
        categoryUpdate({ clear: true });
        categoryUpdate({ delete: false, id: e.target.id });
      } else {
        categoryUpdate({ delete: true, id: e.target.id });
      }
    }
  };

  return (
    <div className="mb-4">
      {loading ? (
        <Accordion>
          <Accordion.Panel>
            <Accordion.Title className=" !py-4 font-semibold text-sm !ring-0">
              Catégories
            </Accordion.Title>
            <Accordion.Content className="!py-2">
              <LoaderPlaceHolder />
              <LoaderPlaceHolder />
              <LoaderPlaceHolder />
              <LoaderPlaceHolder />
              <LoaderPlaceHolder />
              <LoaderPlaceHolder />
              <LoaderPlaceHolder />
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      ) : (
        <Accordion collapseAll={true}>
          <Accordion.Panel>
            <Accordion.Title className=" !py-4 font-semibold text-sm !ring-0 text-black">
              <div className="flex w-full justify-between items-center">
                Catégories{" "}
                {router.query.parent_category === "1"
                  ? categoriesCount.length > 0 && (
                      <span>
                        &nbsp;compatibles:{" "}
                        {
                          categoriesCount.filter((c) =>
                            categories.find((cat) => cat.id === c.id)
                          ).length
                        }
                      </span>
                    )
                  : categoriesCount.length > 0 && (
                      <span>&nbsp;compatibles: {categoriesCount.length}</span>
                    )}
                {activeCategories.length > 0 && (
                  <CheckCircleIcon className=" w-5 h-5 fill-rachel-red-900 ml-2" />
                )}
              </div>
            </Accordion.Title>
            <Accordion.Content className="!py-2 max-h-[600px] overflow-y-scroll !pb-8 px-0">
              {categories.length > 0 && (
                <span
                  className=" px-4 my-5 text-sm underline-offset-4 underline decoration-rachel-red-700 cursor-pointer font-semibold flex items-center gap-2"
                  onClick={clearSelection}
                >
                  <TrashIcon className="fill-rachel-red-900 w-5 h-5 inline" />{" "}
                  Effacer tout
                </span>
              )}

              {/* TO enable Select all */}
              {router.query?.parent_category === "1" &&
                categories.length > 0 && (
                  <div className="flex items-center gap-2 pt-4 px-4">
                    <Checkbox
                      onChange={handleCategoryClick}
                      disabled={productsLoading}
                      checked={
                        router.query?.parent_category === "1" &&
                        activeCategories.includes(
                          String(router.query?.categorie_id)
                        )
                      }
                      className="cursor-pointer disabled:cursor-not-allowed"
                      value={"all"}
                    />
                    <Label className="flex items-center grow font-semibold">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: "Sélectionner tout",
                        }}
                      />
                    </Label>
                  </div>
                )}

              {router.query?.parent_category === "1" ? (
                // If parent category is selected
                <>
                  {categories.length > 0 &&
                    categories.map((cat) => (
                      <div
                        key={cat.id}
                        className="flex items-center gap-2 pt-4 px-4"
                      >
                        <Checkbox
                          id={cat.id}
                          onChange={handleCategoryClick}
                          disabled={productsLoading}
                          key={cat.id}
                          checked={checkSubCategoryActive(cat)}
                          className="cursor-pointer disabled:cursor-not-allowed"
                        />
                        <Label
                          htmlFor={cat.id}
                          className="flex items-center grow"
                        >
                          <p dangerouslySetInnerHTML={{ __html: cat.name }} />
                          {categoriesCount.length > 0 && (
                            <span className="text-black text-xs ml-auto font-bold">
                              {categoriesCount.find((c) => c.id === cat.id)
                                ?.count > 0 &&
                                "(" +
                                  categoriesCount.find((c) => c.id === cat.id)
                                    ?.count +
                                  ")"}
                            </span>
                          )}
                        </Label>
                      </div>
                    ))}
                </>
              ) : (
                // general categories selection
                <>
                  {categories.map((cat) => {
                    return (
                      <div
                        key={cat.id}
                        className="flex flex-col items-start gap-2 pt-2  pb-4"
                      >
                        <div className="flex items-center gap-2 py-2 -mb-2 sticky -top-2 w-full bg-white z-10 border-b font-semibold px-4">
                          <p
                            dangerouslySetInnerHTML={{ __html: cat.name }}
                            key={cat.id}
                          />
                        </div>

                        {cat?.children?.length > 0 && (
                          <div className="ml-0 text-gray-600 w-full px-4">
                            {cat.children.map((child) => (
                              <div key={child.id}>
                                <div className="flex items-center gap-2 pt-4 first:mt-0 mt-2 ">
                                  <Checkbox
                                    id={child.id}
                                    onChange={handleCategoryClick}
                                    disabled={productsLoading}
                                    key={child.id}
                                    checked={activeCategories.includes(
                                      String(child.id)
                                    )}
                                    className="cursor-pointer disabled:cursor-not-allowed"
                                  />
                                  <Label
                                    htmlFor={child.id}
                                    className="flex items-center grow text-sm"
                                  >
                                    <p
                                      dangerouslySetInnerHTML={{
                                        __html: child.name,
                                      }}
                                    />
                                    {/* parts count */}
                                    {categoriesCount.length > 0 && (
                                      <span className="text-black text-xs ml-auto font-bold">
                                        {categoriesCount.find(
                                          (c) => c.id === child.id
                                        )?.count > 0 &&
                                          "(" +
                                            categoriesCount.find(
                                              (c) => c.id === child.id
                                            )?.count +
                                            ")"}
                                      </span>
                                    )}
                                  </Label>
                                </div>

                                {child.children &&
                                  child.children.length > 0 && (
                                    <ul className="ml-4 mt-0 text-gray-500 w-full">
                                      {child.children.map((grandchild) => (
                                        <li
                                          key={grandchild.id}
                                          className="w-full"
                                        >
                                          <div className="flex items-center gap-2 pt-3">
                                            <Checkbox
                                              id={grandchild.id}
                                              onChange={handleCategoryClick}
                                              disabled={productsLoading}
                                              key={grandchild.id}
                                              checked={activeCategories.includes(
                                                String(grandchild.id)
                                              )}
                                              className="cursor-pointer disabled:cursor-not-allowed"
                                            />
                                            <Label
                                              htmlFor={grandchild.id}
                                              className="flex items-center grow text-xs"
                                            >
                                              <p
                                                dangerouslySetInnerHTML={{
                                                  __html: grandchild.name,
                                                }}
                                              />

                                              {/* parts count */}
                                              {categoriesCount.length > 0 && (
                                                <span className="text-black text-xs ml-auto font-bold">
                                                  {categoriesCount.find(
                                                    (c) =>
                                                      c.id === grandchild.id
                                                  )?.count > 0 &&
                                                    "(" +
                                                      categoriesCount.find(
                                                        (c) =>
                                                          c.id === grandchild.id
                                                      )?.count +
                                                      ")"}
                                                </span>
                                              )}
                                            </Label>
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </>
              )}

              {totalPages > 1 && !loading ? (
                <ReactPaginate
                  previousLabel={"← Précedent"}
                  nextLabel={"Suivant →"}
                  pageCount={+totalPages}
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={1}
                  marginPagesDisplayed={2}
                  forcePage={page.current - 1}
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
