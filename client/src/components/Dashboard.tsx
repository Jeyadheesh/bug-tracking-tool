import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import NewRequest from "./NewRequest";
import Image from "next/image";
import { FaUserShield } from "react-icons/fa6";
import { IoFlagSharp } from "react-icons/io5";
import { FiLink } from "react-icons/fi";
import { CgAdd } from "react-icons/cg";
import { MdOutlineAdd } from "react-icons/md";

type Props = {};

const Dashboard = (props: Props) => {
  const [openTestRequests, setOpenTestRequests] = useState<TestRequestType[]>([
    {
      _id: "345",
      comments:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, pariatur!",
      name: "Test Request 1",
      status: "request under review",
      url: "https://react-icons.github.io/react-icons/search/#q=flag",
      tester: undefined,
    },
  ]);
  const [closedRequests, setClosedRequests] = useState<TestRequestType[]>([
    {
      _id: "345",
      comments:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, pariatur!",
      name: "Test Request 1",
      status: "testing completed",
      url: "https://react-icons.github.io/react-icons/search/#q=flag",
      tester: {
        name: "P. Ramanujam",
      },
    },
    {
      _id: "345",
      comments:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, pariatur!",
      name: "Test Request 1",
      status: "testing completed",
      url: "https://react-icons.github.io/react-icons/search/#q=flag",
      tester: {
        name: "P. Ramanujam",
      },
    },
    {
      _id: "345",
      comments:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, pariatur!",
      name: "Test Request 1",
      status: "testing completed",
      url: "https://react-icons.github.io/react-icons/search/#q=flag",
      tester: {
        name: "P. Ramanujam",
      },
    },
    {
      _id: "345",
      comments:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, pariatur!",
      name: "Test Request 1",
      status: "testing completed",
      url: "https://react-icons.github.io/react-icons/search/#q=flag",
      tester: {
        name: "P. Ramanujam",
      },
    },
    {
      _id: "345",
      comments:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, pariatur!",
      name: "Test Request 1",
      status: "testing completed",
      url: "https://react-icons.github.io/react-icons/search/#q=flag",
      tester: {
        name: "P. Ramanujam",
      },
    },
  ]);
  const [showCreate, setShowCreate] = useState(false);

  const fetcher = (url: string) => {
    return axios.get<TestRequestType[]>(`http://localhost:9000/${url}`);
  };

  const { data, error, isValidating } = useSWR("api/test-request", fetcher, {
    dedupingInterval: 50000, //50s
  });

  useEffect(() => {
    if (data) {
      const completed: TestRequestType[] = [];
      const open: TestRequestType[] = [];
      data?.data.forEach((test) =>
        test.status.toLowerCase() === "testing completed"
          ? completed.push(test)
          : open.push(test)
      );
      // setOpenTestRequests(open);
      // setClosedRequests(completed);
    }

    if (error) {
    }
  }, [data]);

  return (
    <>
      <main className="min-h-[calc(100vh-4.5rem)] gap-8 bg-gray-50  flex flex-col p-6 px-10">
        {/* OPEN TEST REQUEST */}
        <div className="flex flex-col gap-4">
          <h4 className="text-2xl font-semibold">Open Test Requests</h4>
          {openTestRequests.length === 0 ? (
            <div className="border-2 rounded-lg p-6 py-10 bg-white  border-dashed bg-primary-varient/5 border-primary flex flex-col gap-3 justify-center items-center">
              <h5 className="font-semibold text-xl">
                You Don't Have Any Open Test Requests
              </h5>
              <button
                onClick={() => setShowCreate(true)}
                className=" w-max px-10 py-2 active:scale-95 transition-all rounded-lg font-semibold bg-gradient-to-br from-primary to-primary-varient text-white "
              >
                Create New Test Request
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-8">
              {openTestRequests.map((test) => (
                <RequestCard {...test} />
              ))}
              {/* Add New Request */}
              <div className="p-6 rounded-md bg-gray-100 hover:scale-95 transition-all shadow-lg flex flex-col justify-center cursor-not-allowed items-center">
                <MdOutlineAdd className="text-6xl text-gray-600  " />
                <p className="font-semibold text-gray-500 text-center">{`You can have only one open request at a time`}</p>
              </div>
            </div>
          )}
        </div>
        {/* CLOSED TEST REQUEST */}
        <div className="flex flex-col gap-4">
          <h4 className="text-2xl font-semibold">Closed Test Requests</h4>
          {closedRequests.length === 0 ? (
            <div className=" rounded-lg p-6 py-10 bg-white  flex flex-col gap-3 justify-center items-center">
              <h5 className="font-semibold text-xl">
                You Don't Have Any Closed Test Requests
              </h5>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-8">
              {closedRequests.map((test) => (
                <RequestCard {...test} />
              ))}
            </div>
          )}
        </div>
      </main>
      <AnimatePresence>
        {showCreate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <NewRequest setShow={setShowCreate} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Dashboard;

interface TestRequestType {
  _id: string;
  name: string;
  status: string;
  url: string;
  comments: string;
  tester:
    | {
        name: string;
      }
    | undefined;
}

type TestRequestColorType = keyof typeof testRequestColor;
type BugColorType = keyof typeof bugColor;

const testRequestColor = {
  "request under review": "bg-amber-50 text-amber-500",
  "request accepted": "bg-sky-100 text-sky-500",
  "testing in progress": "bg-indigo-100 text-indigo-500",
  "testing completed": "bg-green-100 text-green-500",
  "testing blocked": "bg-red-100 text-red-500",
} as const;

const bugColor = {
  "Under Triage": "bg-yellow-50 text-yellow-500",
  Accepted: "bg-cyan-100 text-cyan-500",
  "Need More Info": "bg-blue-100 text-blue-500",
  "Not Reproducible": "bg-orange-100 text-orange-500",
  Invalid: "bg-red-100 text-red-500",
  Fixed: "bg-green-100 text-green-500",
  "Validated and Closed": "bg-indigo-100 text-indigo-500",
} as const;

const RequestCard = ({
  _id,
  comments,
  name,
  status,
  url,
  tester,
}: TestRequestType) => {
  return (
    <div className="p-6 shadow-lg  bg-white  flex flex-col gap-2 rounded-md cursor-pointer hover:scale-95 transition-all ">
      <h4 className="text-2xl font-semibold text-gray-800 hover:underline underline-offset-2 w-max">
        {name}
      </h4>
      {/* Comments */}
      <p className="text-sm text-gray-500 ">{comments}</p>
      <div className="grid grid-cols-[auto,1fr] items-center gap-y-2 gap-x-4">
        {/* Tester */}
        <div className="flex items-center gap-1">
          <FaUserShield className="" />
          <p className="font-semibold ">Tester</p>
        </div>
        <p className="text-sm font-medium">{tester?.name || "Not Assigned"}</p>
        {/* Status */}
        <div className="flex items-center gap-1">
          <IoFlagSharp />
          <p className="font-semibold ">Staus</p>
        </div>
        <p
          className={`text-sm  ${
            testRequestColor[status as TestRequestColorType]
          } w-max p-1 capitalize font-medium rounded-md px-2 `}
        >
          {status}
        </p>
        {/* URL */}
        <div className="flex items-center gap-1">
          <FiLink />
          <p className="font-semibold ">URL</p>
        </div>
        <p
          className={`text-sm  font-medium text-ellipsis overflow-hidden whitespace-nowrap `}
        >
          {url}
        </p>
      </div>
    </div>
  );
};
