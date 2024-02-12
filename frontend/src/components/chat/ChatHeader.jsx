import React from "react";

import CircleAvatar from "@components/ui/CircleAvatar";
import ChatSearch from "./ChatSearch";

export default function ChatHeader() {
  return (
    <div className="header sticky top-0 w-full z-50">
      <div className="profile-header py-2 px-3 bg-teal-700">
        <CircleAvatar
          className={"h-12 w-12 bg-teal-950"}
          img={
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/7f7fb319428103.562da3a4c90fd.png"
          }
        />
      </div>
    </div>
  );
}
