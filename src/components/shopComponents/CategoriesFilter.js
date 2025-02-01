import useCategories from "@/hooks/useCategories";
import { Accordion, Checkbox, Label } from "flowbite-react";
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
  const { readString } = usePapaParse();
  const {
    categories: { data, headers },
    isLoading,
  } = useCategories(page.current);

  const getCategories = () => {
    setLoading(true);
    if (router.query?.parent_category === "1") {
      fetch("/categories.csv")
        .then((response) => response.text())
        .then((text) => {
          readString(text, {
            complete: (results) => {
              const level3Categories = results.data
                .map((item) => {
                  return {
                    id: Number(item[0]),
                    name: item[1],
                    parent: Number(item[3]),
                    slug: item[2],
                  };
                })
                .filter(
                  (item) => item.parent === Number(router.query?.categorie_id)
                )
                .sort(function (a, b) {
                  var textA = a.name.toUpperCase();
                  var textB = b.name.toUpperCase();
                  return textA < textB ? -1 : textA > textB ? 1 : 0;
                });

              setCategories(level3Categories);

              setLoading(false);
            },
          });
        });
    }else{
      setLoading(isLoading);
      setCategories(data);
      setTotalPages(headers?.["x-wp-totalpages"]);
    }
  };

  function handlePageClick({ selected }) {
    if (selected === 0) {
      page.current = 1;
    } else {
      page.current = selected + 1;
    }

    getCategories();
    console.log(page.current)
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
    if(router.query?.parent_category === "1") {
      return;
    }
    setLoading(isLoading);
    setCategories(data);
    setTotalPages(headers?.["x-wp-totalpages"]);
  }, [data,isLoading]);

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
        <Accordion>
          <Accordion.Panel>
            <Accordion.Title className=" !py-4 font-semibold text-sm !ring-0">
              Catégories
            </Accordion.Title>
            <Accordion.Content className="!py-2">
              {categories.length > 0 && (
                <span
                  className="my-5 text-sm underline-offset-4 underline decoration-rachel-red-700 cursor-pointer"
                  onClick={clearSelection}
                >
                  Effacer tout
                </span>
              )}
              {router.query?.parent_category === "1" && (
                <div className="flex items-center gap-2 pt-4">
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
                      dangerouslySetInnerHTML={{ __html: "Sélectionner tout" }}
                    />
                  </Label>
                </div>
              )}
              {categories.map((cat) => {
                if (cat.parent == 0) {
                  let childs = [];
                  categories.forEach((item) => {
                    if (item.parent === cat.id) {
                      childs.push(item);
                    }
                  });
                  if (childs.length > 0) {
                    return (
                      <div
                        className="flex flex-col border-b last:border-none py-4"
                        key={cat.id}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Checkbox
                            id={cat.id}
                            onChange={handleCategoryClick}
                            disabled={productsLoading}
                            checked={activeCategories.includes(String(cat.id))}
                            className="cursor-pointer disabled:cursor-not-allowed"
                          />
                          <Label
                            htmlFor={cat.id}
                            className="flex items-center grow"
                          >
                            <p dangerouslySetInnerHTML={{ __html: cat.name }} />
                          </Label>
                        </div>

                        <div className="flex ml-4 flex-col gap-y-2">
                          {childs.map((child) => (
                            <div
                              key={child.id}
                              className="flex items-center gap-2"
                            >
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
                                className="flex items-center justify-start"
                              >
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: child.name,
                                  }}
                                  className="w-fit"
                                />
                                <span className="text-gray-400 text-xs ml-1">
                                  ({child.count})
                                </span>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={cat.id}
                        className="flex items-center gap-2 pt-4"
                      >
                        <Checkbox
                          id={cat.id}
                          onChange={handleCategoryClick}
                          disabled={productsLoading}
                          key={cat.id}
                          checked={activeCategories.includes(String(cat.id))}
                          className="cursor-pointer disabled:cursor-not-allowed"
                        />
                        <Label
                          htmlFor={cat.id}
                          className="flex items-center grow"
                        >
                          <p dangerouslySetInnerHTML={{ __html: cat.name }} />
                        </Label>
                      </div>
                    );
                  }
                }

                if (
                  cat.parent !== 0 &&
                  categories.find((x) => cat.parent === x.id) === undefined
                ) {
                  return (
                    <div key={cat.id} className="flex items-center gap-2 pt-4">
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
                        <span className="text-gray-400 text-xs ml-auto">
                          {cat.count > 0 && "(" + cat.count + ")"}
                        </span>
                      </Label>
                    </div>
                  );
                }
              })}
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
