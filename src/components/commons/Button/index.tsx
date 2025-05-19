"use client";

import "react";
import "tailwindcss";

export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="rounded-md bg-cyan-500 px-4 py-2 text-sm font-semibold text-white opacity-100 focus:outline-none hover:bg-blue-500 cursor-pointer">
      {children}
    </button>
  );
}
