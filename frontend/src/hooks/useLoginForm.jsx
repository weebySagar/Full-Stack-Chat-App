import React, { useState } from "react";

import { validateForm } from "@components/forms/validateForm";
import { loginUser } from "../services/apiServices";
import Toast from '@components/ui/Toast';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export default function useLoginForm() {
  const navigate = useNavigate();
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

  const handleReset = () => {
    setFormValues({
      email: "",
      password: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {errors,valid} = validateForm(formValues);
    setErrors(errors);
    if(valid){
      const user = loginUser(formValues);
      // Toast(user,'Loading...',handleReset,'Login successfully',)
      toast.promise(user,{
        loading:'Loading...',
        success:()=>{
          navigate('/chat')
          return 'Login successfully'},
        error:(err)=>err.toString()
      })
      // navigate('/chat')
        
    }
  };
  return { handleChange, formValues, handleSubmit,errors };
}
