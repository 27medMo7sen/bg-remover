import { MdOutlineFileUpload } from "react-icons/md";
import main from "../../public/main.png";
import Image from "next/image";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUploadedImage } from "@/lib/slices/gallerySlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
export const MainCard = () => {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    dispatch(setUploadedImage(fileUrl));
    console.log(fileUrl);
    formRef.current.reset();
    router.push("/result");
  };

  return (
    <div className="flex flex-col-reverse md:flex-row justify-between items-center p-4 md:p-8 min-h-[500px] md:min-h-[700px] gap-8">
      {/* Text Section */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
          Remove the{" "}
          <span className="bg-gradient-to-r from-[#7649FF] to-[#FF4CF6] text-transparent bg-clip-text">
            background
          </span>{" "}
          from images for free.
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-700">
          Remove the background from images in seconds. Free for the first 5
          images.
        </p>

        {/* Button for non-logged-in users */}
        {!user && (
          <Link
            href="/auth?mode=signup"
            className="flex cursor-pointer justify-center md:justify-start items-center gap-2 mt-6 px-6 py-4 bg-gradient-to-r from-[#7649FF] to-[#FF4CF6] text-white rounded-full hover:opacity-90 transition font-bold w-fit mx-auto md:mx-0"
          >
            <MdOutlineFileUpload className="text-xl" />
            Upload your image
          </Link>
        )}

        {/* Button for logged-in users */}
        {user && (
          <button
            onClick={() => formRef.current.querySelector("input").click()}
            disabled={user.credits <= 0}
            className="max-w-[210px] cursor-pointer flex justify-center md:justify-start items-center gap-2 mt-6 px-6 py-4 bg-gradient-to-r from-[#7649FF] to-[#FF4CF6] text-white rounded-full hover:opacity-90 transition font-bold w-fit mx-auto md:mx-0 disabled:opacity-50 disabled:cursor-not-allowed md:max-w-[400px] text-sm whitespace-nowrap"
          >
            <MdOutlineFileUpload className="text-xl" />
            Upload your image
          </button>
        )}

        <form hidden ref={formRef}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </form>
      </div>

      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src={main}
          alt="Main Visual"
          width={500}
          className="w-full max-w-[500px] h-auto"
        />
      </div>
    </div>
  );
};
