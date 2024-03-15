import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="px-6  h-[4.5rem] border-b flex justify-between items-center">
      {/* LOGO */}
      <h1 className="text-2xl font-bold">TrackDown</h1>
      {/* Action Buttons */}
    </nav>
  );
};

export default Navbar;
