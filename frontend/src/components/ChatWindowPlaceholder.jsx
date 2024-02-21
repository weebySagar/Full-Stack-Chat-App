import React from 'react';

import ChatImg from "@images/begin_chat.svg"

export default function ChatWindowPlaceholder() {
  return (
    <section className='bg-neutral-600/50 h-full w-full flex items-center justify-center flex-col'>
        <img src={ChatImg} alt="Image" className='w-2/5' />
        <p className='mt-5 text-lg text-neutral-50'>To begin Select any chat</p>
    </section>
  )
}
