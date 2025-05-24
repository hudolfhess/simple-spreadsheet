import "react";
import React from "react";

const options = [
  // Bold
  { format: "font-bold", text: "Bold" },

  // Text colors
  { format: "text-white", text: "Color White" },
  { format: "text-green-700", text: "Color Green" },
  { format: "text-red-500", text: "Color Red" },
  { format: "text-blue-700", text: "Color Blue" },

  // Background colors
  { format: "bg-blue-700", text: "Background Blue" },
  { format: "bg-green-700", text: "Background Green" },
  { format: "bg-red-700", text: "Background Red" },
  { format: "bg-gray-700", text: "Background Dark Gray" },
  { format: "bg-gray-100", text: "Background Light Gray" },

  // Money
  { format: "money-brl", text: "Money BRL" },
  { format: "money-dollar", text: "Money Dollar" },
  { format: "money-euro", text: "Money Euro" },
  { format: "money-pound", text: "Money GBP" },

  // Number format
  { format: "number-percent", text: "Percent" },
];

export default function CellEditor(props: {
  onFormatClick: (foramt: string) => void;
}) {
  const categories = [];
  const toolbarOptionsByCategory: {
    [key: string]: React.ReactNode[];
  } = {};
  const toolbarOptions = [];

  for (let i = 0; i < options.length; i++) {
    const category = options[i].format.split("-")[0];
    if (!toolbarOptionsByCategory[category]) {
      categories.push(category);
      toolbarOptionsByCategory[category] = [];
    }
    toolbarOptionsByCategory[category].push(
      <li key={i} className="mb-1">
        <button
          className=""
          onClick={() => props.onFormatClick(options[i].format)}
        >
          {options[i].text}
        </button>
      </li>
    );
  }

  for (let i = 0; i < categories.length; i++) {
    toolbarOptions.push(
      <span key={i}>
        <div className="dropdown mr-2">
          <div tabIndex={0} role="button" className="btn btn-xs">
            {categories[i]}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            {toolbarOptionsByCategory[categories[i]]}
          </ul>
        </div>
      </span>
    );
  }

  return <span>{toolbarOptions}</span>;
}
