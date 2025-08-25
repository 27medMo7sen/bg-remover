"use client";
import Image from "next/image";
import coin from "../../public/coin.png";
import logo from "../../public/logo.png";
import social from "../../public/social.png";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials, setCredentials } from "@/lib/slices/authSlice";
import React from "react";
import { Credits } from "@/components/ui/credits";
import { Skeleton } from "@/components/ui/skeleton";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { GoPerson } from "react-icons/go";
import { IoChevronDown } from "react-icons/io5";

export default function MainLayout({ children }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();
  const menuRef = React.useRef(null);

  const logout = () => {
    dispatch(clearCredentials());
    router.push("/auth?mode=login");
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        dispatch(setCredentials({ user: parsedUser, token }));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setIsLoading(false);
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
      {/* Navbar */}
      <nav className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 py-4 sm:py-6 text-white">
        <Link href="/" className="shrink-0">
          <Image
            src={logo}
            alt="Logo"
            width={160}
            className="w-32 sm:w-40 md:w-52 h-auto"
          />
        </Link>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <Skeleton className="w-24 h-8 bg-blue-200" />
            <Skeleton className="w-24 h-2 bg-gray-300" />
            <Skeleton className="w-10 h-10 bg-gray-300 rounded-full" />
          </div>
        )}

        {/* User Display or CTA */}
        {!isLoading && user ? (
          <div className="flex items-center gap-2">
            {/* Desktop Credits - visible on large screens */}
            <div className="hidden lg:block">
              <Credits credits={user.credits} />
            </div>

            {/* Profile Menu Container */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={toggleMenu}
                className="flex items-center gap-2 hover:bg-gray-200 rounded-full px-3 py-2 transition-colors cursor-pointer"
              >
                <span className="text-black max-w-[120px] sm:max-w-[150px] truncate text-sm sm:text-base">
                  Hi, {user.username || "User"}
                </span>
                {user.secureURL ? (
                  <Image
                    height={32}
                    width={32}
                    src={user.secureURL}
                    alt="profile"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <GoPerson className="w-4 h-4 text-gray-600" />
                  </div>
                )}
                <IoChevronDown
                  className={`w-4 h-4 text-gray-600 transition-transform ${
                    isMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-lg border border-gray-200 min-w-[200px] z-50 overflow-hidden">
                  {/* Mobile Credits - visible only on small screens */}
                  <div className="lg:hidden px-4 py-3 border-b border-gray-100">
                    <div className="text-gray-600 text-sm mb-1 text-center">
                      Credits{" "}
                      <span className="font-semibold bg-blue-50 p-1">
                        {user.credits}
                      </span>
                      <Image
                        src={coin}
                        alt="Coin"
                        width={16}
                        height={16}
                        className="inline-block ml-1"
                      />
                    </div>
                  </div>

                  {/* Menu Items */}
                  <Link
                    href="/profile"
                    className="flex items-center justify-center gap-3 p-4 hover:bg-gray-100 transition-colors text-black text-xl"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <GoPerson />
                    Profile
                  </Link>

                  <button
                    className=" w-full cursor-pointer flex items-center justify-center gap-3 p-4  text-black hover:text-red-600 hover:bg-red-50 transition-colors text-xl "
                    onClick={logout}
                  >
                    <CiLogout />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          !isLoading && (
            <Link
              className="flex items-center bg-black rounded-full py-2 px-4 gap-2 hover:bg-gray-800 text-sm sm:text-base transition-colors"
              href="/auth?mode=signup"
            >
              Get Started <FaArrowRight />
            </Link>
          )
        )}
      </nav>

      {/* Main content */}
      <div className="my-4">{children}</div>

      {/* Footer */}
      <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 py-6 border-t border-gray-700 text-gray-400 text-sm">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <Image src={logo} alt="Logo" width={120} className="w-24 h-auto" />
          <span className="hidden sm:inline">|</span>
          <p>&copy; 2025 Your Company. All rights reserved.</p>
        </div>
        <Image
          src={social}
          alt="Social Media"
          width={120}
          className="w-24 sm:w-28 h-auto"
        />
      </footer>
    </main>
  );
}
