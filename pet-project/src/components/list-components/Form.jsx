import Button from './Button'

import {useNavigate} from 'react-router-dom'

const Form = ({pet,disableInput}) => {
  let navigate = useNavigate()
  const {id,name,description,breed,subBreed} = pet
  const RedirectDetail = id => navigate(`/details/${id}`)
  
  return (
    <form onSubmit={()=>RedirectDetail(id)} className='form-pet'>
        <div>
            <Button type="submit"/>
        </div>
        <div className='form-pet__input-group'>
            <label htmlFor="name">Name</label>
            <input className='form-control' value={name} name="name" type="text" disabled={disableInput}/>
        </div>
        <div className='form-pet__input-group'>
            <label htmlFor="name">Breed</label>
            <input className='form-control' value={breed} name="name" type="text" disabled={disableInput}/>
        </div>
        <div className='form-pet__input-group'>
            <label htmlFor="name">SubBreed</label>
            <input className='form-control' value={subBreed} name="name" type="text" disabled={disableInput}/>
        </div>
        <div className='form-pet__input-group'>
            <label htmlFor="name">Description</label>
            <textarea className='form-control' value={description} name="name" type="text" disabled={disableInput}/>
        </div>
    </form>
  )
}

export default Form