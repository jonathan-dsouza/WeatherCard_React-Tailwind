import React from "react";

export const TinyCard = ({ iconSrc, altText, value, units, description }) => {
  return (
    <div className="bg-gray-100 p-2 rounded-[8px] text-center dark:bg-[#1a1a1b]">
      <img
        src={iconSrc}
        alt={altText}
        className="w-12 sm:w-16 md:w-20 h-auto mx-auto mb-2"
      />

      <p className="font-semibold text-center text-sm sm:text-sm md:text-xl dark:text-white">
        {value} {units}
      </p>

      <p className="font-normal text-center text-xs sm:text-sm md:text-md dark:text-white">
        {description}
      </p>
    </div>
  );
};
