import { CheckCircleIcon, StarIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function ReviewsList({ reviews }) {
  return reviews.map((review) => (
    <div key={review.id} className="flex flex-col justify-center py-8 border-b">
      {/* name and stars */}
      <div className="flex flex-col gap-y-2">
        <h5
          className="capitalize font-semibold flex items-center
         gap-x-1"
        >
          {review.reviewer}{" "}
          {review.verified && (
            <CheckCircleIcon className="text-green-700 w-5 h-5" />
          )}
        </h5>
        <div className="flex">
          {[...Array(Math.floor(review.rating))].map((e, i) => (
            <StarIcon key={i} className="text-rachel-red-700 w-4 h-4" />
          ))}
        </div>
      </div>
      {/* review content */}
      <p dangerouslySetInnerHTML={{ __html: review.review }} className="mt-4" />
    </div>
  ));
}
