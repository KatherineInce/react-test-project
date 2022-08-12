//Main Filter Component 
import Card from './Card'
import Search from '../assets/Search'
import Loading from '../assets/Loading'
import CardNotFound from '../assets/CardNotFound'
import Notification from '../assets/Notifications'

import {useContextAPI} from '../../context/ContextProvider'

import {useState,useEffect} from 'react'
import {debounce} from 'lodash'

const List = () => {
  const {pets,waiting} = useContextAPI() // use two states of the context
  //local states
  const[loading,setLoading] = useState(true) //wait until the data of the list is loaded
  const [search, setSearch] = useState('')  //use for query data of the data source
  const [filterData, setFilterData] = useState(pets) //filtered data by breed and subbreed
  useEffect(() => {
    setLoading(true)
    switch (search.length) {
      case 0:
        setFilterData(pets)
        break;
      default:
        let filterBreed = pets.filter(pet => (pet.breed.toLowerCase()).includes(search.toLowerCase()) || (pet.subBreed.toLowerCase()).includes(search.toLowerCase()))
        setFilterData(filterBreed)
        break;
    }
    setLoading(false)

  }, [search,pets]) //When the search field or the data source change the filterDataChange
  
  return (
    <div className='main-content'>
    {waiting.loading ?
      <Loading/>
    :
    waiting.message.length > 0 ?
      <Notification message={waiting.message}/>
    :
    <>
    <div className='row'>
        <div className='col-8 col-md-5 col-lg-4'>
          <Search placeholder='Search...' 
          onChange={debounce(
            e => setSearch(e.target.value),1000)}/>
        </div>
      </div>
      {
        filterData.length > 0 ?
        filterData.map(pet => 
        <div key={pet.id} className='row'>
            <div className='col-12'>
              <Card pet={pet}/>
            </div>
        </div>
        )
        :
        !loading &&
        <CardNotFound/>
        }
    </>
    }
    </div>
  )
}

export default List