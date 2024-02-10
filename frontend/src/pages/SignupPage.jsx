import React from "react";

import Header from "@components/Header";
import SignUpImg from "@images/signup.svg";
import FormWrapper from "@components/FormWrapper";
import SignupForm from "@components/forms/SignupForm";

export default function SignupPage() {
  return (
    <>
      <Header />
      <section className="signup lg:h-[calc(100vh-100px)] mt-[100px] w-screen flex items-center justify-center">
        <div className="container mx-auto px-3">
         <FormWrapper img={SignUpImg} title={'Create Account'} subtitle={'Enter your details to create your account'} formComponent={<SignupForm/>}/>
        </div>
      </section>
    </>
  );
}
