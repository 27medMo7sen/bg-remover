import { MdOutlineFileUpload } from "react-icons/md";
import main from "../../public/main.png";
import Image from "next/image";
export const MainCard = () => {
  return (
    <div className="flex justify-between items-center p-4 h-[700px]">
      <div>
        <h1 className="text-6xl font-bold ">
          Remove the{" "}
          <span className="bg-gradient-to-r from-[#7649FF] to-[#FF4CF6] text-transparent bg-clip-text font-bold">
            background
          </span>{" "}
          from images for free.
        </h1>
        <p className="  mt-4">
          Remove the background from images in seconds. Free for the first 5
          images.
        </p>
        <button className="flex font-bold cursor-pointer items-center gap-2 mt-6 px-6 py-4 bg-gradient-to-r from-[#7649FF] to-[#FF4CF6] text-white rounded-full hover:opacity-90 transition">
          <MdOutlineFileUpload className="text-xl" />
          Upload your image
        </button>
      </div>
      <Image
        src={main}
        alt="Main Image"
        width={500}
        className="hidden sm:block ml-10"
      />
    </div>
  );
};
