import axios from "axios";

const BASE_URL = 'http://localhost:3000/api';

export const addUser = async(userData)=>{
    try {
        const {data} = await axios.post(BASE_URL+'/user/signup',userData);
        return data;
    } catch (error) {
        throw error.response.data;
    }
}

export const loginUser = async(userData)=>{
    try {
        const {data} = await axios.post(BASE_URL+'/user/login',userData);
        localStorage.setItem('chat-token',data.token)
    } catch (error) {
        console.log(error);
        throw error.response.data
    }
}