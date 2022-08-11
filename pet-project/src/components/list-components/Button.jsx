import React from 'react'

const Button = (props,{children}) => {
  return (
    <button {...props} className="btn btn-primary">{children}</button>
  )
}

export default Button