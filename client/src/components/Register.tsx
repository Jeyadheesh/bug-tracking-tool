import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail, MdOutlinePassword } from "react-icons/md";
import InputTextFiled from "./InputTextFiled";

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
          <InputTextFiled
            icon={<MdOutlineMail className="text-primary text-xl" />}
            placeholder="Enter Email"
            setValue={setEmail}
            value={email}
            type="email"
          />

          {/* OTP Field */}
          {tab === 1 && (
            <InputTextFiled
              icon={<MdOutlinePassword className="text-primary text-xl" />}
              placeholder="Enter 4 Digit OTP"
              setValue={setOTP}
              value={OTP}
              type="number"
            />
          )}
        </>
      ) : (
        <></>
      )}
      {/* Password & Details */}
      {tab === 2 && (
        <>
          {/* Email Field */}
          <InputTextFiled
            icon={<MdOutlineMail className="text-primary text-xl" />}
            placeholder="Enter Email"
            setValue={setEmail}
            value={email}
            type="email"
          />
          {/* Password Field */}
          <InputTextFiled
            icon={<MdOutlinePassword className="text-primary text-xl" />}
            placeholder="Enter Password"
            setValue={setPassword}
            value={password}
            type="password"
          />
          {/* Username Field */}
          <InputTextFiled
            icon={<FaRegUser className="text-primary text-xl" />}
            placeholder="Enter Username"
            setValue={setUsername}
            value={username}
          />
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
