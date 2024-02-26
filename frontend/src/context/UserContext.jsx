import React,{ createContext,useContext,useEffect,useState } from "react";

const UserContext = createContext();

const initialState = {
    user:JSON.parse(localStorage.getItem('chathub-user')) || null,
    token : localStorage.getItem('chat-token') || null
}

export const UserProvider = ({children})=>{
    const [user,setUser] = useState(initialState);

    useEffect(()=>{
        const token =localStorage.getItem('chat-token');
        const user =JSON.parse(localStorage.getItem('chathubuser'))
        
        if (token &&user) {
            setUser(...user,token,user);
        }
    },[])

    return (
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
    )
} 

export default UserContext

export const useAuth=()=>{
    return useContext(UserContext)
}