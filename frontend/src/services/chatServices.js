import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';


export const sendMessage =async (msg,groupId,receiverId) =>{
    try {
        const response = await axios.post(BASE_URL+'/message',{msg,groupId,receiverId},{
            headers:{
                'Authorization' : localStorage.getItem('chathub-token')

            }
        });
        return response.status;
    } catch (error) {
        throw error.response.data;
    }
}

export const getMessage =async (lastMsgId) =>{
    try {
        const {data} = await axios.get(BASE_URL+'/message?lastMsgId='+lastMsgId,{
            headers:{
                'Authorization' :localStorage.getItem('chathub-token')

            }
        });
        // console.log(data);
        return data;
    } catch (error) {
        throw error.response.data;
    }
}


export const accessChat = async(userId)=>{
    try {
        const {data} = await axios.post(BASE_URL+'/message/chats',{userId:JSON.stringify(userId)},{
            headers:{
                'Authorization' :localStorage.getItem('chathub-token')

            }
        })

        console.log(data);
        return data 
    } catch (error) {
        console.log(error);
        throw error.response.data
    }
}
export const getAllChats = async()=>{
    try {
        const {data} = await axios.get(BASE_URL+'/message/chats',{
            headers:{
                'Authorization' :localStorage.getItem('chathub-token')

            }
        })

        console.log(data);
        return data 
    } catch (error) {
        console.log(error);
        throw error.response.data
    }
}