import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';


export const sendMessage =async (msg) =>{
    try {
        const response = await axios.post(BASE_URL+'/message',{msg},{
            headers:{
                'Authorization' :localStorage.getItem('chat-token')
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
                'Authorization' :localStorage.getItem('chat-token')
            }
        });
        console.log(data);
        return data;
    } catch (error) {
        throw error.response.data;
    }
}