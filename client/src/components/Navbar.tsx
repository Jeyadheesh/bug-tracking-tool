"use client";
import React from "react";
import Toast from "./Toast";
import useSWR, { mutate } from "swr";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import useToast from "@/store/useToast";
import useUser from "@/store/useUser";
import { BiLogOut, BiLogOutCircle } from "react-icons/bi";
import { CgLogOut } from "react-icons/cg";
import { MdLogout } from "react-icons/md";

type Props = {};

const Navbar = (props: Props) => {
  const { setToast } = useToast();
  const setUser = useUser((state) => state.setUser);
  const pathname = usePathname();
  const route = useRouter();

  const fetcher = async (url: string) => {
    const { data: resData } = await axios.get<UserType | undefined>(
      `http://localhost:9000${url}`,
      {
        withCredentials: true,
      }
    );
    if (resData?._id && pathname === "/") {
      route.push("/dashboard");
      setUser(resData);
      return resData;
    } else if (resData?._id && pathname !== "/") {
      setUser(resData);
      return resData;
    } else route.push("/");

    return resData;
  };
  const { data, isLoading } = useSWR("/api/me", fetcher);

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9000/api/auth/logout",
        {
          withCredentials: true,
        }
      );
      console.log(data);
      setToast({ msg: "Logged Out", variant: "success" });
      mutate("/api/me");
      route.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav className="px-6  h-[4.5rem] border-b flex justify-between items-center">
      <Toast />
      {/* LOGO */}
      <h1 className="text-2xl font-bold">TrackDown</h1>
      <div className="flex items-center gap-6">
        <h1 className="capitalize">{data?.name || ""}</h1>
        {/* Action Buttons */}
        {data?._id && (
          <button
            onClick={handleLogout}
            className="hover:bg-black/20 p-2 rounded-full transition-all"
          >
            <MdLogout />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
