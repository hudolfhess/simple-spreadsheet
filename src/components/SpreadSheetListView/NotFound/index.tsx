import "react";
import Image from "next/image";

export default function NotFound(props: { search: string }) {
  return (
    <div className="text-center mt-20">
      <figure className="mb-10">
        <Image
          width={400}
          height={400}
          src="/not_found.webp"
          alt="Not found."
          className="mask mask-squircle"
        />
      </figure>
      {props.search === "" ? (
        <p className="text-gray-500 text-xl">No spreadsheets created yet.</p>
      ) : (
        <div>
          <h2 className="text-4xl font-bold text-blue-600 mb-2">
            No spreadsheets found.
          </h2>
          <p className="text-gray-500 text-xl">
            Searching spreadsheets by{" "}
            <span className="font-bold">{props.search}</span> could not find any
            results.
          </p>
        </div>
      )}
    </div>
  );
}
