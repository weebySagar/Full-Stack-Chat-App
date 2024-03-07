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