import useToast from "@/store/useToast";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from "swr";

type Props = {
  setShow: (val: boolean) => void;
  testRequest?: TestRequestType;
};

const AssignTester = ({ setShow, testRequest }: Props) => {
  const setToast = useToast((state) => state.setToast);

  const fetcher = (url: string) => {
    // return axios.get(`http://localhost:9000/${url}`);
  };

  const { data, error, isValidating } = useSWR("api/tester", fetcher);
  const [tester, setTester] = useState<TesterType[]>([
    {
      _id: "65f4489baa6f72212e3dce26",
      name: "tester1",
      email: "tester1@gmail.com",
      role: "tester",
      isVerified: true,
      img: "https://firebasestorage.googleapis.com/v0/b/pokemondetectorapp.appspot.com/o/tester.png?alt=media&token=f708246a-c988-4081-81e6-a6d03835dcc1",
      createdAt: "2024-03-15T13:07:40.030Z",
    },
  ]);

  useEffect(() => {
    if (error) {
      setToast({ msg: error, variant: "error" });
    }
  }, [error]);

  return (
    <main
      onClick={() => setShow(false)}
      className="w-full h-screen fixed top-0   left-0 bg-white/70 backdrop-blur-sm flex justify-center items-center "
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        animate={{ y: 0 }}
        initial={{ y: 200 }}
        className="flex  bg-white   gap-2 w-4/12 rounded-xl overflow-hidden shadow-xl py-5 "
      >
        <div className=" w-full flex flex-col gap-4 justify-center ">
          <h4 className="font-semibold text-2xl text-center">Assign Tester</h4>
          {tester.length === 0 ? (
            <h3 className="font-semibold text-center text-lg">
              No Available Testers
            </h3>
          ) : (
            <div className="grid grid-cols-2 gap-5 max-h-[70vh] overflow-y-auto px-5">
              {tester.map((test) => (
                <div
                  key={test._id}
                  className="flex gap-2 items-center border-2 border-primary-varient flex-col p-2 py-3 relative overflow-hidden shadow-md rounded-md group"
                >
                  {/* BG DESIGN */}
                  <div className="absolute rounded-full w-64 h-64 -top-[50%] z-0  group-hover:-top-[70%] transition-all -left-[20%] bg-gradient-to-br from-primary to-primary-varient "></div>
                  {/* DP */}
                  {test.img && (
                    <div className="rounded-md w-32 h-32 relative">
                      <Image
                        src={test.img}
                        alt="DP"
                        className="object-cover"
                        fill
                      />
                    </div>
                  )}
                  {/* Details */}
                  <div className="flex flex-col gap-1 ">
                    <h3 className="text-lg font-medium">{test.name}</h3>
                    <h3 className="">{test.email}</h3>
                    <button className="w-full py-1 bg-primary font-medium text-white rounded-md">
                      Assign
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </main>
  );
};

export default AssignTester;
