import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail, MdOutlinePassword } from "react-icons/md";

type Props = {
  setMode: (mode: "login") => void;
};

const Register = ({ setMode }: Props) => {
  const [tab, setTab] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [OTP, setOTP] = useState("");

  const sendOTP = () => {
    setTab((e) => e + 1);
  };

  console.log(email);

  return (
    <div className=" w-full flex flex-col gap-4 justify-center items-center ">
      <h4 className="font-semibold text-2xl">
        {" "}
        {tab === 0 || tab === 1 ? `Get Started` : "Enter Details"}
      </h4>
      {/* Email & OTP */}
      {tab === 0 || tab === 1 ? (
        <>
          {/* Email Field */}
          <div className="flex items-center rounded-lg w-full border-2  px-2 py-1 gap-2">
            <MdOutlineMail className="text-primary text-xl" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full p-1 outline-0"
              placeholder="Enter Email"
            />
          </div>
          {/* OTP Field */}
          {tab === 1 && (
            <div className="flex items-center rounded-lg w-full border-2  px-2 py-1 gap-2">
              <MdOutlinePassword className="text-primary text-xl" />
              <input
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
                type="number"
                className="w-full p-1 outline-0"
                placeholder="Enter 4 Digit OTP"
              />
            </div>
          )}
        </>
      ) : (
        <></>
      )}
      {/* Password & Details */}
      {tab === 2 && (
        <>
          <div className="flex items-center rounded-lg w-full border-2  px-2 py-1 gap-2">
            <MdOutlineMail className="text-primary text-xl" />
            <input
              type="email"
              className="w-full p-1 outline-0"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center rounded-lg w-full border-2  px-2 py-1 gap-2">
            <MdOutlinePassword className="text-primary text-xl" />
            <input
              type="password"
              className="w-full p-1 outline-0"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center rounded-lg w-full border-2  px-2 py-1 gap-2">
            <FaRegUser className="text-primary text-xl" />
            <input
              type="text"
              className="w-full p-1 outline-0"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </>
      )}

      <button
        onClick={sendOTP}
        className="w-full  px-10 py-2 active:scale-95 transition-all rounded-lg font-semibold bg-gradient-to-br from-primary to-primary-varient text-white "
      >
        {tab === 0 || tab === 1 ? `Verify Email` : "Register"}
      </button>
      <div className="flex gap-1 items-center">
        <p className="text-lg">Already have a account?</p>
        <p
          className="text-lg font-medium cursor-pointer hover:underline hover:underline-offset-2 text-primary"
          onClick={() => setMode("login")}
        >{`Login`}</p>
      </div>
    </div>
  );
};

export default Register;