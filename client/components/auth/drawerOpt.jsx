import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { closeDrawer } from "@/lib/slices/uiSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHttp } from "@/hooks/useHttp";
import { redirect } from "next/navigation";
export const DrawerOpt = ({ drawerRef }) => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const { post, setIsLoading, isLoading, error } = useHttp();

  useEffect(() => {
    dispatch(closeDrawer());
  }, [dispatch]);
  const handleChange = (val) => {
    setValue(val);
    console.log(value);
  };
  React.useEffect(() => {
    if (value.length === 6) {
      const verifyEmail = async () => {
        setIsLoading("drawer");
        const res = await post("/auth/verify", {
          code: value,
          email: localStorage.getItem("verifyEmail"),
        });
        console.log("Email verified successfully:", res);
        if (res) setIsLoading("success");
      };
      verifyEmail();
      redirect("/auth?mode=login");
    }
  }, [value]);
  useEffect(() => {
    console.log(error, isLoading);
  }, [error, isLoading]);
  return (
    <Drawer>
      <DrawerTrigger ref={drawerRef} className="text-blue-500 hover:underline">
        Need help?
      </DrawerTrigger>
      <DrawerContent className="min-h-1/2">
        <DrawerHeader>
          <DrawerTitle>Confirm your Email</DrawerTitle>
          <DrawerDescription>
            Please check your email for a confirmation code to complete your
            registration. If you don't see it, check your spam folder or try
            resending the confirmation.
          </DrawerDescription>
          <div className="flex items-center justify-center mt-4">
            <InputOTP
              maxLength={6}
              value={value}
              onChange={handleChange}
              disabled={isLoading === "drawer"}
              className={`${
                isLoading === "drawer" ? "opacity-50 cursor-not-allowed" : ""
              }
             `}
            >
              <InputOTPGroup>
                <InputOTPSlot
                  index={0}
                  className={`${
                    isLoading === "drawer"
                      ? "opacity-50 cursor-not-allowed"
                      : isLoading === "success"
                      ? "border-green-500"
                      : "border-input"
                  } ${error ? "border-red-500" : ""}`}
                />
                <InputOTPSlot
                  index={1}
                  className={`${
                    isLoading === "drawer"
                      ? "opacity-50 cursor-not-allowed"
                      : isLoading === "success"
                      ? "border-green-500"
                      : "border-input"
                  } ${error ? "border-red-500" : ""}`}
                />
                <InputOTPSlot
                  index={2}
                  className={`${
                    isLoading === "drawer"
                      ? "opacity-50 cursor-not-allowed"
                      : isLoading === "success"
                      ? "border-green-500"
                      : "border-input"
                  } ${error ? "border-red-500" : ""}`}
                />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot
                  index={3}
                  className={`${
                    isLoading === "drawer"
                      ? "opacity-50 cursor-not-allowed"
                      : isLoading === "success"
                      ? "border-green-500"
                      : "border-input"
                  } ${error ? "border-red-500" : ""}`}
                />
                <InputOTPSlot
                  index={4}
                  className={`${
                    isLoading === "drawer"
                      ? "opacity-50 cursor-not-allowed"
                      : isLoading === "success"
                      ? "border-green-500"
                      : "border-input"
                  } ${error ? "border-red-500" : ""}`}
                />
                <InputOTPSlot
                  index={5}
                  className={`${
                    isLoading === "drawer"
                      ? "opacity-50 cursor-not-allowed"
                      : isLoading === "success"
                      ? "border-green-500"
                      : "border-input"
                  } ${error ? "border-red-500" : ""}`}
                />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose className="text-blue-500 hover:underline">
            Close
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
