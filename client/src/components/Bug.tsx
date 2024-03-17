"use client";

import useToast from "@/store/useToast";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { FaBug } from "react-icons/fa6";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";
import { LuWorkflow } from "react-icons/lu";
import { PiStepsDuotone } from "react-icons/pi";
import { RiEdit2Line } from "react-icons/ri";
import { TiAttachment } from "react-icons/ti";
import useSWR from "swr";
import BugStatus from "./BugStatus";
import useUser from "@/store/useUser";
import Comments from "./Comments";

type Props = {};

const TestRequest = (props: Props) => {
  const { id } = useParams();
  const setToast = useToast((state) => state.setToast);
  const user = useUser((state) => state.user);

  const fetcher = ([url, id]: string[]) => {
    return axios.get<BugType>(`http://localhost:9000/${url}/${id}`);
  };

  const { data, error, isValidating } = useSWR(
    ["api/bug", id as string],
    fetcher
  );

  const receiverData =
    user?.role === "tester"
      ? {
          id: data?.data.testRequestId?.clientId?._id as string,
          email: data?.data.testRequestId?.clientId?.email as string,
          name: data?.data.testRequestId?.clientId?.name as string,
        }
      : {
          id: data?.data.testRequestId?.testerId?._id as string,
          email: data?.data.testRequestId?.testerId?.email as string,
          name: data?.data.testRequestId?.testerId?.name as string,
        };

  useEffect(() => {
    // Toast
    error && setToast({ msg: error?.response?.data, variant: "error" });
  }, [error]);

  return (
    <>
      <main className="min-h-[calc(100vh-4.5rem)] gap-3 bg-gray-50  flex flex-col p-6 lg:px-14">
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
              testRequest={data?.data.testRequestId}
              status={data?.data.status}
              receiverData={receiverData}
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
                  {data.data.images.map((img, i) => (
                    <Link
                      key={i}
                      href={img}
                      target="_blank"
                      className="relative z-0 w-60 h-40 hover:scale-95 transition-all rounded-md shadow-lg border overflow-hidden bg-white"
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
        <Comments comments={data?.data.comments} />
      </main>
    </>
  );
};

export default TestRequest;
