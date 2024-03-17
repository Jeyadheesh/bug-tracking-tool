import Image from "next/image";
import React from "react";

type Props = {
  comments: TestRequestType["comments"];
};

const Comments = ({ comments }: Props) => {
  // console.log(comments);

  return (
    <>
      {comments && comments.length > 0 && (
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-semibold">{`Comments`}</h3>
          </div>
          <div className="grid grid-cols-1  gap-4">
            {comments.map((comment, i) =>
              comment ? (
                <div
                  key={i}
                  className="flex flex-col gap-2 p-6 shadow-lg rounded-md bg-white  "
                >
                  <div className="flex gap-2 items-center" key={i}>
                    {/* DP */}
                    {comment.image ? (
                      <div className="w-12 relative h-12 shrink-0 rounded-full border-2 overflow-hidden">
                        <Image
                          fill
                          src={comment.image}
                          alt="DP"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {/* //   Comment Details  */}
                    <div className="flex flex-col gap-1">
                      <h4 className="font-medium text-lg">{comment.name}</h4>
                      <p className="px-2 py-.5 w-max capitalize text-emerald-700 bg-emerald-100 rounded-md">
                        {comment.status}
                      </p>
                    </div>
                  </div>
                  {/* Comment */}
                  <p className="text-gray-500 whitespace-pre-wrap">
                    {comment.message}
                  </p>
                </div>
              ) : (
                <></>
              )
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Comments;
