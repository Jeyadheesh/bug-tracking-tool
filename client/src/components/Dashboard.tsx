import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBug } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa6";
import { FiLink } from "react-icons/fi";
import { IoFlagSharp } from "react-icons/io5";
import { MdOutlineAdd } from "react-icons/md";
import useSWR from "swr";
import NewRequest from "./NewRequest";
import CardBg from "../assets/test-request-bg.jpg";
import Image from "next/image";

type Props = {};

const Dashboard = (props: Props) => {
  const [openTestRequests, setOpenTestRequests] = useState<TestRequestType[]>([
    {
      _id: "65f44a841c0a6c138c24c75e",
      comments:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, pariatur!",
      name: "Test Request 1",
      status: "request under review",
      url: "https://react-icons.github.io/react-icons/search/#q=flag",
      testerId: undefined,
    },
  ]);
  const [closedRequests, setClosedRequests] = useState<TestRequestType[]>([
    {
      _id: "65f44a841c0a6c138c24c75e",
      comments:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, pariatur!",
      name: "Test Request 1",
      status: "testing completed",
      url: "https://react-icons.github.io/react-icons/search/#q=flag",
      testerId: {
        name: "P. Ramanujam",
        _id: "65f4489baa6f72212e3dce26",
        email: "ram@gmail.com",
      },
    },
    {
      _id: "65f44a841c0a6c138c24c75e",
      comments:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, pariatur!",
      name: "Test Request 1",
      status: "testing completed",
      url: "https://react-icons.github.io/react-icons/search/#q=flag",
      testerId: {
        name: "P. Ramanujam",
        _id: "65f4489baa6f72212e3dce26",
        email: "ram@gmail.com",
      },
    },
    {
      _id: "65f44a841c0a6c138c24c75e",
      comments:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, pariatur!",
      name: "Test Request 1",
      status: "testing completed",
      url: "https://react-icons.github.io/react-icons/search/#q=flag",
      testerId: {
        name: "P. Ramanujam",
        _id: "65f4489baa6f72212e3dce26",
        email: "ram@gmail.com",
      },
    },
    {
      _id: "65f44a841c0a6c138c24c75e",
      comments:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, pariatur!",
      name: "Test Request 1",
      status: "testing completed",
      url: "https://react-icons.github.io/react-icons/search/#q=flag",
      testerId: {
        name: "P. Ramanujam",
        _id: "65f4489baa6f72212e3dce26",
        email: "ram@gmail.com",
      },
    },
    {
      _id: "65f44a841c0a6c138c24c75e",
      comments:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, pariatur!",
      name: "Test Request 1",
      status: "testing completed",
      url: "https://react-icons.github.io/react-icons/search/#q=flag",
      testerId: {
        name: "P. Ramanujam",
        _id: "65f4489baa6f72212e3dce26",
        email: "ram@gmail.com",
      },
    },
  ]);
  const [showCreate, setShowCreate] = useState(false);

  const fetcher = (url: string) => {
    return axios.get<TestRequestType[]>(`http://localhost:9000/${url}`);
  };

  const { data, error, isValidating } = useSWR("api/test-request", fetcher, {
    dedupingInterval: 50000, // 50 seconds
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {openTestRequests.map((test, i) => (
                <RequestCard key={i} {...test} />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {closedRequests.map((test, i) => (
                <RequestCard key={i} {...test} />
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

export type TestRequestColorType = keyof typeof testRequestColor;
export type BugColorType = keyof typeof bugColor;

export const testRequestColor = {
  "request under review": "bg-amber-50 text-amber-500",
  "request accepted": "bg-sky-100 text-sky-500",
  "testing in progress": "bg-indigo-100 text-indigo-500",
  "testing completed": "bg-green-100 text-green-500",
  "testing blocked": "bg-red-100 text-red-500",
} as const;

export const bugColor = {
  "under triage": "bg-yellow-50 text-yellow-500",
  accepted: "bg-cyan-100 text-cyan-500",
  "need more info": "bg-blue-100 text-blue-500",
  "not reproducible": "bg-orange-100 text-orange-500",
  invalid: "bg-red-100 text-red-500",
  fixed: "bg-green-100 text-green-500",
  "validated and closed": "bg-indigo-100 text-indigo-500",
} as const;

const RequestCard = ({
  _id,
  comments,
  name,
  status,
  url,
  testerId,
}: TestRequestType) => {
  return (
    // <Link href={"/test_request/_id"}>
    <Link
      href={`/test_request/${_id}`}
      className="p-6 relative shadow-lg  bg-white  flex flex-col gap-2 rounded-md cursor-pointer hover:scale-95 transition-all "
    >
      <h4 className="text-2xl font-semibold text-gray-800 hover:underline underline-offset-2 w-max">
        {name}
      </h4>
      {/* Comments */}
      <p className="text-sm text-gray-500 ">{comments}</p>
      <div className="grid grid-cols-[auto,1fr] items-center gap-y-2 gap-x-4">
        {/* Tester */}
        <div className="flex items-center gap-1">
          <FaUserShield className="text-violet-800" />
          <p className="font-semibold ">Tester</p>
        </div>
        <p className="text-sm font-medium">
          {testerId?.name || "Not Assigned"}
        </p>
        {/* Status */}
        <div className="flex items-center gap-1">
          <IoFlagSharp className="text-pink-400" />
          <p className="font-semibold ">Status</p>
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
          <FiLink className="text-blue-600" />
          <p className="font-semibold ">URL</p>
        </div>

        <p
          className={`text-sm text-blue-600  underline-offset-2 font-medium text-ellipsis overflow-hidden whitespace-nowrap `}
        >
          {url}
        </p>
      </div>
      <div className="absolute opacity-5 -rotate-12 top-5 right-5 ">
        <Image alt="bg" src={CardBg} width={170} height={80} />
        {/* <FaBug className="text-9xl text-primary" /> */}
      </div>
    </Link>
    // </Link>
  );
};
