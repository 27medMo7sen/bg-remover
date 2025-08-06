"use client";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
export default function AuthLayout({ children }) {
  return <main className="w-[80%] px-4 sm:px-8">{children}</main>;
}
