import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';


export const sendMessage =async (msg) =>{
    try {
        const response = await axios.post(BASE_URL+'/message/send',{msg},{
            headers:{
                'Authorization' :localStorage.getItem('chat-token')
            }
        });
        return response.status;
    } catch (error) {
        throw error.response.data;
    }
}