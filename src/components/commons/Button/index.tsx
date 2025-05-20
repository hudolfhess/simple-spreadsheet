"use client";

import { useState } from "react";
import "tailwindcss";

export default function Button({
  handleOnClick,
  children,
}: {
  handleOnClick: () => void;
  children: React.ReactNode;
}) {
  const [clicked, setClicked] = useState(false);

  return clicked === true ? (
    <>
      <button
        className="rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white opacity-100 focus:outline-none hover:bg-red-700 cursor-pointer mr-2"
        onClick={() => handleOnClick()}
      >
        Confirm
      </button>
      <button
        className="rounded-md bg-cyan-500 px-4 py-2 text-sm font-semibold text-white opacity-100 focus:outline-none hover:bg-blue-500 cursor-pointer"
        onClick={() => setClicked(false)}
      >
        Cancel
      </button>
    </>
  ) : (
    <button
      className="rounded-md bg-cyan-500 px-4 py-2 text-sm font-semibold text-white opacity-100 focus:outline-none hover:bg-blue-500 cursor-pointer"
      onClick={() => setClicked(true)}
    >
      {children}
    </button>
  );
}
