import {useEffect} from 'react'
import {useParams} from 'react-router-dom'

const ListDetail = () => {
  let {id} = useParams()

  useEffect(() => {
    console.log(id)
  }, [])
  

  return (
    <div className='main-content'>ListDetail</div>
  )
}

export default ListDetail