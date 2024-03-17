"use client";
import useToast from "@/store/useToast";
import useUser from "@/store/useUser";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import useSWR, { mutate } from "swr";
import Loader from "./Loader";
import Toast from "./Toast";

type Props = {};

const Navbar = (props: Props) => {
  const [showNotification, setShowNotification] = useState(false);
  const [isNotificationLoading, setIsNotificationLoading] = useState(true);
  const [isNotification, setIsNotification] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const { setToast } = useToast();
  const setUser = useUser((state) => state.setUser);
  const user = useUser((state) => state.user);
  const pathname = usePathname();
  const route = useRouter();
  const refEle = useRef<HTMLDivElement | null>(null);

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
      setIsNotificationLoading(true);
      const { data: notificationData } = await axios.get<NotificationType[]>(
        `http://localhost:9000/api/notification/getByReceiverId/${user?._id}`
      );
      setNotifications(notificationData);
      notificationData.some((notification) => !notification.isSeen)
        ? setIsNotification(true)
        : setIsNotification(false);

      setIsNotificationLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateIsSeen = async () => {
    try {
      const { data } = await axios.patch(
        "http://localhost:9000/api/notification/updateIsSeenAll",
        { receiverId: user?._id }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    user && getNotification();
  }, [user]);

  useEffect(() => {
    !showNotification && user && getNotification();
  }, [showNotification]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (event.target.id === "bell") return;

      if (refEle.current && !refEle.current.contains(event.target as Node)) {
        setShowNotification(false);
      }
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
      <Link href={`${user?._id ? "/dashboard" : "/"}`}>
        <h1 className="text-2xl font-bold">TrackDown</h1>
      </Link>

      {/* Modal */}
      {showNotification && (
        <motion.div
          ref={refEle}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="z-[1000] overflow-y-auto origin-top-right absolute top-14 right-24 w-80 h-96 bg-white shadow-lg  rounded-lg "
        >
          {/* Need Loader */}

          {/* Notification */}
          <h1 className="text-xl font-semibold p-4">Notifications</h1>
          {isNotificationLoading ? (
            <div className="mx-auto w-fit mt-[45%]">
              <Loader size="lg" type="primary" />
            </div>
          ) : notifications.length <= 0 ? (
            <div className="flex mt-[48%] justify-center items-center flex-col gap-2">
              <div className="flex gap-2 items-center">
                <h1 className="font-semibold">
                  You Don't Have Any Notifications
                </h1>
              </div>
            </div>
          ) : (
            notifications.map((notification, i) => {
              return (
                <div
                  key={i}
                  className="cursor-pointer hover:bg-gray-50 transition-all last:border-b-0 px-4  flex flex-col *:pt-1 *:border-b *:border-b-gray-300"
                >
                  <div
                  // className={`${!notification.isSeen ? "font-semibold" : ""}`}
                  >
                    <div
                      className={`${
                        !notification.isSeen ? "font-semibold" : "font-medium"
                      } flex gap-2`}
                    >
                      {/* <span className=" text-xs text-gray-400 my-auto">
                          by name
                        </span> */}
                      <h1 className={""}>{notification.title}</h1>
                      {!notification.isSeen && (
                        <span className=" bg-primary text-xs px-1 text-gray-100 rounded-full my-auto h-2 w-2"></span>
                      )}
                    </div>
                    <p
                      className={`capitalize ${
                        !notification.isSeen ? "font-medium" : "font-normal"
                      } text-sm pb-2 `}
                    >
                      {notification.message.length > 70
                        ? `${notification.message.slice(0, 70)}...`
                        : notification.message}{" "}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </motion.div>
      )}

      {/* Notification Button */}
      <div className="flex items-center gap-6">
        {user?._id && (
          <button
            id="bell"
            onClick={async () => {
              setShowNotification((e) => !e);
              await updateIsSeen();
            }}
            className="relative hover:bg-black/20 rounded-full p-1.5 transition-all"
          >
            <IoMdNotificationsOutline id="bell" className="text-[1.3rem]" />
            {isNotification && (
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
