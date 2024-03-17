import React, { useEffect, useState } from "react";
import { BugColorType, bugColor } from "./Dashboard";
import useUser from "@/store/useUser";
import { motion } from "framer-motion";
import useToast from "@/store/useToast";
import axios from "axios";
import { useParams } from "next/navigation";
import { sendNotification } from "@/utils/sendNotification";

type Props = {
  status?: string;
  receiverId?: string;
};

const BugStatus = ({ status, receiverId }: Props) => {
  const user = useUser((state) => state.user);
  const { id } = useParams();
  const [showDropdown, setShowDropdown] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState<BugColorType>(
    status as BugColorType
  );
  const [acceptedStatuses, setAcceptedStatuses] = useState<BugColorType[]>([]);
  const setToast = useToast((state) => state.setToast);

  //   checks whether the current user can update the status
  const canUpdate = () => {
    if (user?.role === "projectManager") {
      setToast({
        msg: "Project Manager Cannot Update Bug Status",
        variant: "error",
      });
      return false;
    } else if (["closed", "validated and closed"].includes(updatedStatus)) {
      setToast({
        msg: `Bug is closed`,
        variant: "error",
      });
      return false;
    } else if (user?.role === "tester") {
      if (
        ["need more info", "fixed", "not reproducible", "invalid"].includes(
          updatedStatus
        )
      ) {
        return true;
      } else {
        setToast({
          msg: `Bug is either assigned to customer`,
          variant: "error",
        });
        return false;
      }
    } else if (user?.role === "customer") {
      if (["under triage", "accepted"].includes(updatedStatus)) {
        return true;
      } else {
        setToast({
          msg: `Bug is either assigned to tester`,
          variant: "error",
        });
        return false;
      }
    }
  };

  const handleDropdown = () => {
    setShowDropdown((e) => !e);
  };

  //   Updates the bug status in db
  const handleUpdateStatus = async (status: string) => {
    try {
      await axios.patch(`http://localhost:9000/api/bug/`, {
        id: id as string,
        status,
      });
      setToast({ msg: "Status Updated", variant: "success" });
      sendNotification(
        "Bug Status Updated",
        `Bug Status Updated from ${updatedStatus} to ${status}`,
        user?._id as string,
        receiverId as string
      );
    } catch (err) {
      setToast({ msg: err, variant: "error" });
      setUpdatedStatus(updatedStatus);
    }
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
    <div onClick={(e) => e.stopPropagation()} className="relative">
      <h3
        onClick={() => canUpdate() && handleDropdown()}
        className={`text-lg select-none cursor-pointer  ${
          bugColor[updatedStatus as BugColorType]
        } w-max p-1 capitalize font-medium rounded-md px-4 `}
      >
        {updatedStatus}
      </h3>
      {/* DROPDOWN */}
      {showDropdown && (
        <motion.div className="flex flex-col gap-2 p-2 rounded-md shadow-lg absolute top-full right-0 translate-y-2 bg-white">
          {acceptedStatuses.map((stat, i) => (
            <h3
              key={i}
              onClick={() => {
                setUpdatedStatus(stat);
                handleUpdateStatus(stat);
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
  );
};

export default BugStatus;
