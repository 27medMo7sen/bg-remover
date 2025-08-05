"use client";
import Image from "next/image";
import logo from "../../public/logo.png";
import social from "../../public/social.png";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/lib/slices/authSlice";
import React from "react";
export default function MainLayout({ children }) {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      dispatch(setCredentials({ user, token }));
    }
  }, []);
  return (
    <main className="w-[80%] px-4 sm:px-8">
      <nav className="flex flex-col sm:flex-row items-center justify-between text-white p-2 h-auto sm:h-20 gap-4 sm:gap-0">
        <Image
          src={logo}
          alt="Logo"
          width={160}
          className="w-40 sm:w-52 h-auto"
        />
        <Link
          className="flex items-center bg-black rounded-full cursor-pointer py-2 px-4 gap-2 hover:bg-gray-800 text-sm sm:text-base"
          href="/auth?mode=signup"
        >
          Get Started <FaArrowRight />
        </Link>
      </nav>

      <div className="my-4">{children}</div>

      <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 py-4 border-t border-gray-700 mt-8 text-gray-400 text-sm">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <Image src={logo} alt="Logo" width={120} className="w-28 h-auto" />
          <span className="hidden sm:inline">|</span>
          <p className="text-center sm:text-left">
            &copy; 2025 Your Company. All rights reserved.
          </p>
        </div>
        <Image
          src={social}
          alt="Social Media"
          width={120}
          className="w-28 h-auto"
        />
      </footer>
    </main>
  );
}
