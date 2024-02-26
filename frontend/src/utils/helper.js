import { useAuth } from "../context/UserContext";

export const pickRandomColor = () => {
    const hexColors = ['bg-pink-600', 'bg-purple-600', 'bg-yellow-500', 'bg-green-500', 'bg-indigo-600', 'bg-red-500','bg-lime-600'];
    const randomIndex = Math.floor(Math.random() * hexColors.length);
    return hexColors[randomIndex];
};


export const getUser = (users) => {
    const { user } = useAuth();
    if(users){

        return users[0]?.id === user.user?.id ? users[1]?.name : users[0]?.name;
    }else{
        return user.user.name
    }
  };