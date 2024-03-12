import axios from "axios";

const BASE_URL = 'http://localhost:3000/api';

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
        console.log(error);
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