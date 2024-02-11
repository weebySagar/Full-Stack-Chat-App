import React from 'react';

import ChatHeader from './ChatHeader'
import ChatSearch from './ChatSearch'
import ChatItem from '@components/ui/ChatItem';

export default function ChatList() {
  return (
    <div className='chat-list relative bg-neutral-300 '>
        <ChatHeader/>
        <ChatSearch/>
        <div className="list">
        <ChatItem name={'Group Name'} lastMsg={'This was the last message'} msgs={'30'} lastSeen={'10:30 AM'}/>
                <ChatItem name={'Group Name'} lastMsg={'This was the last message'} msgs={'30'} lastSeen={'10:30 AM'}/>
                <ChatItem name={'Group Name'} lastMsg={'This was the last message'} msgs={'30'} lastSeen={'10:30 AM'}/>
                <ChatItem name={'Group Name'} lastMsg={'This was the last message'} msgs={'30'} lastSeen={'10:30 AM'}/>
                <ChatItem name={'Group Name'} lastMsg={'This was the last message'} msgs={'30'} lastSeen={'10:30 AM'}/>
                <ChatItem name={'Group Name'} lastMsg={'This was the last message'} msgs={'30'} lastSeen={'10:30 AM'}/>
                <ChatItem name={'Group Name'} lastMsg={'This was the last message'} msgs={'30'} lastSeen={'10:30 AM'}/>
                <ChatItem name={'Group Name'} lastMsg={'This was the last message'} msgs={'30'} lastSeen={'10:30 AM'}/>
                <ChatItem name={'Group Name'} lastMsg={'This was the last message'} msgs={'30'} lastSeen={'10:30 AM'}/>
                <ChatItem name={'Group Name'} lastMsg={'This was the last message'} msgs={'30'} lastSeen={'10:30 AM'}/>
                <ChatItem name={'Group Name'} lastMsg={'This was the last message'} msgs={'30'} lastSeen={'10:30 AM'}/>
        </div>
    </div>
  )
}
