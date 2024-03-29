import useToast from "@/store/useToast";
import useUser from "@/store/useUser";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { BiRename } from "react-icons/bi";
import { BsFillSafe2Fill, BsTextParagraph } from "react-icons/bs";
import { FiLink } from "react-icons/fi";
import { MdOutlineMail, MdOutlinePassword } from "react-icons/md";
import { mutate } from "swr";
import InputTextFiled from "./InputTextFiled";
import { sendNotification } from "@/utils/sendNotification";
import Button from "./Button";

type Props = {
  setShow: (show: boolean) => void;
};

const NewRequest = ({ setShow }: Props) => {
  const [name, setName] = useState("");
  const [URL, setURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [summary, setSummary] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const setToast = useToast((state) => state.setToast);
  const user = useUser((state) => state.user);

  const handleCreateRequest = async () => {
    setBtnLoading(true);
    try {
      if (
        name.trim() === "" ||
        URL.trim() === "" ||
        email.trim() === "" ||
        password.trim() === ""
      )
        return setToast({ msg: "Enter all required field", variant: "error" });

      const emailRegex =
        /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.[a-zA-Z]{2,})$/;
      if (!emailRegex.test(email))
        return setToast({ msg: "Invalid Email", variant: "error" });

      // url regex
      const urlRegex =
        /^((http|https):\/\/)?(www\.)?([a-zA-Z0-9-]+)(\.[a-zA-Z]{2,})(:\d+)?(\/[\w#!:.?+=&%@!\-\/])?$/;

      if (!urlRegex.test(URL))
        return setToast({ msg: "Invalid URL", variant: "error" });
      // return setToast({ msg: "okay", variant: "error" });
      const { data } = await axios.post(
        `http://localhost:9000/api/test-request`,
        {
          name,
          url: URL,
          credentials: { email, password },
          summary,
          clientId: user?._id,
          status: "request under review",
          clientName: user?.name,
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);

      // Toast
      setToast({
        msg: "Test Request Created",
        variant: "success",
      });

      setShow(false);
      mutate(["api/test-request", user?._id]);
      setBtnLoading(false);
    } catch (err) {
      // Toast
      setToast({ msg: err.response.data, variant: "error" });
      setBtnLoading(false);
    }
  };

  return (
    <main
      className="w-full  flex justify-center items-center "
      onClick={() => setShow(false)}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        animate={{ y: 0 }}
        initial={{ y: 200 }}
        className="flex  bg-white   gap-2 w-4/12 rounded-xl overflow-hidden shadow-xl p-5"
      >
        <div className=" w-full flex flex-col gap-4 justify-center items-center ">
          <h4 className="font-semibold text-2xl">Create New Test Request</h4>
          {/* Password & Details */}
          <>
            {/* Name Field */}
            <InputTextFiled
              icon={<BiRename className="text-primary text-xl" />}
              placeholder="Enter Test Request Name *"
              setValue={setName}
              value={name}
            />
            {/* URL Field */}
            <InputTextFiled
              icon={<FiLink className="text-primary text-xl" />}
              placeholder="Enter URL *"
              setValue={setURL}
              value={URL}
              type="url"
            />
            {/* Summary Field */}
            <div className="flex items-start rounded-lg w-full border-2  px-2 py-1 gap-2">
              <BsTextParagraph className="text-primary text-xl mt-2" />

              <textarea
                rows={2}
                className="w-full p-1 outline-0 resize-none"
                placeholder={"Enter Summary"}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>
            <h3 className="text-left font-semibold mr-auto">
              Login Credentials To Access URL
            </h3>
            <div className="p-2 rounded-lg border bg-sky-100 flex gap-4 items-center border-sky-200 w-full">
              <BsFillSafe2Fill className="text-2xl text-sky-600" />

              <p className="text-sky-600 text-sm text-left">
                Rest assured, your password is our priority. Our site ensures
                top-notch protection and encryption.
              </p>
            </div>
            {/* CREDENTIALS */}
            {/* Email Field */}
            <InputTextFiled
              icon={<MdOutlineMail className="text-primary text-xl" />}
              placeholder="Enter Email *"
              setValue={setEmail}
              value={email}
              type="email"
            />
            {/* Password Field */}
            <InputTextFiled
              icon={<MdOutlinePassword className="text-primary text-xl" />}
              placeholder="Enter Password *"
              setValue={setPassword}
              value={password}
              type="password"
            />
          </>

          <Button
            loading={btnLoading}
            onClick={async () => {
              await handleCreateRequest();
              setBtnLoading(false);
            }}
            className="w-full  px-10 py-2 active:scale-95 transition-all rounded-lg font-semibold bg-gradient-to-br from-primary to-primary-varient text-white "
          >
            Create New Test Request
          </Button>
        </div>
      </motion.div>
    </main>
  );
};

export default NewRequest;
