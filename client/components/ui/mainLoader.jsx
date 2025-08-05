import React from "react";

const MainLoader = () => {
  return (
    <div className="flex items-center justify-center bg-white">
      <div className="relative w-16 h-16">
        {/* Bottom Layer */}
        <div className="absolute top-2 left-2 w-16 h-20 bg-indigo-600 transform  rotate-[30deg] z-10" />

        {/* Top Floating Layer */}
        <div className="absolute -top-3 left-2 w-16 h-20 bg-blue-400 transform  rotate-[30deg] z-20 animate-float border-2 border-white opacity-70" />
      </div>
    </div>
  );
};

export default MainLoader;
