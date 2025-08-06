"use client";
import { useState } from "react";
import before from "../../public/before.png";
import after from "../../public/after.png";
import Image from "next/image";

export const ImageDrager = () => {
  const [sliderValue, setSliderValue] = useState(50);

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  return (
    <div className="flex justify-center items-center flex-col px-4 sm:px-6 md:px-12 min-h-[500px] md:min-h-[700px] gap-12 w-full">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-[#353535] to-[#9B9B9B] text-transparent bg-clip-text max-w-[90%] sm:max-w-[600px] leading-snug">
        Remove Background With High Quality and Accuracy
      </h2>

      {/* Slider Image Comparison */}
      <div className="relative w-full max-w-3xl aspect-[4/3] sm:aspect-[16/9]">
        <Image
          src={before}
          alt="Before"
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
        />
        <Image
          src={after}
          alt="After"
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ clipPath: `inset(0 0 0 ${sliderValue}%)` }}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={handleSliderChange}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-full h-2 appearance-none slider"
        />
      </div>
    </div>
  );
};
