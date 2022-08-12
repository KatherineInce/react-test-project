//Component for select a new image
import {useEffect,useState} from 'react'
import Image from '../assets/Image'
const Gallery = ({data,setData}) => {
  const [currentBreed,setCurrentBreed] = useState(data.breed) //save the original breed to verify if change for update the image
  const[imageGallery,setImageGallery] = useState([]) //state with the random images
  const getRandomImages = async () => {
    let response = await fetch(`https://dog.ceo/api/breed/${data.breed}/images/random/3`)
    let images = await response.json()
    setImageGallery(images.message)
    if(currentBreed != data.breed)
    {  
      console.log(currentBreed, data.breed)
      setCurrentBreed('')
      setData(current => ({ ...current, image: '' }))
    }
  }
  useEffect(() => {
    getRandomImages()
  }, [data.breed])
  
  return (
    <>
      <div id="carouselImageGallery" className="carousel slide" data-bs-interval="false">
        <div className="carousel-inner">
          {imageGallery.map((image,index)=>
            <div key={index} className={`carousel-item ${index == 0 ? 'active' : null}`}>
              <Image src={image} className="d-block w-100" alt={data.breed}/>
              <div className="carousel-caption d-block">
                { image == data.image ?
                  <h5>Selected Image</h5>
                  :
                  <button className='btn btn-primary' onClick={()=>setData({...data,image:image})}>Select this Image</button>
                }
              </div>
            </div>
           )
          }
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselImageGallery" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselImageGallery" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  )
}

export default Gallery