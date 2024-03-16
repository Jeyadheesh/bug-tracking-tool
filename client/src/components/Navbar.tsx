"use client";
import React, { use, useEffect, useRef, useState } from "react";
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
import { sendNotification } from "@/utils/sendNotification";
import useNotification from "@/hooks/useNotification";

type Props = {};

const Navbar = (props: Props) => {
  const [showNotification, setShowNotification] = useState(false);
  const [isNotificationLoading, setIsNotificationLoading] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const { setToast } = useToast();
  const setUser = useUser((state) => state.setUser);
  const user = useUser((state) => state.user);
  const pathname = usePathname();
  const route = useRouter();
  const { sendNotification } = useNotification();
  const refEle = useRef(null);

  const fetcher = async (url: string) => {
    const { data: resData } = await axios.get<UserType | undefined>(
      `http://localhost:9000${url}`,
      {
        withCredentials: true,
      }
    );
    if (resData?._id && pathname === "/") {
      route.replace("/dashboard");
      setUser(resData);
      return resData;
    } else if (resData?._id && pathname !== "/") {
      setUser(resData);
      return resData;
    } else route.replace("/");

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
      setUser(null);
      setToast({ msg: "Logged Out", variant: "success" });
      mutate("/api/me");

      route.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const getNotification = async () => {
    try {
      const { data: notificationData } = await axios.get<NotificationType[]>(
        `http://localhost:9000/api/notification/getByReceiverId/${user?._id}`
      );
      console.log(notificationData);
      setNotifications(notificationData);
      notificationData.some((notification) => !notification.isSeen) &&
        setIsNotificationLoading(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateIsSeen = async (id: string) => {
    try {
      const { data } = await axios.put(
        "http://localhost:9000/api/notification/updateIsSeen",
        { id }
      );
      console.log(data);
      getNotification();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getNotification();
    // sendNotification(
    //   "title",
    //   "message",
    //   user?._id || "",
    //   "65f30ff3ff32896b8946059e"
    // );
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      console.log(refEle.current, event.target);

      if (refEle.current && !refEle.current.contains(event.target as Node)) {
        console.log("clicked outside");
        setShowNotification(false);
      }
      console.log("clicked inside");
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="relative px-6  h-[4.5rem] border-b flex justify-between items-center">
      <Toast />
      {/* LOGO */}
      <h1 className="text-2xl font-bold">TrackDown</h1>

      {/* Modal */}
      <AnimatePresence mode="popLayout">
        {showNotification && (
          <motion.div
            ref={refEle}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            // transition={{ originX: 0, originY: 0 }}
            className="overflow-y-auto origin-top-right absolute top-14 right-24 w-80 h-96 bg-white shadow-lg  rounded-lg p-4"
          >
            {/* Need Loader */}

            {/* Notification */}
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
            {notifications.map((notification, i) => {
              return (
                <div
                  key={i}
                  className="cursor-pointer hover:bg-gray-50 transition-all  flex flex-col *:pt-1 *:border-b *:border-b-gray-300"
                >
                  <div>
                    <div
                      className={`${
                        !notification.isSeen ? "font-semibold" : "font-normal"
                      } flex gap-2`}
                    >
                      <h1 className={""}>{notification.title}</h1>
                      <span className=" text-xs text-gray-400 my-auto">
                        by name
                      </span>
                      {/* {!notification.isSeen && (
                        <span className="bg-primary text-xs px-1 text-gray-100 rounded-full my-auto h-2 w-2"></span>
                      )} */}
                    </div>
                    <p className="text-sm pb-2 ">
                      {notification.message.length > 50
                        ? `${notification.message.slice(0, 50)}...`
                        : notification.message}
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
        {user?._id && (
          <button
            onClick={() => setShowNotification((prev) => !prev)}
            className="relative hover:bg-black/20 rounded-full p-1.5 transition-all"
          >
            <IoMdNotificationsOutline className="text-[1.3rem]" />
            {isNotificationLoading && (
              <span className="absolute top-[0.1rem] right-[0.1rem] bg-primary text-white rounded-full w-2.5 h-2.5 flex justify-center items-center text-xs "></span>
            )}
          </button>
        )}
        <h1 className="capitalize">{user?.name || ""}</h1>
        {/* Action Buttons */}
        {user?._id && (
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
