import {useState, useEffect} from 'react'
import {useContextAPI} from '../../context/ContextProvider'
import {useParams,useNavigate} from 'react-router-dom'


import Gallery from './Gallery'
import Form from './FormDetails'
const ListDetail = () => {
  let {id} = useParams()
  let navigate = useNavigate()

  const {pets,setPets} = useContextAPI()
  const [pet,setPet] = useState({
    'id': '',
    'name': '',
    'breed': '',
    'subBreed':'',
    'description': '',
    'image':''
  })
  const updatePets = () =>{
    console.log('Save Changes')
    let updatedPets = pets.map(dog =>{
        if(dog.id == id)
        {
          return(pet)
        } 
        else{
          return(dog)
        } 
      }
    )
    console.log(updatedPets)
    setPets(updatedPets)
    navigate('/')
  }
  
  useEffect(() => {
    let filterData = pets.filter(pet => pet.id == id)
    if(filterData.length > 0)
      setPet(filterData[0])
  }, [])
  
  return (
    <div className='main-content'>
    {
      pet.id.length > 0 ?
      <div className='card-pet-details'>
        <div className='row'>
          <div className='col-4'>
            <Gallery data={pet} setData={setPet}/>
          </div>
          <div className="col-8 pet-form">
            <Form data={pet} setData={setPet} onSubmit={updatePets}/>
          </div>
        </div>
      </div>
      :
      <div>Not Found</div>
    }
      
    </div>
  )
}

export default ListDetail