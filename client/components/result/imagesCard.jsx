"use client";
import { useHttp } from "@/hooks/useHttp";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLoader from "../ui/mainLoader";
import { setUser } from "@/lib/slices/authSlice";
import { pushImage } from "@/lib/slices/gallerySlice";
import { Button } from "../ui/button";
import Link from "next/link";

export const ImagesCard = () => {
  const uploadedImage = useSelector((state) => state.gallery.uploadedImage);
  const [processedImage, setProcessedImage] = useState(null);
  const [file, setFile] = useState(null);
  const { post, isLoading, setIsLoading } = useHttp();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isUploading = useRef(false);

  // Fetch file from URL and set it once
  useEffect(() => {
    if (uploadedImage) {
      fetch(uploadedImage)
        .then((res) => res.blob())
        .then((blob) => {
          const blobFile = new File([blob], "uploadedImage.jpg", {
            type: blob.type,
          });
          setFile(blobFile);
        })
        .catch((err) => console.error("Error fetching image:", err));
    }
  }, []);

  // Upload file only once
  useEffect(() => {
    if (!file || isLoading) return;

    const uploadImage = async () => {
      console.log("Uploading image:");
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        const res = await post("/image/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setProcessedImage(res.secureURL);
        dispatch(setUser({ credits: user.credits - 1 }));
        dispatch(pushImage(res.secureURL));
        console.log("Image uploaded successfully:", res.secureURL);
      } catch (err) {
        console.error("Upload failed:", err);
      } finally {
        setIsLoading(false);
      }
    };
    uploadImage();
  }, [file, post, dispatch]);

  return (
    <div className="flex flex-col gap-6 min-h-screen px-4 py-8">
      {/* Images Container */}
      <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
        {/* Original Image */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-bold mb-4 text-center lg:text-left">
            Original
          </h2>
          {uploadedImage && (
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="w-full max-w-full h-auto rounded-lg shadow"
            />
          )}
        </div>

        {/* Processed Image */}
        <div className="w-full lg:w-1/2">
          {processedImage && !isLoading && (
            <h2 className="text-2xl font-bold mb-4 text-center lg:text-left">
              Background Removed
            </h2>
          )}
          {isLoading ? (
            <div className="w-full flex justify-center items-center h-[300px]">
              <MainLoader />
            </div>
          ) : (
            processedImage && (
              <img
                src={processedImage}
                alt="Processed"
                className="w-full max-w-full h-auto rounded-lg shadow"
              />
            )
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {processedImage && (
        <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center sm:justify-end items-center w-full">
          <Link
            href="/"
            className="border-[#7649FF] px-6 py-2 rounded-full border-2 text-center"
          >
            Try another image
          </Link>
          <a
            className="bg-gradient-to-r from-[#7649FF] to-[#FF4CF6] rounded-full text-white px-6 py-2 hover:opacity-90 transition text-center"
            href={
              typeof processedImage === "string"
                ? processedImage.replace(
                    "/upload/",
                    "/upload/fl_attachment:My-Image/"
                  )
                : "#"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            Download image
          </a>
        </div>
      )}
    </div>
  );
};
