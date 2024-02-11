import React from 'react'

export default function CircleAvatar({className,img}) {
  return (
    <div className={`circle-avatar rounded-full ${className} overflow-hidden`}>
        <img src={img} alt="Image" className='h-full w-full object-cover' />
    </div>
  )
}
