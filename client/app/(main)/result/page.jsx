"use client";
import { ImagesCard } from "@/components/result/imagesCard";
import React from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
const ResultPage = () => {
  const uploadedImage = useSelector((state) => state.gallery.uploadedImage);
  if (!uploadedImage) {
    redirect("/");
  }
  React.useEffect(() => {
    document.title = "Result Page";
  }, []);
  return (
    <div>
      <ImagesCard />
    </div>
  );
};

export default ResultPage;
