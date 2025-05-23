import "react";
import GridSVG from "@/components/commons/Icons/GridSVG";
import ListSVG from "@/components/commons/Icons/ListSVG";
import { useEffect, useState } from "react";

const VIEW_MODE_LIST = "list";
const VIEW_MODE_GRID = "grid";

export default function ToggleView({
  onViewModeChange,
}: {
  onViewModeChange: (viewMode: string) => void;
}) {
  const [viewMode, setViewMode] = useState(VIEW_MODE_GRID);
  useEffect(() => {
    onViewModeChange(viewMode);
  }, [viewMode, onViewModeChange]);

  return (
    <div className="flex justify-end self-end mt-4 mb-4">
      <div className="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex">
        <button
          className={`${
            viewMode === VIEW_MODE_GRID
              ? "bg-white text-blue-400"
              : "hover:text-blue-400"
          } rounded-full text-30 inline-flex items-center transition-colors duration-300 ease-in focus:outline-none rounded-l-full px-4 py-2 cursor-pointer`}
          id="grid"
          onClick={() => setViewMode(VIEW_MODE_GRID)}
        >
          <GridSVG />
          <span>Grid</span>
        </button>
        <button
          className={`${
            viewMode === VIEW_MODE_LIST
              ? "bg-white text-blue-400"
              : "hover:text-blue-400"
          } rounded-full text-30 inline-flex items-center transition-colors duration-300 ease-in focus:outline-none rounded-l-full px-4 py-2 cursor-pointer`}
          id="list"
          onClick={() => setViewMode(VIEW_MODE_LIST)}
        >
          <ListSVG />
          <span>List</span>
        </button>
      </div>
    </div>
  );
}
