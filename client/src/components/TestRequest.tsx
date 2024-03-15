"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { CiCalendarDate } from "react-icons/ci";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";
import { FiLink } from "react-icons/fi";
import { MdOutlineMail, MdOutlinePassword } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";
import useSWR from "swr";
import {
  BugColorType,
  TestRequestColorType,
  bugColor,
  testRequestColor,
} from "./Dashboard";

type Props = {};

const TestRequest = (props: Props) => {
  const { id } = useParams();

  const fetcher = ([url, id]: string[]) => {
    return axios.get<TestRequestType>(`http://localhost:9000/${url}/${id}`);
  };

  const { data, error, isValidating } = useSWR(
    ["api/test-request/", id as string],
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

  const bugHeaders = ["name", "status", "priority", "comments"];

  return (
    <>
      <main className="min-h-[calc(100vh-4.5rem)] gap-3 bg-gray-50  flex flex-col p-6 lg:px-20">
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
        <div className="flex items-center justify-between border-b pb-4 border-black/30 gap-8">
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
                <p className="text-lg ">
                  {data?.data.testerId?.name || "Not Assigned"}
                </p>
              </div>
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
                <p className="text-lg ">
                  {data?.data.projectManagerId?.name || "Not Assigned"}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* #####  END TEST REQUEST #### */}
        {/*  ###### BUGS ####### */}
        <section className="flex flex-col gap-4">
          <h3 className="text-4xl font-semibold">{`Bugs`}</h3>
          {/* Table */}
          <div className="grid grid-cols-[1fr,minmax(100px,auto),minmax(100px,auto),1fr]">
            {/* Header */}
            {bugHeaders.map((header) => (
              <div className="p-2 px-4 font-medium border-b border-b-gray-300 text-lg capitalize">
                <p>{header}</p>
              </div>
            ))}
            {bugs?.data
              .filter((bug) => bug.testRequestId?._id === data?.data._id)
              .map((bug) => (
                <>
                  <div className="p-2 px-4  border-b border-b-gray-200  capitalize">
                    <Link
                      href={`/bug/${bug._id}`}
                      className=" hover:underline underline-offset-4"
                    >
                      {bug.name}
                    </Link>
                  </div>
                  <div className="p-2 px-4  border-b border-b-gray-200  capitalize">
                    <p
                      className={`${
                        bugColor[bug.status as BugColorType]
                      } px-2 py-1 rounded-md font-medium `}
                    >
                      {bug.status}
                    </p>
                  </div>
                  <div className="p-2 px-4  border-b border-b-gray-200 flex gap-2 items-center  capitalize">
                    {bug.priority === "high" ? (
                      <FcHighPriority className="text-xl" />
                    ) : bug.priority === "medium" ? (
                      <FcMediumPriority className="text-xl" />
                    ) : (
                      <FcLowPriority className="text-xl" />
                    )}
                    <p>{bug.priority}</p>
                  </div>
                  <div className="p-2 px-4  border-b border-b-gray-200  capitalize">
                    <p>{`${bug.comments.slice(0, 100)}${
                      bug.comments.length > 100 ? "..." : ""
                    }`}</p>
                  </div>
                </>
              ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default TestRequest;