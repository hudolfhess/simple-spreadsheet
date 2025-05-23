"use client";

import "react";
import "tailwindcss";
import CloseSVG from "../Icons/CloseSVG";

export default function FormModal({
  title,
  handleOnClose,
  handleOnCreate,
  children,
}: {
  title: string;
  handleOnClose: () => void;
  handleOnCreate: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      id="default-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden bg-gray-900/50 bg-opacity-40 fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              type="button"
              className="text-gray-400 cursor-pointer bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
              onClick={handleOnClose}
            >
              <CloseSVG />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">{children}</div>
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              data-modal-hide="default-modal"
              type="button"
              className="btn btn-primary mr-4"
              onClick={handleOnCreate}
            >
              Create
            </button>
            <button
              data-modal-hide="default-modal"
              type="button"
              className="btn btn-neutral"
              onClick={handleOnClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
