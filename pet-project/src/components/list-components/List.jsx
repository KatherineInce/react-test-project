import Card from './Card'
import Search from './Search'
import {useContextAPI} from '../../context/ContextProvider'

import {useState,useEffect} from 'react'
import {debounce, filter} from 'lodash'

const List = () => {
  const {pets} = useContextAPI()
  const [search, setSearch] = useState('')
  const [filterData, setFilterData] = useState(pets)
  useEffect(() => {
    switch (search.length) {
      case 0:
        setFilterData(pets)
        break;
      default:
        console.log('filtrando...')
        let filterBreed = pets.filter(pet => pet.breed.includes(search))
        if(filterBreed.length > 0)
        {
          setFilterData(filterBreed)
        }
        else{
          filterBreed = pets.filter(pet => pet.subBreed.includes(search))
          setFilterData(filterBreed)
        }
        break;
    }
  }, [search])
  
  return (
    <div className='main-content'>
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
      <div>Not Found</div>
      }
      
    </div>
  )
}

export default List