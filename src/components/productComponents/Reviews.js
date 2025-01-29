import { getProductReviews } from "@/lib/api";
import { Button, Rating } from "flowbite-react";
import React, { useEffect, useState } from "react";
import ReviewsList from "./ReviewsList";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { Code } from "react-content-loader";

export default function Reviews({ productId, averageRating, ratingCount }) {
  const [reviews, setReviews] = useState([]);
  const [pageInfos, setPageInfos] = useState({});
  const [loading, setLoading] = useState(true);
  const perPage = 10;
  const [page, setPage] = useState(1);

  const MyLoader = (props) => (
    <Code uniqueKey="rrr" className="lg:w-96 w-full" {...props} />
  );

  let perCentage = (+averageRating / 5) * 100;

  const [ratings, setRatings] = useState({
    id: null,
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0,
  });

  const handleNextPage = () => {
    if (pageInfos.totalPage && pageInfos.totalPage > page)
      setPage((curr) => curr + 1);
  };

  const handlePrevPage = () => {
    if (pageInfos.totalPage && page > 1) setPage((curr) => curr - 1);
  };

  /* -------------------------------------------------------------------------- */
  /*                                fetch reviews                               */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    setLoading(true);
    
    /* ------------------------------- fetch func ------------------------------- */
    const revs = async () => {
      const { data, headers } = await getProductReviews(
        productId,
        page,
        perPage
      );

      /* ----------------------------- setting states ----------------------------- */
      setRatings((curr) => ({ ...curr, id: productId }));
      setPageInfos({ totalPage: headers["x-wp-totalpages"] });


      
      if (!ratings.id) {
        data.forEach((review) => {
          if (review.rating === 1) {
            setRatings((curr) => ({ ...curr, one: curr.one + 1 }));
            return;
          } else if (review.rating === 2) {
            setRatings((curr) => ({ ...curr, two: curr.two + 1 }));
            return;
          } else if (review.rating === 3) {
            setRatings((curr) => ({ ...curr, three: curr.three + 1 }));
            return;
          } else if (review.rating === 4) {
            setRatings((curr) => ({ ...curr, four: curr.four + 1 }));
            return;
          } else if (review.rating === 5) {
            setRatings((curr) => ({ ...curr, five: curr.five + 1 }));
            return;
          }
        });
      }

      setReviews(data);
      setLoading(false);
    };
    revs();
  }, [productId, page]);

  return (
    <div className="px-3 mt-4 py-6 md:p-4">
      <h3 className="mb-10 font-semibold text-2xl">Avis sur le produit</h3>
      <div className="flex flex-col md:flex-row justify-start md:items-center pb-10 border-b">
        {/* rating circle */}
        <div>
          <svg viewBox="0 0 36 36" className="w-40 h-40">
            <path
              className="stroke-rachel-black-100"
              d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#eee"
              strokeWidth={4}
            />
            <path
              d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              strokeWidth="4"
              strokeDasharray={perCentage + ", 100"}
              className="stroke-rachel-red-700"
            />
            <text x="11.5" y="19.5" className="text-[0.4em]">
              {averageRating}
            </text>
          </svg>
        </div>

        {/* ratings info */}
        <div className="mt-6 md:mt-0 flex-grow md:ml-10 ">
          <p className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
            {ratingCount} avis au totale
          </p>

          {!loading ? (
            reviews.length > 0 ? (
              <div>
                <Rating.Advanced
                  className="mb-2"
                  percentFilled={(ratings.five / ratingCount) * 100}
                >
                  <Rating>
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                  </Rating>
                </Rating.Advanced>
                <Rating.Advanced
                  className="mb-2"
                  percentFilled={(ratings.four / ratingCount) * 100}
                >
                  <Rating>
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star filled={false} />
                  </Rating>
                </Rating.Advanced>
                <Rating.Advanced
                  className="mb-2"
                  percentFilled={(ratings.three / ratingCount) * 100}
                >
                  <Rating>
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star filled={false} />
                    <Rating.Star filled={false} />
                  </Rating>
                </Rating.Advanced>
                <Rating.Advanced
                  className="mb-2"
                  percentFilled={(ratings.two / ratingCount) * 100}
                >
                  <Rating>
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star filled={false} />
                    <Rating.Star filled={false} />
                    <Rating.Star filled={false} />
                  </Rating>
                </Rating.Advanced>
                <Rating.Advanced
                  percentFilled={(ratings.one / ratingCount) * 100}
                >
                  <Rating>
                    <Rating.Star />
                    <Rating.Star filled={false} />
                    <Rating.Star filled={false} />
                    <Rating.Star filled={false} />
                    <Rating.Star filled={false} />
                  </Rating>
                </Rating.Advanced>
              </div>
            ) : (
              ""
            )
          ) : (
            <MyLoader />
          )}
        </div>
      </div>
      {!loading &&
        (reviews?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 ">
            <ReviewsList reviews={reviews} />
          </div>
        ) : (
          ""
        ))}

      {loading && (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-8 ">
          <MyLoader />
          <MyLoader />
        </div>
      )}
      {/* pagination */}
      <div className="py-10 grid grid-cols-2 gap-2">
        {pageInfos.totalPage > 1 && page > 1 ? (
          <Button
            className="bg-red-700 "
            onClick={handlePrevPage}
            isProcessing={loading}
            disabled={loading}
          >
            <ArrowLeftIcon className="mr-2 h-5 w-5" />
            Précedent
          </Button>
        ) : (
          ""
        )}

        {pageInfos.totalPage > 1 && page < pageInfos.totalPage ? (
          <Button
            className="bg-red-700  "
            onClick={handleNextPage}
            isProcessing={loading}
            disabled={loading}
          >
            Suivant
            <ArrowRightIcon className="mr-2 h-5 w-5" />
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
