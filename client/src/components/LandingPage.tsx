import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import GetStarted from "./GetStarted";

type Props = {};

const LandingPage = (props: Props) => {
  const [showGetStarted, setShowGetStarted] = useState(false);

  return (
    <>
      <main className="min-h-[calc(100vh-4.5rem)] flex items-center gap-10 justify-center">
        {/* Left Side */}
        <section className="flex flex-col gap-4">
          {/* Title */}
          <div className="flex flex-col text-4xl font-semibold">
            <h1 className="text-5xl">TrackDown Bugs,</h1>
            <h3>Better &</h3>
            <h3>Faster</h3>
          </div>
          {/* Subb */}
          <p className="text-lg text-gray-500">{`Easily manage product roadmaps, backlogs, sprints, UX design, and more with ClickUp.`}</p>
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
          <div className="w-[42rem] h-[28rem] relative">
            <Image
              fill
              alt="hero_image"
              src={
                "https://images.ctfassets.net/w8fc6tgspyjz/6DDSMHbkStQgefQD43iBev/6269797d56108bcab9d438d9455514db/timeline__1_.png?fm=avif&q=50&w=1200"
              }
            ></Image>
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
