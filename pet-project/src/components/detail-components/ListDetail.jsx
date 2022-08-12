//Main Detail Components
import {useState, useEffect} from 'react'
import {useContextAPI} from '../../context/ContextProvider'
import {useParams,useNavigate} from 'react-router-dom'


import Gallery from './Gallery'
import Form from './FormDetails'
import CardNotFound from '../assets/CardNotFound'
import Notifications from '../assets/Notifications'

const ListDetail = () => {
  let {id} = useParams() //id from the url path
  let navigate = useNavigate()
  const {pets,setPets} = useContextAPI()//obtain from context the data source and the function to change the data source

  const [loading,setLoading] = useState(true)
  const [error,setError] = useState('')//Verify all the required fields
  const [pet,setPet] = useState({
    'id': '',
    'name': '',
    'breed': '',
    'subBreed':'',
    'description': '',
    'image':''
  })//local state of the selected pet
  const updatePets = () =>{
    //console.log('Save Changes')
    if(pet.name.length > 0 && pet.image.length > 0)
    {
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
      //console.log(updatedPets)
      setPets(updatedPets)
      navigate('/')
      setError('')
    }
    else{
      setError('The fields name and image are required')
    }
  }//function for update the selected pet
  
  useEffect(() => {
    setLoading(true)
    let filterData = pets.filter(pet => pet.id == id)
    if(filterData.length > 0)
      setPet(filterData[0]) //set the selected pet in local state
    setLoading(false)
  }, [])
  
  return (
    <div className='main-content'>
    { error.length > 0 &&
      <Notifications message={error}/>
    }
    {
      pet.id.length > 0 ?
      <div className='card-pet-details'>
        <div className='row'>
          <div className='col-12 col-md-4'>
            <Gallery data={pet} setData={setPet}/>
          </div>
          <div className="col-12 col-md-8 pet-form">
            <Form data={pet} setData={setPet} onSubmit={updatePets}/>
          </div>
        </div>
      </div>
      :
      !loading &&
       <CardNotFound/>
    }
      
    </div>
  )
}

export default ListDetail