import React from 'react'

const DropdownGroup = ({disableInput,data,name,label,list,message}) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select value={data.name} disabled={disableInput} name={name} onChange={data.onChange} className="form-select" aria-label={name}>
        <option value=''>{message}</option>
        {
          list.map((item,index) =>
            <option key={index} value={item}>{item}</option>
          )
        }
      </select>
    </>
  )
}

export default DropdownGroup