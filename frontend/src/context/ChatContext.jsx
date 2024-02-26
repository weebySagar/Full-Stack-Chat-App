import React,{ createContext,useContext,useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({children})=>{
    const [selectedChat,setSelectedChat] = useState(null);
    const [chats,setChats] = useState([]);


    return (
        <ChatContext.Provider value={{selectedChat,setSelectedChat,chats,setChats}}>
            {children}
        </ChatContext.Provider>
    )
} 

export default ChatContext

export const useChat= ()=>{
    return useContext(ChatContext)
}