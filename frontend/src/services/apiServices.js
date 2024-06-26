import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL_API;

export const addUser = async (userData) => {
    try {
        const { data } = await axios.post(BASE_URL + '/user/signup', userData);
        return data;
    } catch (error) {
        throw error.response.data;
    }
}

export const loginUser = async (userData) => {
    try {
        const { data } = await axios.post(BASE_URL + '/user/login', userData);
        localStorage.setItem('chathub-token', data.token)
        localStorage.setItem('chathub-user', JSON.stringify(data.user))
        return data
    } catch (error) {
        throw error.response.data
    }
}

export const getSearchUser = async (email) => {
    try {
        const { data } = await axios.get(BASE_URL + '/user?email=' + email, {
            headers: {
                Authorization: localStorage.getItem('chathub-token')
            }
        });
        return data
    } catch (error) {
        throw error.response.data
    }
}

export const updateUser = async (user) => {
    try {
        const { data } = await axios.put(BASE_URL + '/user/update', user, {
            headers: {
                Authorization: localStorage.getItem('chathub-token')
            }
        })
        return data
    } catch (error) {
        throw error.response.data
    }
}