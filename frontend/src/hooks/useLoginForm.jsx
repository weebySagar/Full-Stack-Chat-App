import React, { useState } from "react";

import { validateForm } from "@components/forms/validateForm";

export default function useLoginForm() {
  const [formValues, setFormValues] = useState({
    email: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(formValues));
  };
  return { handleChange, formValues, handleSubmit,errors };
}
