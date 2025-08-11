import { Input } from "../ui/input";
import logo from "../../public/logo.png";
import Image from "next/image";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { RiEyeLine } from "react-icons/ri";
import { RiEyeOffLine } from "react-icons/ri";
import React, { useEffect } from "react";
import useInput from "@/hooks/useInput";
import { useHttp } from "@/hooks/useHttp";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/lib/slices/authSlice";

export default function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const { post } = useHttp();
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Login Page";
  }, []);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    value: emailValue,
    onChange: onEmailChange,
    onBlur: onEmailBlur,
    hasError: isEmailError,
    isValid: isEmailValid,
  } = useInput((value) => value.includes("@"), "");

  const {
    value: passwordValue,
    onChange: onPasswordChange,
    onBlur: onPasswordBlur,
    hasError: isPasswordError,
    isValid: isPasswordValid,
  } = useInput((value) => value.length >= 6, "");

  const submitHandler = (event) => {
    event.preventDefault();
    if (!isFormValid) return;
    const login = async () => {
      const response = await post("/auth/login", {
        email: emailValue,
        password: passwordValue,
      });
      if (response && response.user) {
        dispatch(
          setCredentials({ user: response.user, token: response.user.token })
        );
        redirect("/");
      }
    };
    login();
  };

  const isFormValid = isEmailValid && isPasswordValid;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-4 sm:gap-6 border p-4 sm:p-6 lg:p-8 rounded-xl bg-gradient-to-b from-white to-blue-100 shadow-lg justify-center animate-drop w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
      >
        {/* Logo */}
        <Link href="/" className="flex justify-center">
          <Image
            src={logo}
            alt="Logo"
            width={120}
            className="w-20 sm:w-24 md:w-28 lg:w-32 h-auto"
          />
        </Link>

        {/* Google Login Button */}
        <div className="flex justify-center items-center">
          <Link
            variant="outline"
            href={`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/google`}
            className="bg-white w-full sm:w-fit hover:bg-gray-100 text-gray-800 font-semibold border-gray-300 flex items-center justify-center gap-2 p-2 sm:p-3 rounded-2xl cursor-pointer shadow-lg text-sm sm:text-base transition-colors"
          >
            <FaGoogle className="text-sm sm:text-base" />
            <span>Login with Google</span>
          </Link>
        </div>

        {/* Divider */}
        <div className="flex items-center">
          <hr className="flex-grow border-t border-gray-700" />
          <span className="mx-2 sm:mx-4 text-center text-gray-600 text-sm sm:text-base">
            or
          </span>
          <hr className="flex-grow border-t border-gray-700" />
        </div>

        {/* Form Fields */}
        <div className="space-y-3 sm:space-y-4">
          <Input
            type="email"
            label="Email"
            className="p-2 sm:p-3 rounded bg-gray-800 border border-gray-700 text-sm sm:text-base"
            hasError={isEmailError}
            value={emailValue}
            onChange={onEmailChange}
            onBlur={onEmailBlur}
            isValid={isEmailValid}
            errorMessage="Please enter a valid email address"
          />

          {/* Password Field */}
          <div className="relative">
            <button
              type="button"
              className="absolute right-2 sm:right-3 top-1 sm:top-1.5 flex items-center cursor-pointer z-10 text-gray-400 hover:text-gray-200 transition-colors"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <RiEyeLine className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <RiEyeOffLine className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
            <Input
              type={showPassword ? "text" : "password"}
              label="Password"
              value={passwordValue}
              onChange={onPasswordChange}
              onBlur={onPasswordBlur}
              hasError={isPasswordError}
              isValid={isPasswordValid}
              className="p-2 sm:p-3 pr-10 sm:pr-12 rounded bg-gray-800 border border-gray-700 text-sm sm:text-base"
              errorMessage="Password must be at least 6 characters long"
            />
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-between items-center">
          <Link
            href="/auth?mode=reset"
            className="text-blue-500 hover:underline text-xs sm:text-sm font-medium transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          className="bg-blue-500 hover:bg-blue-400 p-2 sm:p-3 rounded-lg text-white disabled:bg-gray-300 disabled:hover:cursor-not-allowed text-sm sm:text-base font-semibold transition-colors"
          disabled={!isFormValid}
          type="submit"
        >
          Login
        </Button>

        {/* Signup Link */}
        <p className="text-center text-gray-600 text-xs sm:text-sm">
          Don't have an account?{" "}
          <Link
            href="/auth?mode=signup"
            className="text-blue-500 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
