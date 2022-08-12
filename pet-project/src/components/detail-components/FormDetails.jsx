//Editable Form 
import {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'

import InputGroup from '../assets/InputGroup'
import DropdownGroup from '../assets/DropdownGroup'
import TextareaGroup from '../assets/TextareaGroup'
import DecisionButtons from '../assets/DecisionButtons'

import {useContextAPI} from '../../context/ContextProvider'

const FormDetails = ({data, setData, onSubmit}) => {
  let navigate = useNavigate()
  const {breeds} = useContextAPI() //use the array of breeds from the context
  const [subBreeds, setSubBreeds] = useState([]) //local state change when selected breed change
  const getSubBreed = async() => {
    let response = await fetch(`https://dog.ceo/api/breed/${data.breed}/list`)
    let objSubBreeds = await response.json()
    setSubBreeds(objSubBreeds.message)
    if(objSubBreeds.message.length <= 0)
    {
      setData(current => ({ ...current, subBreed: '' }))
    }
   }
  useEffect(() => {
    getSubBreed()
  }, [data.breed])//get the new subbreed
  
  return (
    <>
      <InputGroup disableInput={false} data={{name:data.name,onChange:e=>setData({...data,name:e.target.value})}} name='name' label='Name'/>
      <DropdownGroup disableInput={false} data={{name:data.breed,onChange:e=>setData({...data,breed:e.target.value})}} name='breed' label='Breed' list={breeds} defaultOption={false}/>
      <DropdownGroup disableInput={subBreeds.length > 0 ? false : true} data={{name:data.subBreed,onChange:e=>setData({...data,subBreed:e.target.value})}} name='subBreed' label='SubBreed' list={subBreeds} message={`${subBreeds.length > 0 ? 'Select a sub breed' : 'No sub breed'}`} defaultOption={true}/>
      <TextareaGroup disableInput={false} data={{name:data.description,onChange:e=>setData({...data,description:e.target.value})}} name='description' label='Description'/>
      <DecisionButtons accept='Apply' deny='Cancel' setAccept={onSubmit} setDeny={()=>navigate('/')}/>
    </>
  )
}

export default FormDetails