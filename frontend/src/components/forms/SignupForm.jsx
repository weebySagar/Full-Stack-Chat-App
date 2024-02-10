import React from "react";

import Input from "@components/ui/Input";
import Button from "@components/ui/Button";
import useSignupForm from "@hooks/useSignupForm";
import Error from "@components/ui/Error";

export default function SignupForm() {
  const { formValues, handleChange, handleSubmit, errors } = useSignupForm();
  return (
    <>
      <form className="w-full lg:w-2/3" noValidate onSubmit={handleSubmit}>
        <Input
          icon={"fa-regular fa-user"}
          name={"name"}
          placeholder={"Enter your name"}
          type={"text"}
          value={formValues.name}
          onChange={handleChange}
        />
        {errors.name && <Error>{errors.name}</Error>}
        <Input
          icon={"fa-regular fa-phone"}
          name={"phone"}
          placeholder={"Enter your Mobile number"}
          type={"number"}
          value={formValues.phone}
          onChange={handleChange}
        />
        {errors.phone && <Error>{errors.phone}</Error>}

        <Input
          icon={"fa-regular fa-envelope"}
          name={"email"}
          placeholder={"Enter your email"}
          type={"email"}
          value={formValues.email}
          onChange={handleChange}
        />
        {errors.email && <Error>{errors.email}</Error>}

        <Input
          icon={"fa-regular fa-lock"}
          name={"password"}
          placeholder={"Enter your password"}
          type={"password"}
          value={formValues.password}
          onChange={handleChange}
        />
        {errors.password && <Error>{errors.password}</Error>}

        <Button className="w-full mt-12">Sign up</Button>
      </form>
    </>
  );
}
