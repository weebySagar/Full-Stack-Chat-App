import React,{ createContext,useContext,useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({children})=>{
    const [selectedChat,setSelectedChat] = useState(null);
    const [chats,setChats] = useState([]);

    const updateUserList = (users)=>{
        if(selectedChat){
            setSelectedChat(chat =>({
                ...chat,users:users
            }))
        }
        setChats(prevChat =>prevChat.map(chat=>(
            chat.id === selectedChat.id ? {...chat,users:users} : chat
        )))
    }

    const updateGroupAdmin = (groupAdminId)=>{
        if(selectedChat){
            setSelectedChat(chat =>({
                ...chat,groupAdminId:groupAdminId
            }))
        }
        setChats(prevChat =>prevChat.map(chat=>(
            chat.id === selectedChat.id ? {...chat,groupAdminId:groupAdminId} : chat
        )))
    }
    return (
        <ChatContext.Provider value={{selectedChat,setSelectedChat,chats,setChats,updateUserList,updateGroupAdmin}}>
            {children}
        </ChatContext.Provider>
    )
} 

export default ChatContext

export const useChat= ()=>{
    return useContext(ChatContext)
}