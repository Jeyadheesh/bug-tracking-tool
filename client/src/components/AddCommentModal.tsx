import { useState } from "react";
import { motion } from "framer-motion";
import { LiaCommentSolid } from "react-icons/lia";
import { BugColorType, bugColor } from "./Dashboard";
import { ImArrowRight2 } from "react-icons/im";
import Button from "./Button";
import axios from "axios";
import { useParams } from "next/navigation";
import useToast from "@/store/useToast";
import useUser from "@/store/useUser";

type Props = {
  setShow: (val: boolean) => void;
  currentStatus: BugColorType;
  tempStatus?: BugColorType;
  setCurrentStatus: (status: BugColorType) => void;
};

const AddCommentModal = ({
  setShow,
  currentStatus,
  setCurrentStatus,
  tempStatus,
}: Props) => {
  const [comments, setComments] = useState("");
  const { id } = useParams();
  const setToast = useToast((state) => state.setToast);
  const user = useUser((state) => state.user);

  //   Updates the bug status in db
  const handleUpdateStatus = async () => {
    try {
      // Check whether comment is mandetory
      if (
        [
          "need more info",
          "fixed",
          "not reproducible",
          "invalid",
          "under triage",
          "validated and closed",
        ].includes(tempStatus!) &&
        comments.trim().length <= 2
      ) {
        return setToast({ msg: "Enter a Valid Comment", variant: "error" });
      }
      await axios.patch(`http://localhost:9000/api/bug/edit-details`, {
        id: id as string,
        status: tempStatus,
        comments: {
          name: user?.name,
          image: user?.img,
          message: comments,
          status: `${currentStatus} → ${tempStatus}`,
        },
      });
      setToast({ msg: "Status Updated", variant: "success" });
      //   Updates new status if successful
      setCurrentStatus(tempStatus!);
      setShow(false);
    } catch (err) {
      setToast({ msg: err?.response?.data, variant: "error" });
    }
  };

  return (
    <main
      onClick={() => setShow(false)}
      className="w-full h-screen fixed top-0   left-0 bg-white/70 backdrop-blur-sm flex justify-center items-center "
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        animate={{ y: 0 }}
        initial={{ y: 200 }}
        className="flex  bg-white   gap-2 w-4/12 rounded-xl overflow-hidden shadow-xl p-5 "
      >
        <div className=" w-full flex flex-col gap-4 justify-center ">
          <h4 className="font-semibold text-2xl text-center">Update Status</h4>
          <h6 className="font-medium text-center">
            Are You Sure, You Want To Update Status?
          </h6>
          <div className="flex items-center justify-around">
            <h3
              className={`text-lg select-none cursor-pointer  ${
                bugColor[currentStatus as BugColorType]
              } w-max p-1 capitalize font-medium rounded-md px-4 `}
            >
              {currentStatus}
            </h3>
            <ImArrowRight2 className="text-xl" />

            <h3
              className={`text-lg select-none cursor-pointer  ${
                bugColor[tempStatus as BugColorType]
              } w-max p-1 capitalize font-medium rounded-md px-4 `}
            >
              {tempStatus}
            </h3>
          </div>
          <div className="flex items-start rounded-lg w-full border-2  px-2 py-1 gap-2">
            <LiaCommentSolid className="text-primary text-xl mt-1.5" />
            <textarea
              rows={3}
              className="w-full p-1 outline-0 resize-none"
              placeholder={"Enter Comment"}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={handleUpdateStatus}>
            Update Status
          </Button>
        </div>
      </motion.div>
    </main>
  );
};

export default AddCommentModal;
