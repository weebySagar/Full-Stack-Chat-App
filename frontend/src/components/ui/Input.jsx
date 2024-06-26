import React,{forwardRef} from 'react'

// export default function Input({icon,type,placeholder,onChange,value,name,errors,ref}) {
//   return (
//     <div className="group input-wrapper border border-neutral-200  mt-5 py-2 px-3 rounded-lg flex items-center w-full  gap-3 self-center focus-within:border-teal-400 ">
//           <i className={icon}></i>

//           <input
//             type={type}
//             className=" bg-transparent w-full  outline-none  text-neutral-900 placeholder:text-slate-600"
//             placeholder={placeholder}
//             value={value}
//             name={name}
//             onChange={onChange}
//             ref={ref}
//           />
//         </div>
//   )
// }

const Input = forwardRef(({icon,type,placeholder,onChange,value,name,errors},ref)=>{
  return (
    <div className="group input-wrapper border border-neutral-200  mt-5 py-2 px-3 rounded-lg flex items-center w-full  gap-3 self-center focus-within:border-teal-400 ">
          <i className={icon}></i>

          <input
            type={type}
            className=" bg-transparent w-full  outline-none  text-neutral-900 placeholder:text-slate-600"
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onChange}
            ref={ref}
          />
        </div>
  )
})

export default  Input;