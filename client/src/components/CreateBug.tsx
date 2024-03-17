import React, { useState } from "react";
import { motion } from "framer-motion";
import InputTextFiled from "./InputTextFiled";
import { BiBug } from "react-icons/bi";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";
import { BsTextParagraph } from "react-icons/bs";
import { LuWorkflow } from "react-icons/lu";
import { PiStepsDuotone } from "react-icons/pi";
import { FaFolder } from "react-icons/fa";
import { uploadToS3 } from "@/utils/uploadToS3";
import Button from "./Button";
import useToast from "@/store/useToast";
import axios from "axios";
import { mutate } from "swr";
import useUser from "@/store/useUser";
import { sendNotification } from "@/utils/sendNotification";

type Props = {
  setShow: (val: false) => void;
  testRequest?: TestRequestType;
};

const CreateBug = ({ setShow, testRequest }: Props) => {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("medium");
  const [summary, setSummary] = useState("");
  const [workflow, setWorkflow] = useState("");
  const [steps, setSteps] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const setToast = useToast((state) => state.setToast);
  const user = useUser((state) => state.user);

  function filterImageVideoFiles(files: File[]) {
    const filteredFiles = [];
    const maxSize = 20 * 1024 * 1024; // 20MB in bytes (20 * 1024 KB/MB * 1024 bytes/KB)

    for (const file of files) {
      const validType =
        file.type.startsWith("image/") || file.type.startsWith("video/");
      const validSize = file.size <= maxSize;

      if (validType && validSize) {
        filteredFiles.push(file);
      }
    }

    return filteredFiles;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files as ArrayLike<File>);
    setAttachments(filterImageVideoFiles(uploadedFiles));
  };

  const handleCreateBug = async () => {
    try {
      setLoading(true);
      let links: string[] | undefined;
      if (attachments) {
        // upload images to s3
        links = await uploadToS3(attachments);
      }
      await axios.post(`http://localhost:9000/api/bug/`, {
        name,
        priority,
        summary,
        feature: workflow,
        images: links || [],
        stepsToReproduce: steps,
        status: "under triage",
        testerId: user?._id,
        testRequestId: testRequest?._id,
      });
      setToast({ msg: "Bug Created", variant: "success" });
      console.log(testRequest?.clientId);
      sendNotification(
        "Bug Created",
        `New Bug Created by ${user?.name}`,
        user?._id as string,
        testRequest?.clientId?._id as string,
        testRequest?.clientId?.name as string,
        testRequest?.clientId?.email as string
      );
      mutate(["api/bug/test-request/", testRequest?._id]);
      setShow(false);
    } catch (err) {
      setToast({
        msg: err?.response?.data,
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      onClick={() => setShow(false)}
      className="w-full h-screen fixed top-0   left-0 bg-white/70 backdrop-blur-sm flex justify-center items-center "
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        animate={{ y: 0 }}
        initial={{ y: 200 }}
        className="flex  bg-white   gap-2 w-4/12 rounded-xl overflow-hidden shadow-xl p-5 "
      >
        <div className=" w-full flex flex-col gap-4 justify-center ">
          <h4 className="font-semibold text-2xl text-center">Raise A Bug</h4>
          {/* Name Field */}
          <InputTextFiled
            icon={<BiBug className="text-primary text-xl" />}
            placeholder="Enter Bug Name"
            setValue={setName}
            value={name}
          />
          <div>
            {/* Severity */}
            <h3 className="font-semibold">Severity Level</h3>
            <div className="flex justify-between items-center mt-1 ">
              {["low", "medium", "high"].map((lvl) => (
                <div
                  onClick={() => setPriority(lvl)}
                  className={`flex items-center border-2 cursor-pointer py-2 hover:scale-95 transition-all rounded-md w-32 flex-col justify-center font-medium text-sm  ${
                    priority === lvl
                      ? "bg-primary/80 text-white"
                      : "hover:bg-gray-100/50 "
                  } `}
                >
                  {lvl === "high" ? (
                    <FcHighPriority className="text-2xl" />
                  ) : lvl === "medium" ? (
                    <FcMediumPriority className="text-2xl" />
                  ) : (
                    <FcLowPriority className="text-2xl" />
                  )}
                  <p className="capitalize">{lvl}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Summary */}
          <div className="flex items-start rounded-lg w-full border-2  px-2 py-1 gap-2">
            <BsTextParagraph className="text-primary text-xl translate-y-2" />
            <textarea
              rows={2}
              className="w-full p-1 outline-0 resize-none"
              placeholder={"Enter Summary"}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>
          {/* Work Flow */}
          <div className="flex items-start rounded-lg w-full border-2  px-2 py-1 gap-2">
            <LuWorkflow className="text-primary text-xl translate-y-2" />
            <textarea
              rows={2}
              className="w-full p-1 outline-0 resize-none"
              placeholder={"Enter Workflow"}
              value={workflow}
              onChange={(e) => setWorkflow(e.target.value)}
            />
          </div>
          {/* Steps to Reproduce */}
          <div className="flex items-start rounded-lg w-full border-2  px-2 py-1 gap-2">
            <PiStepsDuotone className="text-primary text-xl translate-y-2" />
            <textarea
              rows={2}
              className="w-full p-1 outline-0 resize-none"
              placeholder={"Enter Steps To Reproduce"}
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
            />
          </div>
          {/* Attachment */}
          {attachments?.length === 0 ? (
            <div className=" border-primary/60 hover:bg-primary/10 transition-all border-dashed border-2 rounded-md relative">
              <div className="absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2">
                <FaFolder className="text-3xl mx-auto  text-primary" />
                <p className="text-sm whitespace-nowrap font-medium text-primary/60">{`Upload Screenshots & Videos of Bug (20 MB)`}</p>
              </div>
              <input
                onChange={(e) => handleChange(e)}
                multiple
                accept="image/*,video/*"
                type="file"
                className=" w-full h-16 opacity-0 cursor-pointer z-30"
              />
            </div>
          ) : (
            <>
              <h3 className="font-semibold">Attached Files</h3>
              <div className="-mt-3 max-h-[5rem] overflow-auto">
                {attachments?.map((att) => (
                  <p className="text-sm">{att.name}</p>
                ))}
              </div>
            </>
          )}
          <Button
            loading={loading}
            onClick={handleCreateBug}
            className="w-full"
          >
            Raise a bug
          </Button>
        </div>
      </motion.div>
    </main>
  );
};

export default CreateBug;
