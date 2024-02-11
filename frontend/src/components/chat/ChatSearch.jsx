import React from "react";

export default function ChatSearch() {
  return (
    <div className="search sticky top-16  py-2 px-3 bg-neutral-300">
      <div className="input-wrapper flex items-center gap-5 px-5 py-2 rounded-lg bg-teal-700/30">
        <i class="fa-regular fa-magnifying-glass"></i>
        <input
          type="text"
          className="bg-transparent w-full placeholder:text-slate-700 placeholder:text-sm outline-none"
          placeholder="Search"
        />
      </div>
    </div>
  );
}
