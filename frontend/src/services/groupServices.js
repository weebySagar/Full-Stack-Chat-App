import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

export const createGroup =async(groupName,userId)=>{
    try {
        const response = await axios.post(BASE_URL+'/group/create-group',{groupName,userId},{
            headers:{
                'Authorization' :localStorage.getItem('chat-token')
            }
        });
        return response.status;
    } catch (error) {
        throw error.response.data;
    }
}