import Button from '../assets/IconButton'
import InputGroup from '../assets/InputGroup'
import DropdownGroup from '../assets/DropdownGroup'
import TextareaGroup from '../assets/TextareaGroup'

import { FaPaw } from 'react-icons/fa';

import {useNavigate} from 'react-router-dom'

const FormList = ({pet,disableInput}) => {
  let navigate = useNavigate()
  const {id,name,description,breed,subBreed} = pet 
  const RedirectDetail = id => navigate(`/details/${id}`) //function for the info button to show details

  
  return (
    <form onSubmit={()=>RedirectDetail(id)} className='pet-form'>
        <div className='form-pet__button'>
            <Button type="submit" info='More Information'><FaPaw/></Button>
        </div>
        <InputGroup disableInput={disableInput} data={{name:name,onChange:()=>{}}} name='name' label='Name'/>
        <DropdownGroup disableInput={disableInput} data={{name:breed,onChange:()=>{}}} name='breed' label='Breed' list={[breed]}/>
        <DropdownGroup disableInput={disableInput} data={{name:subBreed,onChange:()=>{}}} name='subBreed' label='SubBreed' list={[subBreed]}/>
        <TextareaGroup disableInput={disableInput} data={{name:description,onChange:()=>{}}} name='description' label='Description'/>
    </form>
  )
}

export default FormList