"use client";
import { DrawerOpt } from "@/components/auth/drawerOpt";
import { GoogleFetching } from "@/components/auth/googleFetching";
import LoginForm from "@/components/auth/loginForm";
import SignupForm from "@/components/auth/signupForm";
import { useHttp } from "@/hooks/useHttp";
import { closeDrawer } from "@/lib/slices/uiSlice";
import { useSearchParams } from "next/navigation";
import React, { useDebugValue } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";
export default function Auth() {
  const drawerState = useSelector((state) => state.ui.drawer);
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const drawerRef = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (drawerState) {
      drawerRef.current?.click();
      dispatch(closeDrawer());
    }
    console.log("Drawer state changed:", drawerState);
  }, [drawerState]);
  React.useEffect(() => {
    const user = localStorage.getItem("user");
    console.log(user);
    if (user) {
      redirect("/");
    }
    setIsLoading(false);
  }, []);
  if (isLoading) {
    return;
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      {mode === "login" ? (
        <LoginForm />
      ) : mode === "signup" ? (
        <SignupForm />
      ) : mode === "google" ? (
        <GoogleFetching />
      ) : (
        <LoginForm />
      )}
      <DrawerOpt drawerRef={drawerRef} />
    </div>
  );
}
