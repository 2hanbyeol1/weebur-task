import React from "react";

import Star from "@/svgs/Star";

interface RatingProps {
  rating: number;
}
const Rating = ({ rating }: RatingProps) => {
  return (
    <div className="relative flex h-full w-25">
      <div
        style={{ width: `${(rating / 5) * 100}%` }}
        className="absolute top-0 left-0 z-10 flex overflow-hidden fill-gray-700"
      >
        <Star width="20" className="flex-shrink-0" />
        <Star width="20" className="flex-shrink-0" />
        <Star width="20" className="flex-shrink-0" />
        <Star width="20" className="flex-shrink-0" />
        <Star width="20" className="flex-shrink-0" />
      </div>
      <div className="absolute top-0 left-0 flex fill-gray-300">
        <Star width="20" />
        <Star width="20" />
        <Star width="20" />
        <Star width="20" />
        <Star width="20" />
      </div>
    </div>
  );
};

export default Rating;
