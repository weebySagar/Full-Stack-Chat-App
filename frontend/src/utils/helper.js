import { Buffer } from "buffer";

import { useAuth } from "../context/UserContext";

export const pickRandomColor = (isText = false) => {
    let hexColors;
    if (isText) {
        hexColors = ['text-pink-700', 'text-purple-700', 'text-yellow-700', 'text-green-700', 'text-indigo-700', 'text-red-700', 'text-lime-700'];
    }
    else {

        hexColors = ['bg-pink-600', 'bg-purple-600', 'bg-yellow-500', 'bg-green-500', 'bg-indigo-600', 'bg-red-500', 'bg-lime-600'];
    }
    const randomIndex = Math.floor(Math.random() * hexColors.length);
    return hexColors[randomIndex];
};


export const getUser = (users) => {
    const { user } = useAuth();
    if (users) {

        return users[0]?.id === user.user?.id ? users[1] : users[0];
    } else {
        return user.user
    }
};

export const formatDate = (data) => {
    const date = new Date(data);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format hours, minutes, and seconds to have leading zeros if needed
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Construct the 24-hour time string
    const time24Hours = `${formattedHours}:${formattedMinutes}`;
    return time24Hours;
}

export const convertBase64 = (imageBuffer) => {
    const base64 = Buffer.from(imageBuffer, "base64");
    return base64;
};