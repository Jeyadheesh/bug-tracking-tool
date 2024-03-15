import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail, MdOutlinePassword } from "react-icons/md";
import InputTextFiled from "./InputTextFiled";
import axios from "axios";
import useToast from "@/store/useToast";

type Props = {
  setMode: (mode: "login") => void;
};

const Register = ({ setMode }: Props) => {
  const [tab, setTab] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [OTP, setOTP] = useState("");
  const { toast, setToast } = useToast();

  const nextTab = async () => {
    try {
      if (tab == 0) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === "" || !emailRegex.test(email))
          return setToast({ msg: "Invalid Email", variant: "error" });
        // console.log("Send OTP");
        const { data } = await axios.post(
          "http://localhost:9000/api/auth/send-otp",
          {
            email,
          }
        );

        console.log(data);
        if (data.message == "Email Sent") {
          setToast({ msg: "OTP Sent", variant: "success" });
          return setTab((e) => e + 1);
        } else if (data.message == "User Exists") {
          setToast({ msg: "User Exists", variant: "error" });
          return setMode("login");
        } else if (data.message == "Verified Email") {
          setToast({ msg: "Verified Email", variant: "success" });
          return setTab((e) => e + 2);
        } else {
          setToast({ msg: data.message, variant: "error" });
        }
      } else if (tab == 1) {
        if (OTP === "")
          return setToast({ msg: "OTP Required", variant: "error" });
        console.log("Verify OTP");
        const { data } = await axios.post(
          "http://localhost:9000/api/auth/verify-otp",
          {
            email,
            otp: OTP,
          }
        );
        // Email Verified
        console.log(data);
        if (data.message == "Email Verified") {
          setToast({ msg: "Email Verified", variant: "success" });
          return setTab((e) => e + 1);
        } else {
          setToast({ msg: data.message, variant: "error" });
        }
      } else if (tab == 2) {
        console.log("Register");
        if (
          password.trim() == "" ||
          confirmPassword == "" ||
          password !== confirmPassword
        )
          return setToast({
            msg: "Password Empty or Not Match",
            variant: "error",
          });
        if (username.trim() === "")
          return setToast({ msg: "Username Required", variant: "error" });

        const { data } = await axios.post(
          "http://localhost:9000/api/auth/register",
          {
            email,
            password,
            name: username,
          }
        );
        // Registered
        console.log(data);
        if (data.message == "User Created") {
          setToast({ msg: "User Created", variant: "success" });
          return setMode("login");
        } else {
          setToast({ msg: data.message, variant: "error" });
        }
      }
    } catch (error) {
      console.log(error.response.data);
      setToast({ msg: error.response.data.message, variant: "error" });
    }
  };

  console.log(email);

  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center ">
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
            disabled
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
          {/*Confirm Password Field */}
          <InputTextFiled
            icon={<MdOutlinePassword className="text-primary text-xl" />}
            placeholder="Enter Confirm Password"
            setValue={setConfirmPassword}
            value={confirmPassword}
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
        onClick={nextTab}
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
