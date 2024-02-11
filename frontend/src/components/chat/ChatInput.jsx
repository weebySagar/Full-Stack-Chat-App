import React from 'react'

export default function ChatInput() {
  return (
    <div className="chat-input absolute bottom-0  w-full bg-neutral-400 py-2 px-8 flex items-center gap-5">
    <div className="input flex-grow">
      <input
        type="text"
        className="w-full py-3 px-2 outline-none rounded bg-neutral-300 placeholder:text-slate-600"
        placeholder="Type a message"
      />
    </div>
    <div className="submit-btn">
      <button className="bg-teal-800 py-3 px-4 rounded-full">
        <i class="fa-solid fa-paper-plane-top" style={{color: "#d4d4d4"}}></i>
      </button>
    </div>
  </div>
  )
}
