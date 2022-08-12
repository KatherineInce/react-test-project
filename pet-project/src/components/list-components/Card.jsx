import Form from './FormList'
import Image from '../assets/Image'
const Card = ({pet}) => {
  const {breed,image} = pet
  return (
    <div className='row card-pet'>
        <div className='col-4 col-md-3 card-pet__image'>
            <Image src={image} alt={breed}/>
        </div>
        <div className='col-8 col-md-9 card-pet__form'>
            <Form pet={pet} disableInput={true}/>
        </div>
    </div>
  )
}

export default Card