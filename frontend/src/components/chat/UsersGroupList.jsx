import useFetch from "@hooks/useFetch";
import React, { useEffect, useState } from "react";

import { getGroupUsers } from "../../services/groupServices";
import PopupMenu from "@components/ui/PopupMenu";
import Loading from "@components/ui/Loading";
import Badge from "@components/ui/Badge";
import AvataImg from "@images/default-avatar.jpg";

export default function UsersGroupList({
  chatData,
  data,
  isAdmin,
  currentUser,
  closeModal,
}) {
  return (
    <>
      <div className="header bg-teal-800 text-white absolute top-0 left-0 right-0 px-6 py-3">
        <p>Group Members</p>
      </div>

      <ul role="list" className="divide-y divide-gray-100">
        {data?.map((user) => (
          <li key={user.email} className="flex justify-between gap-x-6 py-5 ">
            <div className="flex min-w-0 gap-x-4 items-center">
              <img
                className="h-10 w-10 flex-none rounded-full bg-gray-50"
                src={user?.imageUrl || AvataImg}
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
              <p className="text-sm leading-6 text-gray-900">{user?.role}</p>
              {/* {person.lastSeen ? (
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
              )} */}
            </div>
            <div>
              {isAdmin && !chatData.groupAdminId.includes(user.id) && (
                <PopupMenu
                  groupId={chatData.id}
                  userId={user.id}
                  closeModal={closeModal}
                />
              )}

              {chatData.groupAdminId.includes(user.id) && (
                <Badge name={"Admin"} showClose={false} className={"text-xs"} />
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
