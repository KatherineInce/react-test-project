//Individual cards that display a disable form of the data and an image
import Form from './FormList'
import Image from '../assets/Image'
const Card = ({pet}) => {
  const {breed,image} = pet //destructuring to obtain the breed and image
  return (
    <div className='row card-pet'>
        <div className='col-12 order-last  col-md-4 order-md-first card-pet__image'>
            <Image src={image} alt={breed}/>
        </div>
        <div className='col-12 order-first col-md-8 order-md-last card-pet__form'>
            <Form pet={pet} disableInput={true}/>
        </div>
    </div>
  )
}

export default Card