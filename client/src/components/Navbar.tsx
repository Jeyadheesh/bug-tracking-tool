"use client";
import React from "react";
import Toast from "./Toast";
import useSWR from "swr";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import useToast from "@/store/useToast";

type Props = {};

const Navbar = (props: Props) => {
  const { setToast } = useToast();
  const pathname = usePathname();
  const route = useRouter();
  const fetcher = async (url: string) => {
    const { data: resData } = await axios.get<UserType | undefined>(
      `http://localhost:9000${url}`,
      {
        withCredentials: true,
      }
    );
    console.log(resData);
    if (resData?._id && pathname === "/") {
      route.push("/dashboard");
      return resData;
    } else if (resData?._id && pathname !== "/") return resData;
    else route.push("/");

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
      <h1 onClick={handleLogout} className="cursor-pointer">
        {data?.name || ""}
      </h1>
      {/* Action Buttons */}
    </nav>
  );
};

export default Navbar;
