import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-500',
    textColor = 'text-white',
    className,
    ...props
}) {

  return (
    <button type={type} className={`rounded-lg px-4 py-2 ${bgColor} ${textColor} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button