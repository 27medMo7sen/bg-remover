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
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 border p-6 rounded-xl bg-gradient-to-b from-white to-blue-100 shadow-lg justify-center animate-drop max-w-sm mx-auto"
    >
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
          Signup with Google
        </Link>
      </div>
      <div className="flex items-center">
        <hr className="flex-grow border-t border-gray-700" />
        <span className="mx-4 text-center text-gray-600">or</span>
        <hr className="flex-grow border-t border-gray-700" />
      </div>
      <Input
        type="text"
        label={"Username"}
        className="p-2 rounded bg-gray-800 border border-gray-700"
        isValid={isUsernameValid}
        hasError={isUsernameError}
        onChange={onUsernameChange}
        onBlur={onUsernameBlur}
        errorMessage="Username must be at least 3 characters long"
      />
      <Input
        type="email"
        label={"Email"}
        className="p-2 rounded bg-gray-800 border border-gray-700"
        isValid={isEmailValid}
        hasError={isEmailError}
        onChange={onEmailChange}
        onBlur={onEmailBlur}
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
          className="p-2 rounded bg-gray-800 border border-gray-700"
          isValid={isPasswordValid}
          hasError={isPasswordError}
          onChange={onPasswordChange}
          onBlur={onPasswordBlur}
          errorMessage="Password must be at least 6 characters long"
        />
      </div>
      <div className="relative">
        <button
          type="button"
          className="absolute right-0 top-1 flex items-center pr-3 cursor-pointer"
          onClick={toggleConfirmPasswordVisibility}
        >
          {showConfirmPassword ? <RiEyeLine /> : <RiEyeOffLine />}
        </button>
        <Input
          type={showConfirmPassword ? "text" : "password"}
          label={"Confirm Password"}
          className="p-2 rounded bg-gray-800 border border-gray-700"
          isValid={isConfirmPasswordValid}
          hasError={isConfirmPasswordError}
          onChange={onConfirmPasswordChange}
          onBlur={onConfirmPasswordBlur}
          errorMessage="Please confirm your password"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="terms"
          className="rounded"
          checked={policy}
          onChange={(e) => setPolicy(e.target.checked)}
        />
        <label htmlFor="terms" className="text-sm text-gray-600">
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
      <Button
        className="bg-blue-500 hover:bg-blue-400 p-2 rounded-lg text-white disabled:bg-gray-300 disabled:hover:cursor-not-allowed"
        disabled={!isFormValid}
        type="submit"
      >
        Sign Up
      </Button>
      <p className="text-center text-gray-600">
        Already have an account?{" "}
        <Link href="/auth?mode=login" className="text-blue-500 hover:underline">
          Log In
        </Link>
      </p>
    </form>
  );
}
