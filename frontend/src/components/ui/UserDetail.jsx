import React from "react";
import { getUser } from "../../utils/helper";

export default function UserDetail({ users }) {
  const user = getUser(users);
  return (
    <div className="flex flex-col text-center p-8 ">
      <img
        src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/7f7fb319428103.562da3a4c90fd.png"
        alt=""
        className="h-32 w-32 rounded-full overflow-hidden mx-auto shadow-md object-cover"
      />
      <h3 className="mt-5 text-gray-900 text-2xl">{user.name}</h3>

      <p className="mt-3 text-sm text-gray-500">
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </p>

      <p className="mt-3 text-md text-gray-500">
        <a href={`tel:${user.phone}`}>{user.phone}</a>
      </p>
    </div>
  );
}
