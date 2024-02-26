import React, { useEffect, useState } from "react";

import useFetch from "@hooks/useFetch";
import { getGroupUsers } from "../../services/groupServices";
import Loading from "@components/ui/Loading";
import PopupMenu from "@components/ui/PopupMenu";
import SearchUsers from "@components/SearchUsers";
import UsersGroupList from "./UsersGroupList";
import AddUserToGroup from "./AddUserToGroup";
import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/UserContext";

export default function ChatGroupDetails({ chatData }) {
  const { data, loading, fetchData } = useFetch();
  const [isAdmin, setIsAdmin] = useState(false);
  
  const {selectedChat}=useChat();
  const {user:currentUser} = useAuth()
  // console.log(selectedChat);

  // useEffect(() => {
  //   fetchData(getGroupUsers, chatData.id);
  // }, [chatData.id]);

  useEffect(() => {
    if (!selectedChat || !currentUser.user) return;

    const user = selectedChat.users.find((user) => user.id == currentUser.user.id);
    setIsAdmin(user && user.isAdmin);
  }, [ currentUser]);

  return (
    <div className="group-details h-full overflow-y-scroll pt-6">
      {loading ? (
        <Loading />
      ) : (
        <>
          <AddUserToGroup existingUsers={selectedChat.users} chatData={chatData}/>
          <UsersGroupList
            chatData={chatData}
            data={selectedChat.users}
            isAdmin={isAdmin}
            currentUser={currentUser}
          />
          {/* <div className="header bg-teal-800 text-white absolute top-0 left-0 right-0 px-6 py-3">
            <p>Group Members</p>
          </div>
          <ul role="list" className="divide-y divide-gray-100">
            {data.map((user) => (
              <li
                key={user.email}
                className="flex justify-between gap-x-6 py-5 "
              >
                <div className="flex min-w-0 gap-x-4 items-center">
                  <img
                    className="h-10 w-10 flex-none rounded-full bg-gray-50"
                    src={user?.imageUrl}
                    alt=""
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900 capitalize">
                      {user.id == currentUser.id ? "You" : user.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    {user?.role}
                  </p>
                  {person.lastSeen ? (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                </p>
              ) : (
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Online</p>
                </div>
              )}
                </div>
                <div>
                  {isAdmin && !user.isAdmin ? (
                    <PopupMenu groupId={chatData.id} userId={user.id} />
                  ) : (
                    ""
                  )}
                </div>
              </li>
            ))}
          </ul> */}
        </>
      )}

      {/* <Loading/> */}
    </div>
  );
}
