import React from 'react'
import toast from 'react-hot-toast';


export default function toastFunction(promise,loadingMessage = 'Loading',handleReset,successMessage,errorMessage){
    toast.promise(promise, {
        loading: loadingMessage,
        success: () => {
          handleReset();

          return successMessage;
        },
        error: (err) => err.toString(),
      })
}
