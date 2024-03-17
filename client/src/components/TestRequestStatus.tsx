import useToast from "@/store/useToast";
import useUser from "@/store/useUser";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import AddCommentModal from "./AddCommentModal";
import { TestRequestColorType, testRequestColor } from "./Dashboard";
import { sendNotification } from "@/utils/sendNotification";

type Props = {
  status?: string;
  testRequest?: TestRequestType;
  receiverId?: string;
};

const TestRequestStatus = ({ status, receiverId, testRequest }: Props) => {
  const user = useUser((state) => state.user);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState<TestRequestColorType>(
    status as TestRequestColorType
  );
  const [tempStatus, setTempStatus] = useState<
    TestRequestColorType | undefined
  >(undefined);
  const [acceptedStatuses, setAcceptedStatuses] = useState<
    TestRequestColorType[]
  >([]);
  const setToast = useToast((state) => state.setToast);
  console.log(testRequest);

  //   checks whether the current user can update the status
  const canUpdate = (showToast = true) => {
    if (user?.role === "customer" || user?.role === "tester") {
      return false;
    } else if (["testing completed"].includes(updatedStatus)) {
      showToast &&
        setToast({
          msg: `Test Request is Completed`,
          variant: "error",
        });
      return false;
    } else if (user?.role === "projectManager") {
      if (!testRequest?.testerId) {
        showToast &&
          setToast({
            msg: "Assign Tester",
            variant: "error",
          });
        return false;
      } else {
        return true;
      }
    }
  };

  const handleDropdown = () => {
    setShowDropdown((e) => !e);
  };

  //   displays the accepted status alone
  useEffect(() => {
    if (updatedStatus) {
      switch (updatedStatus?.toLowerCase() as TestRequestColorType) {
        case "request under review":
          return setAcceptedStatuses(["request accepted"]);
        case "request accepted":
          return setAcceptedStatuses(["testing in progress"]);
        case "testing in progress":
          return setAcceptedStatuses(["testing blocked", "testing completed"]);
        case "testing blocked":
          return setAcceptedStatuses([
            "testing in progress",
            "testing completed",
          ]);
        default:
          return setAcceptedStatuses([]);
      }
    }
  }, [updatedStatus]);

  useEffect(() => {
    status && setUpdatedStatus(status as TestRequestColorType);
  }, [status]);

  useEffect(() => {
    window.addEventListener("click", () => setShowDropdown(false));

    return () =>
      window.removeEventListener("click", () => setShowDropdown(false));
  }, []);

  return (
    <>
      <div onClick={(e) => e.stopPropagation()} className="relative ">
        <div
          onClick={() => canUpdate() && handleDropdown()}
          className={`text-lg select-none flex gap-1 items-center cursor-pointer  ${
            testRequestColor[updatedStatus as TestRequestColorType]
          } w-max p-1 capitalize font-medium rounded-md px-4 `}
        >
          <h3>{updatedStatus}</h3>
          {canUpdate(false) && <BiChevronDown className="text-2xl" />}
        </div>
        {/* DROPDOWN */}
        {showDropdown && (
          <motion.div className="flex flex-col gap-2 p-2 z-20 rounded-md shadow-lg absolute top-full right-0 translate-y-2 bg-white">
            {acceptedStatuses.map((stat, i) => (
              <h3
                key={i}
                onClick={() => {
                  setTempStatus(stat);
                  setShowComment(true);
                  setShowDropdown(false);
                }}
                className={`text-lg cursor-pointer select-none ${
                  testRequestColor[stat as TestRequestColorType]
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
            className="w-full h-screen fixed top-0 z-50  left-0 bg-white/70 backdrop-blur-sm flex justify-center items-center "
          >
            <AddCommentModal
              type="testRequest"
              setShow={setShowComment}
              currentStatus={updatedStatus}
              setCurrentStatus={setUpdatedStatus}
              tempStatus={tempStatus}
              name={testRequest?.name}
              customerData={testRequest?.clientId}
              testerData={testRequest?.testerId}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TestRequestStatus;
