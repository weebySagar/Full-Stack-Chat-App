import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';
const token = localStorage.getItem('chathub-token')

axios.defaults.headers.common['Authorization'] = token

export const createGroup = async (chatName, userId) => {
    try {
        const {data} = await axios.post(BASE_URL + '/group/create-group', { chatName, userId: JSON.stringify(userId) });
        return data;
    } catch (error) {
        throw error.response.data;
    }
}


export const getGroups = async () => {
    try {
        const { data } = await axios.get(BASE_URL + '/group/');
        return data;
    } catch (error) {
        throw error.response.data
    }
}


export const getGroupUsers = async (groupId) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/group/${groupId}`)

        return data
    } catch (error) {
        throw error.response.data
    }
}

export const removeUserFromGroup = async (groupId, userId) => {
    try {
        const { data } = await axios.delete(`${BASE_URL}/group/${groupId}/user/${userId}`, )

        return data
    } catch (error) {
        throw error.response.data

    }
}


export const makeUserAdmin = async (groupId, userId) => {
    try {
        const {data} =await axios.post(`${BASE_URL}/group/${groupId}/user/${userId}`,{
            headers:{
                'Authorization':token
            }
        })
        return data
    } catch (error) {
        throw error.response.data

    }
}

export const addUserToGroup =async (groupId,userId)=>{
    try {
        const {data} = await axios.post(`${BASE_URL}/group/add-users`,{groupId,userId},{
            headers:{
                'Authorization':token
            }
        })
        console.log(data);
        return data
    } catch (error) {
        throw error.response.data

    }
}