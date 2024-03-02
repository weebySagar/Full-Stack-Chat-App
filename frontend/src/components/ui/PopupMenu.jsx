import { useState } from "react";

import useFetch from "@hooks/useFetch";
import { makeUserAdmin, removeUserFromGroup } from "../../services/groupServices";
import { useChat } from "../../context/ChatContext";
import toast from "react-hot-toast";

const PopupMenu = ({groupId,userId,closeModal}) => {
    const [isOpen, setIsOpen] = useState(false);
    const {data,fetchData} = useFetch()
    const {updateUserList,updateGroupAdmin} = useChat()
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    const handleRemoveUser =async ()=>{
      try {
        const data = await removeUserFromGroup(groupId,userId);
        updateUserList(data)
        closeModal()

      } catch (error) {
        toast.error('Cannot remove user')
      }
    }

    const handleMakeUserAdmin =async ()=>{
      try {
        const data = await makeUserAdmin(groupId,userId);
        updateGroupAdmin(data)
        closeModal()

      } catch (error) {
        toast.error('Cannot make admin')
      }
    }
  
    return (
      <div className="relative">
        <button
          onClick={toggleMenu}
          className="p-3 bg-transparent text-gray-500 rounded hover:text-gray-900 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="h-5 w-5"><path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"></path></svg>
        </button>
        
        {isOpen && (
          <div className={`absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded shadow-lg z-10 popup-menu`}>
            {/* Menu items */}
            <button onClick={handleRemoveUser} className="block w-full px-4 py-2 text-red-500 hover:bg-gray-100 text-xs text-start">Remove</button>
            <button onClick={handleMakeUserAdmin} className="block px-4 py-2 w-full text-gray-800 hover:bg-gray-100 text-xs text-start">Make admin</button>
          </div>
        )}
      </div>
    );
  };

  export default PopupMenu