import useToast from "@/store/useToast";
import useUser from "@/store/useUser";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import AddCommentModal from "./AddCommentModal";
import { BugColorType, bugColor } from "./Dashboard";

type Props = {
  status?: string;
  testRequest?: TestRequestType;
};

const BugStatus = ({ status, testRequest }: Props) => {
  const user = useUser((state) => state.user);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState<BugColorType>(
    status as BugColorType
  );
  const [tempStatus, setTempStatus] = useState<BugColorType | undefined>(
    undefined
  );
  const [acceptedStatuses, setAcceptedStatuses] = useState<BugColorType[]>([]);
  const setToast = useToast((state) => state.setToast);

  //   checks whether the current user can update the status
  const canUpdate = (showToast = true) => {
    if (user?.role === "projectManager") {
      showToast &&
        setToast({
          msg: "Project Manager Cannot Update Bug Status",
          variant: "error",
        });
      return false;
    } else if (["closed", "validated and closed"].includes(updatedStatus)) {
      showToast &&
        setToast({
          msg: `Bug is closed`,
          variant: "error",
        });
      return false;
    } else if (user?.role === "tester") {
      // checks whether test request in blocked
      if (testRequest && testRequest.status === "testing blocked") {
        showToast &&
          setToast({
            msg: `Test Request Is Blocked`,
            variant: "error",
          });
        return false;
      } else if (
        ["need more info", "fixed", "not reproducible", "invalid"].includes(
          updatedStatus
        )
      ) {
        return true;
      } else {
        showToast &&
          setToast({
            msg: `Bug is assigned to customer`,
            variant: "error",
          });
        return false;
      }
    } else if (user?.role === "customer") {
      if (["under triage", "accepted"].includes(updatedStatus)) {
        return true;
      } else {
        showToast &&
          setToast({
            msg: `Bug is assigned to tester`,
            variant: "error",
          });
        return false;
      }
    }
  };

  const handleDropdown = () => {
    setShowDropdown((e) => !e);
  };

  //   displays the accepted status alone
  useEffect(() => {
    if (updatedStatus) {
      switch (updatedStatus?.toLowerCase() as BugColorType) {
        case "under triage":
          return setAcceptedStatuses([
            "accepted",
            "invalid",
            "need more info",
            "not reproducible",
          ]);
        case "accepted":
          return setAcceptedStatuses(["need more info", "fixed"]);
        case "fixed":
          return setAcceptedStatuses(["validated and closed"]);
        case "invalid":
          return setAcceptedStatuses(["under triage", "closed"]);
        case "need more info":
          return setAcceptedStatuses(["under triage"]);
        case "not reproducible":
          return setAcceptedStatuses(["under triage", "closed"]);
        default:
          return setAcceptedStatuses([]);
      }
    }
  }, [updatedStatus]);

  useEffect(() => {
    status && setUpdatedStatus(status as BugColorType);
  }, [status]);

  useEffect(() => {
    window.addEventListener("click", () => setShowDropdown(false));

    return () =>
      window.removeEventListener("click", () => setShowDropdown(false));
  }, []);

  return (
    <>
      <div onClick={(e) => e.stopPropagation()} className="relative">
        <div
          onClick={() => canUpdate() && handleDropdown()}
          className={`text-lg select-none flex gap-1 items-center cursor-pointer  ${
            bugColor[updatedStatus as BugColorType]
          } w-max p-1 capitalize font-medium rounded-md px-4 `}
        >
          <h3>{updatedStatus}</h3>
          {canUpdate(false) && <BiChevronDown className="text-2xl" />}
        </div>
        {/* DROPDOWN */}
        {showDropdown && (
          <motion.div className="flex flex-col gap-2 p-2 rounded-md shadow-lg absolute top-full right-0 translate-y-2 bg-white">
            {acceptedStatuses.map((stat) => (
              <h3
                onClick={() => {
                  setTempStatus(stat);
                  setShowComment(true);
                  setShowDropdown(false);
                }}
                className={`text-lg cursor-pointer select-none ${
                  bugColor[stat as BugColorType]
                } w-full whitespace-nowrap p-1 capitalize hover:scale-x-[1.02] transition-all font-medium rounded-md px-4 `}
              >
                {stat}
              </h3>
            ))}
          </motion.div>
        )}
      </div>
      {/* Assign Tester */}
      <AnimatePresence>
        {showComment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AddCommentModal
              setShow={setShowComment}
              currentStatus={updatedStatus}
              setCurrentStatus={setUpdatedStatus}
              tempStatus={tempStatus}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BugStatus;
