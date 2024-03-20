import React from "react";

export default function Badge({ name, onClick, className, showClose = true }) {
  return (
    <span
      className={`inline-flex items-center border border-green-600/20 rounded-full bg-green-50 px-2 py-1 text-sm font-medium text-green-700  capitalize  mr-2 gap-x-1 ${className}`}
    >
      {name}
      {showClose && (
        <button
          onClick={onClick}
          className=" w-4 h-4 rounded-sm hover:bg-green-600/20 flex items-center justify-center"
        >
          <svg
            viewBox="0 0 14 14"
            className="w-4 h-4 stroke-green-700/50 hover:stroke-green-700/75"
          >
            <path d="M4 4l6 6m0-6l-6 6"></path>
          </svg>
        </button>
      )}
    </span>
  );
}
