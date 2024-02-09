import React from "react";
import Button from "./ui/Button";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className=" fixed left-0 right-0 top-0 z-10 mx-auto max-w-6xl overflow-hidden border-[1px] border-[#44d7b6]/20 bg-gradient-to-br from-white/20 to-[#44d7b6]/10 backdrop-blur md:left-6 md:right-6 md:top-6 md:rounded-2xl">
      <div className="mx-auto py-3 px-5">
        <div className="flex justify-between items-center">
          <div className="navbar-logo ">
            <h3 className="text-2xl font-Lato">Chat Hub</h3>
          </div>
          <div className="navbar-links flex gap-2">
            <Button as="Link" href="/login" variant={"outline"}>
              Log in
            </Button>
            <Button>Sign up</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
