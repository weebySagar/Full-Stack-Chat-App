import React from 'react'

export default function Error({className,children}) {
  return (
    <p className={`text-red-600 text-sm text-start ${className}`}>{children}</p>
  )
}
