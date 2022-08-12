import React from 'react'

const TextareaGroup = ({disableInput,data,name,label}) => {
    return (
      <>
          <label htmlFor={name}>{label}</label>
          <textarea rows="3" className='form-control' value={data.name} onChange={data.onChange} name={name} disabled={disableInput}/>
      </>
    )
  }

export default TextareaGroup