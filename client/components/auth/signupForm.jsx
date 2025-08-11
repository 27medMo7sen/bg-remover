import { Input } from "../ui/input";
import logo from "../../public/logo.png";
import Image from "next/image";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { RiEyeLine } from "react-icons/ri";
import { RiEyeOffLine } from "react-icons/ri";
import useInput from "@/hooks/useInput";
import React from "react";
import { useHttp } from "@/hooks/useHttp";
import { openDrawer } from "@/lib/slices/uiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/lib/slices/authSlice";
import { redirect } from "next/navigation";
import { useEffect } from "react";
export default function SignupForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { post } = useHttp();
  const dispatch = useDispatch();

  const {
    value: emailValue,
    onChange: onEmailChange,
    onBlur: onEmailBlur,
    hasError: isEmailError,
    isValid: isEmailValid,
  } = useInput((value) => value.includes("@"), "");

  const {
    value: usernameValue,
    onChange: onUsernameChange,
    onBlur: onUsernameBlur,
    hasError: isUsernameError,
    isValid: isUsernameValid,
  } = useInput((value) => value.length >= 3, "");

  const {
    value: passwordValue,
    onChange: onPasswordChange,
    onBlur: onPasswordBlur,
    hasError: isPasswordError,
    isValid: isPasswordValid,
  } = useInput((value) => value.length >= 6, "");

  const {
    value: confirmPasswordValue,
    onChange: onConfirmPasswordChange,
    onBlur: onConfirmPasswordBlur,
    hasError: isConfirmPasswordError,
    isValid: isConfirmPasswordValid,
    setValidity: setConfirmPasswordValidity,
  } = useInput((value) => value === passwordValue && value.length >= 6, "");

  const [policy, setPolicy] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const isFormValid =
    isUsernameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid &&
    policy;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    const res = await post("/auth/signup", {
      username: usernameValue,
      email: emailValue,
      password: passwordValue,
      confirmPassword: confirmPasswordValue,
    });
    if (res) {
      console.log(res);
      dispatch(openDrawer());
      localStorage.setItem("verifyEmail", emailValue);
    }
  };
  React.useEffect(() => {
    document.title = "Signup Page";
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center p-4 ">
      <form
        onSubmit={handleSubmit}
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

        {/* Google Signup Button */}
        <div className="flex justify-center items-center">
          <Link
            variant="outline"
            href="https://bg-remover-production-28c9.up.railway.app/auth/google"
            className="bg-white w-full sm:w-fit hover:bg-gray-100 text-gray-800 font-semibold border-gray-300 flex items-center justify-center gap-2 p-2 sm:p-3 rounded-2xl cursor-pointer shadow-lg text-sm sm:text-base transition-colors"
          >
            <FaGoogle className="text-sm sm:text-base" />
            <span className=" sm:inline">Signup with Google</span>
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
            type="text"
            label="Username"
            className="p-2 sm:p-3 rounded bg-gray-800 border border-gray-700 text-sm sm:text-base"
            isValid={isUsernameValid}
            hasError={isUsernameError}
            onChange={onUsernameChange}
            onBlur={onUsernameBlur}
            errorMessage="Username must be at least 3 characters long"
          />

          <Input
            type="email"
            label="Email"
            className="p-2 sm:p-3 rounded bg-gray-800 border border-gray-700 text-sm sm:text-base"
            isValid={isEmailValid}
            hasError={isEmailError}
            onChange={onEmailChange}
            onBlur={onEmailBlur}
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
              className="p-2 sm:p-3 pr-10 sm:pr-12 rounded bg-gray-800 border border-gray-700 text-sm sm:text-base"
              isValid={isPasswordValid}
              hasError={isPasswordError}
              onChange={onPasswordChange}
              onBlur={onPasswordBlur}
              errorMessage="Password must be at least 6 characters long"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <button
              type="button"
              className="absolute right-2 sm:right-3 top-1 sm:top-1.5 flex items-center cursor-pointer z-10 text-gray-400 hover:text-gray-200 transition-colors"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? (
                <RiEyeLine className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <RiEyeOffLine className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password"
              className="p-2 sm:p-3 pr-10 sm:pr-12 rounded bg-gray-800 border border-gray-700 text-sm sm:text-base"
              isValid={isConfirmPasswordValid}
              hasError={isConfirmPasswordError}
              onChange={onConfirmPasswordChange}
              onBlur={onConfirmPasswordBlur}
              errorMessage="Please confirm your password"
            />
          </div>
        </div>

        {/* Terms and Policy Checkbox */}
        <div className="flex items-start gap-2 sm:gap-3">
          <input
            type="checkbox"
            id="terms"
            className="rounded mt-0.5 flex-shrink-0"
            checked={policy}
            onChange={(e) => setPolicy(e.target.checked)}
          />
          <label
            htmlFor="terms"
            className="text-xs sm:text-sm text-gray-600 leading-relaxed"
          >
            I agree to the{" "}
            <Link href="/terms" className="text-blue-500 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-500 hover:underline">
              Privacy Policy
            </Link>
          </label>
        </div>

        {/* Submit Button */}
        <Button
          className="bg-blue-500 hover:bg-blue-400 p-2 sm:p-3 rounded-lg text-white disabled:bg-gray-300 disabled:hover:cursor-not-allowed text-sm sm:text-base font-semibold transition-colors"
          disabled={!isFormValid}
          type="submit"
        >
          Sign Up
        </Button>

        {/* Login Link */}
        <p className="text-center text-gray-600 text-xs sm:text-sm">
          Already have an account?{" "}
          <Link
            href="/auth?mode=login"
            className="text-blue-500 hover:underline font-medium"
          >
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}
