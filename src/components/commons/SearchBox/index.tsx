"use client";

import "react";
import "tailwindcss";

export default function SearchBox({
  handleOnSearch,
}: {
  handleOnSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="bg-white">
      <label className="input w-126">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          required
          placeholder="Search"
          onChange={handleOnSearch}
        />
      </label>
    </div>
  );
}
