//A label and a input 
const InputGroup = ({disableInput,data,name,label}) => {
  return (
    <>
        <label htmlFor={name}>{label}</label>
        <input className='form-control' value={data.name} onChange={data.onChange} name={name} type="text" disabled={disableInput}/>
    </>
  )
}

export default InputGroup