import React, { useState } from "react";

import { validateForm } from "@components/forms/validateForm";
import { addUser } from "../services/apiServices";
import Toast from "@components/ui/Toast";

export default function useSignupForm() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const [errors, setErrors] = useState({});

  const handleReset = () => {
    setFormValues({
      name: "",
      email: "",
      phone: "",
      password: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, valid } = validateForm(formValues,true);
    setErrors(errors);
    if (valid) {
      const user = addUser(formValues);
      Toast(user,'Loading...',handleReset,'User created successfully',)
    }
  };

  return { handleChange, formValues, handleSubmit, errors };
}
