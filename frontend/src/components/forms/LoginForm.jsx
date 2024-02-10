import React from "react";

import Input from "../ui/Input";
import Button from "../ui/Button";
import useLoginForm from "@hooks/useLoginForm";
import Error from "@components/ui/Error";

export default function LoginForm() {
  const { formValues, errors, handleChange, handleSubmit } = useLoginForm();
  return (
    <>
      <form className="w-full lg:w-2/3" noValidate onSubmit={handleSubmit}>
        <Input
          icon={"fa-regular fa-envelope"}
          name={"email"}
          placeholder={"Enter your email"}
          type={"email"}
          onChange={handleChange}
          value={formValues.email}
        />
        {errors.email && <Error>{errors.email}</Error>}
        <Input
          icon={"fa-regular fa-lock"}
          name={"password"}
          placeholder={"Enter your password"}
          type={"password"}
          onChange={handleChange}
          value={formValues.password}
        />               
         {errors.password && <Error>{errors.password}</Error>}

        <Button className="w-full mt-12">Login</Button>
      </form>
    </>
  );
}
