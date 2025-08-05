import MainLoader from "../ui/mainLoader";
import { useHttp } from "@/hooks/useHttp";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { setCredentials } from "@/lib/slices/authSlice";
import { useDispatch } from "react-redux";
import { redirect } from "next/navigation";
export const GoogleFetching = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { get, post, put, del, isLoading } = useHttp();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      const user = await get("/auth/user-by-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setCredentials({ user, token: user.token }));
    };
    fetchUser();
    redirect("/");
  }, [get, token]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <MainLoader />
    </div>
  );
};
