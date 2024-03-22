import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL_API;
const token = localStorage.getItem('chathub-token')

axios.defaults.headers.common['Authorization'] = token

export const createGroup = async (chatName, userId) => {
    try {
        const { data } = await axios.post(BASE_URL + '/group/create-group', { chatName, userId: JSON.stringify(userId) }, {
            headers: {
                'Authorization': token

            }
        });
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
        const { data } = await axios.post(`${BASE_URL}/group/${groupId}/user/${userId}`, {
            headers: {
                'Authorization': token
            }
        })
        return data
    } catch (error) {
        throw error.response.data

    }
}

export const addUserToGroup = async (groupId, userId) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/group/add-users`, { groupId, userId }, {
            headers: {
                'Authorization': token
            }
        })
        return data
    } catch (error) {
        throw error.response.data

    }
}

export const updateGroup = async (groupData) => {
    try {
        const { data } = await axios.put(`${BASE_URL}/group/update`, groupData, {
            headers: {
                'Authorization': token
            }
        })
        return data
    } catch (error) {
        throw error.response.data

    }
}