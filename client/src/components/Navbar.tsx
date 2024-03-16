"use client";
import React, { use, useEffect, useState } from "react";
import Toast from "./Toast";
import useSWR, { mutate } from "swr";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import useToast from "@/store/useToast";
import useUser from "@/store/useUser";
import { BiLogOut, BiLogOutCircle } from "react-icons/bi";
import { CgLogOut } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";

type Props = {};

const Navbar = (props: Props) => {
  const [showNotification, setShowNotification] = useState(true);
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
    <nav className="relative px-6  h-[4.5rem] border-b flex justify-between items-center">
      <Toast />
      {/* LOGO */}
      <h1 className="text-2xl font-bold">TrackDown</h1>

      <div className="flex gap-6">
        <button
          onClick={() => setShowNotification((prev) => !prev)}
          className="relative"
        >
          <IoMdNotificationsOutline className="text-2xl" />
          <span className="absolute -top-[0.2rem] -right-[0.2rem] bg-primary text-white rounded-full w-2.5 h-2.5 flex justify-center items-center text-xs "></span>
        </button>
        <h1 onClick={handleLogout} className="cursor-pointer">
          Logout
        </h1>
      </div>

      {/* Modal */}
      <AnimatePresence mode="popLayout">
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            // transition={{ originX: 0, originY: 0 }}
            className="overflow-y-auto origin-top-right absolute top-14 right-24 w-80 h-96 bg-white shadow-lg  rounded-lg p-4"
          >
            <h1 className="text-xl font-semibold border-b border-gray-300 pb-2">
              Notifications
            </h1>

            {false && (
              <div className="flex h-full justify-center items-center flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <h1 className="font-semibold">
                    You Don't Have Any Notifications
                  </h1>
                </div>
              </div>
            )}

            {[1, 2, 32, 3, 24, 2].map((d, i) => {
              return (
                <div
                  key={i}
                  className="cursor-pointer hover:bg-gray-50 transition-all  flex flex-col *:pt-1 *:border-b *:border-b-gray-300"
                >
                  <div>
                    <div className="flex gap-1">
                      <h1 className=" font-semibold">Title</h1>
                      <span className="text-xs text-gray-400 my-auto">
                        by name
                      </span>
                    </div>
                    <p className="text-sm pb-2">
                      asdfja sdfjsad fkasdjf sajdfksajd dsf asdjf;a jsd;fkasjdf
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
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
