import React from "react";

import HeroImg from "@images/hero-banner-img.png";

export default function HeroBanner() {
  return (
    <div className="hero-banner h-screen sm:h-auto xl:h-[calc(100vh-100px)] py-10 relative">
      <div className="absolute top-2/4 -translate-y-2/4   inset-0 h-full lg:h-auto xl:-translate-y-2/3">
        <div className="container mx-auto h-full px-3">
          <div className=" grid lg:grid-cols-2 xl:grid-cols-3 gap-4 items-center">
            <div className="lg:col-6">
              <h1 className="text-5xl xl:text-6xl font-bold font-Lato leading-snug xl:leading-relaxed">
                Connect, Communicate, Collaborate
              </h1>
            </div>
            <div className="order-first lg:col-span-full xl:order-none xl:col-auto">
              <img src={HeroImg} alt="Hero Image" className="w-4/5 xl:w-full" />
            </div>
            <div className="lg:col-6">
              <p className="text-slate-950 text-lg">
                Welcome to Chat Hub, your all-in-one platform for seamless
                communication. Whether you're looking to chat one-on-one or
                engage in lively group discussions, Chat Hub offers the perfect
                space to connect with friends, family, and colleagues. With
                intuitive features and a user-friendly interface, staying in
                touch has never been easier. Join us today and experience the
                ultimate hub for socializing, sharing ideas, and building
                relationships. Let's chat!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
