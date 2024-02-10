import React from 'react'
import Input from './ui/Input'
import Button from './ui/Button'

export default function SignupForm() {
  return (
    <>
        <form  className='w-full lg:w-2/3' noValidate>
            <Input icon={'fa-regular fa-envelope'} name={'email'} placeholder={'Enter your email'} type={'email'} />
            <Input icon={'fa-regular fa-user'} name={'name'} placeholder={'Enter your name'} type={'text'} />
            <Input icon={'fa-regular fa-lock'} name={'password'} placeholder={'Enter your password'} type={'password'} />
            <Button className='w-full mt-12'>Sign up</Button>
        </form>
    </>
  )
}
