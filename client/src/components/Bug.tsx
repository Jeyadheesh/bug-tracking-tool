"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
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
import { TiAttachment } from "react-icons/ti";
import { PiStepsDuotone } from "react-icons/pi";
import { LuWorkflow } from "react-icons/lu";
import useToast from "@/store/useToast";
import BugStatus from "./BugStatus";

type Props = {};

const TestRequest = (props: Props) => {
  const { id } = useParams();
  const setToast = useToast((state) => state.setToast);

  const fetcher = ([url, id]: string[]) => {
    return axios.get<BugType>(`http://localhost:9000/${url}/${id}`);
  };

  const { data, error, isValidating } = useSWR(
    ["api/bug/", id as string],
    fetcher
  );

  console.log(data?.data.testRequestId?.testerId);

  useEffect(() => {
    // Toast
    error && setToast({ msg: error, variant: "error" });
  }, [error]);

  return (
    <>
      <main className="min-h-[calc(100vh-4.5rem)] gap-3 bg-gray-50   flex flex-col p-6 lg:px-14">
        {/* Card */}
        <div className="flex flex-col gap-3 bg-white overflow-hidden p-6 shadow-lg rounded-md relative">
          <div className="absolute opacity-5 rotate-45 top-1 right-3 ">
            <FaBug className="text-[35rem] text-primary" />
          </div>
          <div className="flex items-center justify-between">
            {/* Name */}
            <h3 className="text-4xl font-semibold">{data?.data.name}</h3>
            {/* Status */}
            <BugStatus
              status={data?.data.status}
              receiverId={
                data?.data.testRequestId?.testerId as unknown as string
              }
            />
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
          {/* Priority */}
          <div className="font-medium  text-lg capitalize items-center flex gap-2">
            {data?.data.priority === "high" ? (
              <FcHighPriority className="text-xl" />
            ) : data?.data.priority === "medium" ? (
              <FcMediumPriority className="text-xl" />
            ) : (
              <FcLowPriority className="text-xl" />
            )}
            <p>{`${data?.data.priority} Severity Level `}</p>
          </div>
          <div className="flex items-center justify-between  gap-8">
            <div className="flex flex-col gap-4">
              {/* Summary */}
              <p className="text-lg font-medium  whitespace-pre-wrap text-gray-700">
                {data?.data.summary}
              </p>
              {/* Steps */}
              <div className="flex gap-2  items-center">
                <PiStepsDuotone className="text-3xl text-green-400" />
                <h3 className="text-lg font-semibold">Steps To Reproduce</h3>
              </div>
              <p className="text-lg font-medium  whitespace-pre-wrap text-gray-700">
                {data?.data.stepsToReproduce || "-"}
              </p>
              {/* Workflow */}
              <div className="flex gap-2  items-center">
                <LuWorkflow className="text-3xl text-blue-400" />
                <h3 className="text-lg font-semibold">Workflow</h3>
              </div>
              <p className="text-lg font-medium  whitespace-pre-wrap text-gray-700">
                {data?.data.feature || "-"}
              </p>

              {/* Attachments */}
              <div className="flex gap-2  items-center">
                <TiAttachment className="text-3xl text-fuchsia-400" />
                <h3 className="text-lg font-semibold">Attachments</h3>
              </div>
              {data?.data.images && data.data.images.length > 0 ? (
                <div className="flex flex-wrap gap-6 items-center">
                  {data.data.images.map((img) => (
                    <Link
                      href={img}
                      target="_blank"
                      className="relative w-60 h-40 rounded-md shadow-lg border overflow-hidden bg-white"
                    >
                      {img.includes(".mp4") ? (
                        <video
                          src={img}
                          className="object-cover absolute w-full h-full"
                        />
                      ) : (
                        <Image
                          alt="attachment"
                          fill
                          src={img}
                          className="object-cover "
                        />
                      )}
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-lg">No Attachment</p>
              )}
            </div>
            {/* Tester  */}
            {/* <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex gap-4 items-center text-lg">
                  <p className="font-semibold ">Tester</p>
                </div>
                <div className="flex gap-2 items-center">
                  {data?.data.testRequestId?.testerId?.img && (
                    <div className="w-10 h-10 relative rounded-full border border-gray-900 ">
                      <Image
                        alt="DP"
                        src={data?.data.testRequestId?.testerId?.img}
                        fill
                        className="object-cover rounded-full "
                      />
                    </div>
                  )}
                  <p className="text-lg ">
                    {data?.data.testRequestId?.testerId?.name || "Not Assigned"}
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </main>
    </>
  );
};

export default TestRequest;
