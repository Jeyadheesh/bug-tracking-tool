"use client";
import React, { useState } from "react";
import { MdOutlineMail, MdOutlinePassword } from "react-icons/md";
import InputTextFiled from "./InputTextFiled";
import useToast from "@/store/useToast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Button from "./Button";
import useUser from "@/store/useUser";

type Props = {
  setMode: (mode: "register") => void;
};

const Login = ({ setMode }: Props) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast, setToast } = useToast();
  const route = useRouter();
  const { setUser } = useUser();

  const handleLogin = async () => {
    setBtnLoading(true);
    try {
      if (email.trim() === "" || password.trim() === "")
        return setToast({
          msg: "Please fill all the fields",
          variant: "error",
        });

      const { data } = await axios.post(
        "http://localhost:9000/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);
      if (data.message === "Logged In") {
        setToast({ msg: "Logged In", variant: "success" });
        setUser(data.loggedUser);
        return route.replace("/dashboard");
      } else {
        setToast({ msg: data.message, variant: "error" });
      }
      setBtnLoading(false);
    } catch (error) {
      console.log(error.response.data);
      setToast({ msg: error.response.data.message, variant: "error" });
      setBtnLoading(false);
    }
  };

  return (
    <div className=" w-full flex flex-col gap-4 justify-center items-center ">
      <h4 className="font-semibold text-2xl">Login</h4>
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
      </>
      <Button
        className="w-full"
        onClick={async () => {
          await handleLogin();
          setBtnLoading(false);
        }}
        loading={btnLoading}
      >
        Login
      </Button>

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
