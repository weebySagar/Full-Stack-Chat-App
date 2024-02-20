import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';
const token = localStorage.getItem('chathub-token')

export const createGroup = async (groupName, userId, adminId) => {
    try {
        const response = await axios.post(BASE_URL + '/group/create-group', { groupName, userId, adminId }, {
            headers: {
                'Authorization': token

            }
        });
        return response.status;
    } catch (error) {
        throw error.response.data;
    }
}


export const getGroups = async () => {
    try {
        const { data } = await axios.get(BASE_URL + '/group/', {
            headers: {
                'Authorization': token

            }
        });
        return data;
    } catch (error) {
        throw error.response.data
    }
}


export const getGroupUsers = async (groupId) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/group/${groupId}`, {
            headers: {
                'Authorization': token
            }
        })

        return data
    } catch (error) {
        throw error.response.data
    }
}

export const removeUserFromGroup = async (groupId, userId) => {
    try {
        const { data } = await axios.delete(`${BASE_URL}/group/${groupId}/user/${userId}`, {
            headers: {
                'Authorization': token
            }
        })

        return data
    } catch (error) {
        throw error.response.data

    }
}


export const makeUserAdmin = async (groupId, userId) => {
    try {
        const {data} = axios.post(`${BASE_URL}/group/${groupId}/user/${userId}/promote`,{
            headers:{
                'Authorization':token
            }
        })
        return data
    } catch (error) {
        throw error.response.data

    }
}

export const addUserToGroup = (groupId,userId)=>{
    try {
        const {data} = axios.post(`${BASE_URL}/group/add-users`,{groupId,userId},{
            headers:{
                'Authorization':token
            }
        })
        return data
    } catch (error) {
        throw error.response.data

    }
}