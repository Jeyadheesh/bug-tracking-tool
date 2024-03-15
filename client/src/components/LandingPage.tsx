import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import GetStarted from "./GetStarted";
import IMG from "../assets/404.png";
import BUG from "../assets/bug.webp";
import CC from "../assets/cc.webp";
import Err from "../assets/404.webp";

type Props = {};

const LandingPage = (props: Props) => {
  const [showGetStarted, setShowGetStarted] = useState(false);

  return (
    <>
      <main className="min-h-[calc(100vh-4.5rem)] bg flex items-center gap-10 justify-around ">
        {/* Left Side */}
        <section className="flex flex-col gap-4 ">
          {/* Title */}
          <div className="flex flex-col text-5xl font-semibold">
            <h1 className="text-6xl ">TrackDown Bugs,</h1>
            <h3>Better &</h3>
            <h3>Faster</h3>
          </div>
          {/* Subb */}
          <p className="text-lg text-gray-500">{`Zero tolerance for bugs. Maximum love for your code.`}</p>
          {/* Buttons */}
          <button
            onClick={() => setShowGetStarted(true)}
            className=" w-max px-10 py-3 active:scale-95 transition-all rounded-lg font-semibold bg-gradient-to-br from-primary to-primary-varient text-white "
          >
            Get Started
          </button>
        </section>
        {/* Right Side */}
        <section className="">
          <div className="w-[42rem] h-[38rem] relative scale-95">
            <Image fill alt="hero_image" src={CC}></Image>
          </div>
        </section>
      </main>
      <AnimatePresence>
        {showGetStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GetStarted setShow={setShowGetStarted} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LandingPage;
