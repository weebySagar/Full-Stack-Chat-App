import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';


export const sendMessage = async (message, image, chatId) => {
    try {
        const { data } = await axios.post(BASE_URL + '/message', { message, image, chatId }, {
            headers: {
                'Authorization': localStorage.getItem('chathub-token')

            }
        });
        return data;
    } catch (error) {
        throw error.response.data;
    }
}

export const getMessage = async (chatId, lastMsgId) => {
    try {
        // const { data } = await axios.get(BASE_URL + '/message?lastMsgId=' + lastMsgId, {
        //     headers: {
        //         'Authorization': localStorage.getItem('chathub-token')

        //     }
        // });
        const { data } = await axios.get(BASE_URL + '/message/' + chatId, {
            headers: {
                'Authorization': localStorage.getItem('chathub-token')

            }
        });
        // console.log(data);
        return data;
    } catch (error) {
        throw error.response.data;
    }
}


export const accessChat = async (userId) => {
    try {
        const { data } = await axios.post(BASE_URL + '/message/chats', { userId: JSON.stringify(userId) }, {
            headers: {
                'Authorization': localStorage.getItem('chathub-token')

            }
        })

        return data
    } catch (error) {
        throw error.response.data
    }
}
export const getAllChats = async () => {
    try {
        const { data } = await axios.get(BASE_URL + '/message/chats', {
            headers: {
                'Authorization': localStorage.getItem('chathub-token')

            }
        })

        return data
    } catch (error) {
        throw error.response.data
    }
}