import React from "react";

import Header from "@components/Header";
import LoginImg from "@images/login.svg";
import FormWrapper from "@components/FormWrapper";
import LoginForm from "@components/forms/LoginForm";

export default function LoginPage() {
  return (
    <>
      <Header />
      <section className="login lg:h-[calc(100vh-100px)] mt-[100px] w-screen flex items-center justify-center">
        <div className="container mx-auto px-3">
         <FormWrapper img={LoginImg} title={'Login'} subtitle={'Welcome back 👋'} formComponent={<LoginForm/>}/>
        </div>
      </section>
    </>
  );
}
