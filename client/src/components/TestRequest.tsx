"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { FaExclamation } from "react-icons/fa";
import { FaBug } from "react-icons/fa6";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";
import { FiLink } from "react-icons/fi";
import { IoFlagSharp } from "react-icons/io5";
import { MdOutlineMail, MdOutlinePassword } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";
import useSWR from "swr";
import {
  BugColorType,
  TestRequestColorType,
  bugColor,
  testRequestColor,
} from "./Dashboard";
import CardBg from "../assets/test-request-bg.jpg";
import useUser from "@/store/useUser";
import { AnimatePresence, motion } from "framer-motion";
import AssignTester from "./AssignTester";
import Button from "./Button";
import CreateBug from "./CreateBug";

type Props = {};

const TestRequest = (props: Props) => {
  const { id } = useParams();
  const user = useUser((state) => state.user);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showBugModal, setShowBugModal] = useState(false);

  const fetcher = ([url, id]: string[]) => {
    return axios.get<TestRequestType>(`http://localhost:9000/${url}/${id}`);
  };

  const { data, error, isValidating } = useSWR(
    ["api/test-request", id as string],
    fetcher,
    {
      dedupingInterval: 10000, //10s
    }
  );

  useEffect(() => {
    // Toast
  }, [error]);

  const bugFetcher = (url: string) => {
    return axios.get<BugType[]>(`http://localhost:9000/${url}`);
  };

  const {
    data: bugs,
    error: bugError,
    isValidating: bugIsValidating,
  } = useSWR("api/bug/", bugFetcher, {
    dedupingInterval: 10000, //10s
  });

  useEffect(() => {
    // Toast
  }, [bugError]);

  return (
    <>
      <main className="min-h-[calc(100vh-4.5rem)] gap-3 bg-gray-50  flex flex-col p-6 lg:px-14">
        {/* Card */}
        <div className="flex flex-col relative gap-3 bg-white p-6 shadow-lg rounded-md">
          <div className="flex items-center justify-between">
            {/* Name */}
            <h3 className="text-4xl font-semibold">{data?.data.name}</h3>
            {/* Status */}
            <h3
              className={`text-lg  ${
                testRequestColor[data?.data.status as TestRequestColorType]
              } w-max p-1 capitalize font-medium rounded-md px-4 `}
            >
              {data?.data.status}
            </h3>
          </div>
          {/* Date */}
          <div className="gap-6 flex items-center font-semibold text-gray-500 ">
            <div className="flex gap-3 items-center">
              <div className="flex gap-1 items-center">
                <CiCalendarDate className="text-xl" />
                <p>Created At</p>
              </div>
              {data?.data.createdAt?.split("T")[0]}
            </div>
            <div className="flex gap-3 items-center">
              <div className="flex gap-1 items-center">
                <RiEdit2Line className="text-xl" />
                <p>Last Updated</p>
              </div>
              {data?.data.updatedAt?.split("T")[0]}
            </div>
          </div>
          <div className="flex items-center justify-between  gap-8">
            <div className="flex flex-col gap-3">
              {/* Comments */}
              <p className="text-lg font-medium text-gray-700">
                {data?.data.comments}
              </p>
              <div className="flex gap-2 items-start justify-between">
                {/* Show URL , Credentials */}
                <div className="grid grid-cols-[auto,1fr] items-center gap-y-1 gap-x-4">
                  {/* URL */}
                  <div className="flex items-center gap-1 text-lg">
                    <FiLink className="text-blue-600" />
                    <p className="font-semibold ">URL</p>
                  </div>

                  {data?.data.url ? (
                    <Link
                      href={data?.data.url}
                      target="_blank"
                      className={` text-blue-600 hover:underline text-lg underline-offset-2 font-medium text-ellipsis overflow-hidden whitespace-nowrap `}
                    >
                      {data?.data.url}
                    </Link>
                  ) : (
                    <p>{"-"}</p>
                  )}
                  {/* Email */}
                  <div className="flex items-center gap-1 text-lg">
                    <MdOutlineMail className="text-amber-400" />
                    <p className="font-semibold ">Email</p>
                  </div>

                  {data?.data.url ? (
                    <p
                      className={` text-lg underline-offset-2 font-medium text-ellipsis overflow-hidden whitespace-nowrap `}
                    >
                      {data?.data.credientials?.email}
                    </p>
                  ) : (
                    <p>{"-"}</p>
                  )}
                  {/* Password */}
                  <div className="flex items-center gap-1 text-lg">
                    <MdOutlinePassword className="text-green-600" />
                    <p className="font-semibold ">Password</p>
                  </div>

                  {data?.data.url ? (
                    <p
                      className={` text-lg underline-offset-2 font-medium text-ellipsis overflow-hidden whitespace-nowrap `}
                    >
                      {data?.data.credientials?.password}
                    </p>
                  ) : (
                    <p>{"-"}</p>
                  )}
                </div>
              </div>
            </div>
            {/* ASSIGNED PEOPLE */}
            <div className="flex flex-col gap-6">
              {/* Tester */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-4 items-center text-lg">
                  {/* <FaUserShield className="text-violet-800 text-xl" /> */}
                  <p className="font-semibold ">Tester</p>
                </div>
                <div className="flex gap-2 items-center">
                  {data?.data.testerId?.img && (
                    <div className="w-10 h-10 relative rounded-full border border-gray-900 ">
                      <Image
                        alt="DP"
                        src={data?.data.testerId?.img}
                        fill
                        className="object-cover rounded-full "
                      />
                    </div>
                  )}
                  <p className=" ">
                    {data?.data.testerId?.name || "Not Assigned"}
                  </p>
                </div>
                {user?.role === "projectManager" && !data?.data.testerId && (
                  <button
                    onClick={() => setShowAssignModal(true)}
                    className="px-6 py-1 bg-primary text-white font-semibold rounded-md"
                  >
                    Assign Tester
                  </button>
                )}
              </div>
              {/* Project Manager */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-4 items-center text-lg">
                  {/* <FaUserTie className="text-red-500 text-xl" /> */}
                  <p className="font-semibold ">Project Manager</p>
                </div>
                <div className="flex gap-2 items-center">
                  {data?.data.projectManagerId?.img && (
                    <div className="w-10 h-10 relative rounded-full border border-gray-900 ">
                      <Image
                        alt="DP"
                        src={data?.data.projectManagerId?.img}
                        fill
                        className="object-cover rounded-full "
                      />
                    </div>
                  )}
                  <p className=" ">
                    {data?.data.projectManagerId?.name || "Not Assigned"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute opacity-5 z-0 select-none  -rotate-12 top-5 right-[20%] ">
            <Image alt="bg" src={CardBg} width={340} height={270} />
          </div>{" "}
        </div>
        {/* #####  END TEST REQUEST #### */}
        {/*  ###### BUGS ####### */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-semibold">{`Bugs`}</h3>
            {user?.role === "tester" && (
              <Button
                onClick={() => setShowBugModal(true)}
                disabled={
                  data?.data.status === "request under review" ||
                  data?.data.status === "request accepted"
                }
              >
                Raise Bug
              </Button>
            )}
          </div>
          {bugs?.data.length === 0 ? (
            <div className=" rounded-lg p-6 py-10 bg-white  flex flex-col gap-3 justify-center items-center">
              <h5 className="font-semibold text-xl">
                This Test Request Doesn't Have Any Bugs
              </h5>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {bugs?.data.map((bug) => (
                <BugCard {...bug} />
              ))}
            </div>
          )}
        </section>
      </main>
      {/* Assign Tester */}
      <AnimatePresence>
        {showAssignModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AssignTester
              testRequest={data?.data}
              setShow={setShowAssignModal}
            />
          </motion.div>
        )}
        {showBugModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CreateBug setShow={setShowBugModal} testRequest={data?.data} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TestRequest;

const BugCard = ({ _id, comments, name, status, priority }: BugType) => {
  return (
    <Link
      href={`/bug/${_id}`}
      className="p-6 relative shadow-lg  bg-white  flex flex-col gap-2 rounded-md cursor-pointer hover:scale-95 transition-all "
    >
      <h4 className="text-2xl font-semibold text-gray-800 hover:underline underline-offset-2 w-max">
        {name}
      </h4>
      {/* Comments */}
      <p className="text-sm text-gray-500 ">{comments}</p>
      <div className="grid grid-cols-[auto,1fr] items-center gap-y-2 gap-x-4">
        {/* Priority */}
        <div className="flex items-center gap-1">
          <FaExclamation className="text-violet-800 " />
          <p className="font-semibold ">Severity</p>
        </div>
        <div className="font-medium capitalize flex gap-2">
          {priority === "high" ? (
            <FcHighPriority className="text-xl" />
          ) : priority === "medium" ? (
            <FcMediumPriority className="text-xl" />
          ) : (
            <FcLowPriority className="text-xl" />
          )}
          <p>{priority}</p>
        </div>
        {/* Status */}
        <div className="flex items-center gap-1">
          <IoFlagSharp className="text-pink-400" />
          <p className="font-semibold ">Status</p>
        </div>
        <p
          className={`text-sm  ${
            bugColor[status as BugColorType]
          } w-max p-1 capitalize font-medium rounded-md px-2 `}
        >
          {status}
        </p>
      </div>
      <div className="absolute opacity-5 rotate-45 top-0 right-0 ">
        <FaBug className="text-9xl text-primary" />
      </div>
    </Link>
  );
};
