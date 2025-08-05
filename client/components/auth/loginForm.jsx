import { Input } from "../ui/input";
import logo from "../../public/logo.png";
import Image from "next/image";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { RiEyeLine } from "react-icons/ri";
import { RiEyeOffLine } from "react-icons/ri";
import React from "react";
import useInput from "@/hooks/useInput";
export default function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const {
    value: emailValue,
    onChange: onEmailChange,
    onBlur: onEmailBlur,
    hasError: isEmailError,
    isValid: isEmailValid,
    setValidity: setEmailValidity,
  } = useInput((value) => value.includes("@"), "");
  const {
    value: passwordValue,
    onChange: onPasswordChange,
    onBlur: onPasswordBlur,
    hasError: isPasswordError,
    isValid: isPasswordValid,
    setValidity: setPasswordValidity,
  } = useInput((value) => value.length >= 6, "");
  const isFormValid = isEmailValid && isPasswordValid;
  return (
    <form className="flex flex-col gap-4 border p-6 rounded-xl bg-gradient-to-b from-white to-blue-100 shadow-lg justify-center animate-drop">
      <Link href="/">
        <Image src={logo} alt="Logo" width={120} className="mx-auto" />
      </Link>
      <div className="flex justify-center items-center gap-4">
        <Link
          variant="outline"
          href="http://localhost:3000/auth/google"
          className="bg-white w-fit hover:bg-gray-100 text-gray-800 font-semibold  border-gray-300 flex items-center justify-center gap-2 p-2 rounded-2xl cursor-pointer shadow-lg"
        >
          <FaGoogle />
          Login with Google
        </Link>
      </div>
      <div className="flex items-center">
        <hr className="flex-grow border-t border-gray-700" />
        <span className="mx-4 text-center text-gray-600">or</span>
        <hr className="flex-grow border-t border-gray-700" />
      </div>
      <Input
        type="email"
        label={"Email"}
        className="p-2 rounded bg-gray-800 border border-gray-700"
        hasError={isEmailError}
        value={emailValue}
        onChange={onEmailChange}
        onBlur={onEmailBlur}
        isValid={isEmailValid}
        errorMessage="Please enter a valid email address"
      />
      <div className="relative">
        <button
          type="button"
          className="absolute right-0 top-1 flex items-center pr-3 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
        </button>
        <Input
          type={showPassword ? "text" : "password"}
          label={"Password"}
          value={passwordValue}
          onChange={onPasswordChange}
          onBlur={onPasswordBlur}
          hasError={isPasswordError}
          isValid={isPasswordValid}
          className="p-2 rounded bg-gray-800 border border-gray-700"
          errorMessage="Password must be at least 6 characters long"
        />
      </div>
      <div className="flex justify-between items-center">
        <Link href="/auth?mode=reset" className="text-blue-500 hover:underline">
          Forgot Password?
        </Link>
      </div>
      <Button
        className="bg-blue-500 hover:bg-blue-400 p-2 rounded-lg text-white disabled:bg-gray-300 disabled:hover:cursor-not-allowed"
        disabled={!isFormValid}
      >
        Login
      </Button>
      <p className="text-center text-gray-600">
        Don't have an account?{" "}
        <Link
          href="/auth?mode=signup"
          className="text-blue-500 hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
}
