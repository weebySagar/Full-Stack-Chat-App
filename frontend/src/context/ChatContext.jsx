import React,{ createContext,useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({children})=>{
    const [selectedChat,setSelectedChat] = useState(null);

    return (
        <ChatContext.Provider value={{selectedChat,setSelectedChat}}>
            {children}
        </ChatContext.Provider>
    )
} 

export default ChatContext