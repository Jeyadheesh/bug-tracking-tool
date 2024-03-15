import React, { useState } from "react";
import { MdOutlineMail, MdOutlinePassword } from "react-icons/md";

type Props = {
  setMode: (mode: "register") => void;
};

const Login = ({ setMode }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className=" w-full flex flex-col gap-4 justify-center items-center ">
      <h4 className="font-semibold text-2xl">Login</h4>
      {/* Password & Details */}
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
      </>

      <button
        onClick={() => null}
        className="w-full  px-10 py-2 active:scale-95 transition-all rounded-lg font-semibold bg-gradient-to-br from-primary to-primary-varient text-white "
      >
        Login
      </button>
      <div className="flex gap-1 items-center">
        <p className="text-lg">{`Don't have a account? `}</p>
        <p
          className="text-lg font-medium cursor-pointer hover:underline hover:underline-offset-2 text-primary"
          onClick={() => setMode("register")}
        >{`Register `}</p>
      </div>
    </div>
  );
};

export default Login;
