import React from 'react'

import {pickRandomColor} from '../../utils/helper'

export default function UserList({user,handleSelectedUser}) {
  
  return (
    <li
    className="mb-1 text-sm rounded-md shadow-sm  flex items-center cursor-pointer"
    onClick={() => handleSelectedUser(user)}
  >
    
        <div className={`w-16 flex items-center justify-center rounded-l-md text-white uppercase bg-pink-600 flex-shrink-0 h-14 font-medium ${pickRandomColor()}`}>
            {user.name.charAt(0)}
        </div>
    <div className='bg-white border-gray-200 border-y border-r flex flex-1'>
        <div className='px-4 py-2'>
            <p className='text-gray-900 font-medium capitalize'>{user.name}</p>
            <p className='text-gray-500'>{user.email}</p>
        </div>
    </div>
  </li>
  )
}
