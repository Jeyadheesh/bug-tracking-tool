import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import BUG from "../assets/fix-bug1.png";
import SS from "../assets/ss.png";
import Button from "./Button";
import GetStarted from "./GetStarted";

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
          <p className="text-lg text-gray-500">{`From TrackDown to touchdown: Your bug-solving journey begins here
`}</p>
          {/* Buttons */}

          <Button className="py-3" onClick={() => setShowGetStarted(true)}>
            Get Started
          </Button>
        </section>
        {/* Right Side */}
        <section className="">
          <div className="w-[47rem] h-[26rem] relative scale-95 overflow-hidden rounded-lg shadow-xl">
            <Image
              fill
              alt="hero_image"
              className="object-cover"
              src={SS}
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
