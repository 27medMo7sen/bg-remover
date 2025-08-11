"use client";
import { Explaination } from "@/components/home/explaination";
import { ImageDrager } from "@/components/home/imageDrager";
import { MainCard } from "@/components/home/mainCard";
import { useSelector } from "react-redux";
export default function Home() {
  const user = useSelector((state) => state.auth.user);
  console.log(user?.email);
  React.useEffect(() => {
    document.title = "Home Page";
  }, []);
  return (
    <div>
      <MainCard />
      <Explaination />
      <ImageDrager />
    </div>
  );
}
