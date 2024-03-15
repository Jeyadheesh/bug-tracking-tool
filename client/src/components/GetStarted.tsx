import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdOutlineMail } from "react-icons/md";
import Image from "next/image";

type Props = {
  setShow: (val: boolean) => void;
};

const carousalData = [
  {
    title: "Create Test Request",
    url: "https://media.istockphoto.com/id/1413922045/vector/programming-at-home.jpg?s=612x612&w=0&k=20&c=_5UhZu0-etj-lWZorNUAkF_PEqXfHpuf44dCeWeCOvc=",
  },
  {
    title: "Get Notified For Bugs",
    url: "https://media.istockphoto.com/id/1465263629/vector/and-mail-marketing.jpg?s=612x612&w=0&k=20&c=rKt2t6-2T9fanvBzGbrndXkbVgr9RRVUyvZ199pi-9c=",
  },
  {
    title: "Track Bugs",
    url: "https://cdni.iconscout.com/illustration/premium/thumb/programmer-searching-and-doing-bug-fixing-9907109-8070325.png",
  },
];

const GetStarted = ({ setShow }: Props) => {
  const [carousalIndex, setCarousalIndex] = useState(0);

  useEffect(() => {
    const carousalInterval = setInterval(() => {
      setCarousalIndex((pre) =>
        carousalData.length - 1 === pre ? 0 : pre + 1
      );
    }, 2000);

    return () => clearInterval(carousalInterval);
  }, []);

  return (
    <main
      onClick={() => setShow(false)}
      className="w-full h-screen fixed top-0 left-0 bg-white/80 backdrop-blur-sm flex justify-center items-center "
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        animate={{ y: 0 }}
        initial={{ y: 200 }}
        className="flex  bg-white   gap-2 w-8/12 rounded-xl overflow-hidden shadow-xl p-5"
      >
        {/* Carousal */}
        <div className="flex flex-col gap-2  items-center  w-full ">
          <h3 className="font-semibold text-3xl">TrackDown</h3>
          <div className="relative h-80 flex justify-center w-full overflow-hidden">
            <AnimatePresence mode="sync">
              <motion.div
                key={carousalIndex}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                className="flex flex-col gap-2  items-center bg-white absolute "
              >
                <div className="relative w-60 h-60">
                  <Image
                    fill
                    className="w-full h-full object-contain"
                    src={carousalData[carousalIndex].url}
                    alt={carousalData[carousalIndex].title}
                  />
                </div>
                <h5 className="font-medium text-xl ">
                  {carousalData[carousalIndex].title}
                </h5>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {/* Content */}
        <div className=" w-full flex flex-col gap-4 justify-center items-center ">
          <h4 className="font-semibold text-2xl">Get Started</h4>
          {/* Email Field */}
          <div className="flex items-center rounded-lg w-full border-2  px-2 py-1 gap-2">
            <MdOutlineMail className="text-primary text-xl" />
            <input
              type="email"
              className="w-full p-1 outline-0"
              placeholder="Enter Email"
            />
          </div>
          <button className="w-full  px-10 py-2 active:scale-95 transition-all rounded-lg font-semibold bg-gradient-to-br from-primary to-primary-varient text-white ">
            Verify Email
          </button>
        </div>
      </motion.div>
    </main>
  );
};

export default GetStarted;
