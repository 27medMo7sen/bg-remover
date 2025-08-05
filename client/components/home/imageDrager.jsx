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
    <div className="flex justify-center items-center flex-col h-[700px]  gap-12">
      <div className="text-4xl font-bold text-center bg-gradient-to-r from-[#353535] to-[#9B9B9B] text-transparent bg-clip-text w-[600px] ">
        Remove Background With High Quality and Accuracy
      </div>
      <div className="relative w-full h-[500px] max-w-3xl">
        <Image
          src={before}
          alt="Before"
          className="absolute top-0 left-0 w-full h-full"
          style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
        />
        <Image
          src={after}
          alt="After"
          className="absolute top-0 left-0 w-full h-full"
          style={{ clipPath: `inset(0 0 0 ${sliderValue}%)` }}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={handleSliderChange}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-2 rounded-lg cusror-pointer  slider   "
        />
      </div>
    </div>
  );
};
