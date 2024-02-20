import React, { useEffect } from 'react';

import ChatHeader from './ChatHeader'
import ChatSearch from './ChatSearch'
import ChatItem from '@components/ui/ChatItem';
import useFetch from '@hooks/useFetch';
import { getGroups } from '../../services/groupServices';

export default function ChatList() {
  const {data,fetchData,loading} = useFetch()

  useEffect(()=>{
     fetchData(getGroups);
  },[])
  return (
    <div className='chat-list relative bg-neutral-300  h-full'>
        <ChatHeader/>
        <ChatSearch/>
        <div className="list">
          {
          !loading &&
          data?.map(chat=><ChatItem {...chat} key={chat.id} chatData={chat}/>)}
        
        </div>
    </div>
  )
}
