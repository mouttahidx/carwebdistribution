"use client";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import { Badge } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import {
  InstantSearch,
  SearchBox,
  Hits,
  useInstantSearch,
  Configure,
  Index,
  Pagination,
} from "react-instantsearch";

const algoliaClient = algoliasearch(
  "8PJW7OAYN5",
  "47050ab3389ec54aab90dcb5657727f0"
);

const searchClient = {
  ...algoliaClient,
  future: {
    preserveSharedStateOnUnmount: true,
  },
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
          hitsPerPage: 0,
          exhaustiveNbHits: false,
          query: "",
          params: "",
        })),
      });
    }

    return algoliaClient.search(requests);
  },
};

export default function AlgoliaSearch() {
  const [results, setSearchResults] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setSearchResults(false);
  }, [router.asPath]);

  return (
    <InstantSearch
      searchClient={searchClient}
      insights={true}
      future={{ preserveSharedStateOnUnmount: true }}
    >
      <SearchBox className="!w-full" placeholder="Rechercher..." />

      <div
        className={`absolute ${
          results ? "block" : "hidden"
        } bg-white lg:top-24 top-20 border z-50 px-4 pt-4 gap-y-2 left-0 lg:left-auto w-screen lg:w-[500px] xl:w-[690px] rounded`}
      >
        <span
          className="absolute top-2 right-2 cursor-pointer w-6 h-6 flex justify-center items-center border font-semibold border-gray-400 rounded-full text-gray-600"
          onClick={() => setSearchResults(false)}
        >
          X
        </span>
        {/* Categories Results */}
        <Index indexName="categories" indexId="categories">
          <Configure hitsPerPage={5} distinct={true} />
          <IndexResults
            title="Catégories"
            setSearchResults={setSearchResults}
          />
        </Index>
        {/* Brands Results  */}
        <Index indexName="brands" indexId="brands">
          <Configure hitsPerPage={5} distinct={true} />
          <IndexResults title="Marques" setSearchResults={setSearchResults} />
        </Index>

        {/* Products Results */}
        <Index indexName="all_product" indexId="products" filters="visibility:1">
          <Configure hitsPerPage={6} distinct={true} />
          <IndexResults title="Produits" setSearchResults={setSearchResults} />
        </Index>
      </div>
    </InstantSearch>
  );
}

function IndexResults({ title, setSearchResults }) {
  const { results } = useInstantSearch();
  useEffect(() => {
    if (results.nbHits > 0) {
      setSearchResults(true);
    } else {
      setSearchResults(false);
    }
  }, [results]);

  return (
    <>
      {results.nbHits > 0 && (
        <div className=" mb-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <Hits hitComponent={Hit} />
          {title === "Produits" && <Pagination />}
        </div>
      )}
    </>
  );
}

const Hit = ({ hit }) => {
  if (hit?.term_id) {
    return (
      <Link
        href={`/boutique/?marque=${hit["term_id"]}`}
        className="flex items-center gap-x-2 border-b p-2"
      >
        <div className="text-sm">
          <span
            dangerouslySetInnerHTML={{
              __html: hit._highlightResult?.name?.value,
            }}
          />
          <span className="ml-1 text-gray-500 text-xs">- ({hit.Count})</span>
        </div>
      </Link>
    );
  }

  if (hit.price) {
    return (
      <Link
        href={`/produits/${hit.slug}`}
        className="flex items-center gap-x-2 border-b p-2"
      >
        <img
          src={hit.image || "/slider1.jpg"}
          className="w-16 h-16 object-contain mr-2"
          alt={hit.name}
        />
        <div className="text-sm leading-relaxed">
          <span
            className="font-semibold"
            dangerouslySetInnerHTML={{
              __html: hit._highlightResult?.name?.value,
            }}
          />{" "}
          -{" "}
          <span
            dangerouslySetInnerHTML={{
              __html: hit._highlightResult?.part_id?.value,
            }}
          />
          <br />
          <div className="flex  flex-col  gap-3 py-2">
            {hit.category && (
              <div className="flex  items-center gap-x-1 text-xs">
                Catégorie:{" "}
                <Badge
                  color={"#EEEEEE"}
                  size={"xs"}
                  className="w-fit bg-gray-100 uppercase text-[0.7rem] "
                >
                  {hit.category}
                </Badge>
              </div>
            )}

            {hit.brand && (
              <div className="flex  items-center gap-x-1 text-xs">
                Marque:{" "}
                <Badge
                  color={"#ffc1c1"}
                  size={"xs"}
                  className="w-fit text-[0.7rem] uppercase bg-rachel-red-50 "
                 
                >
                  {hit.brand}
                </Badge>
              </div>
            )}
          </div>
          {hit.price && <span className="font-semibold">$ {hit.price}</span>}
        </div>
      </Link>
    );
  }
    return (
      <>
      { hit["Term Id"] && <Link
        href={`/boutique/?categorie_id=${hit["Term Id"]}`}
        className="flex items-center gap-x-2 border-b p-2"
      >
        <div className="text-sm">
          <span
            dangerouslySetInnerHTML={{
              __html: hit._highlightResult?.Name?.value,
            }}
          />
          {hit.count > 0 && (
            <span className="ml-1 text-gray-500 text-xs">- ({hit.Count})</span>
          )}
        </div>
      </Link>  }
      </>
    );
};
