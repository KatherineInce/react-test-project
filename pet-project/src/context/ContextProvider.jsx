import {createContext,useContext,useState,useEffect} from 'react'
import { LoremIpsum } from "lorem-ipsum"; //lorem ipsum generator package
import { uniqueNamesGenerator, names } from 'unique-names-generator'; //random name generator
import ShortUniqueId from 'short-unique-id'; //random id generator
import {useLocation} from 'react-router-dom'

const ContextAPI = createContext()
const uid = new ShortUniqueId()

export const ContextProvider = ({children}) => {
  let location = useLocation(); //declare location for verify the pathname
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 15,
      min: 10
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  }); //configure the lorem ipsum qty of sentences and words per sentence

  let storePets = JSON.parse(localStorage.getItem('pets'))
  if(!storePets){
    storePets = []
  } //Verify if the data source is in local storage

  let storeBreeds = JSON.parse(localStorage.getItem('breeds'))
  if(!storeBreeds){
    storeBreeds = []
  } //verify if array of breeds is in local storage

  const [pets, setPets] = useState(storePets) //data source
  const [breeds, setBreeds] = useState(storeBreeds) //array of breeds
  const [waiting,setWaiting] = useState({
    loading: false,
    message: ''
  })//Verify if the api finished and/or failed
  const setPetsDS = async () =>{ //function that set the data source
    try {
      setWaiting({
        ...waiting,
        loading: true
      }) // set loading to true because is fetching data
      let response = await fetch('https://dog.ceo/api/breeds/list/all')
      let dogs = await response.json()
      let breedsFormated = Object.keys(dogs.message).map(dog => dog)
      let petsFormated = await Promise.all(Object.keys(dogs.message).filter(dog => dogs.message[dog].length > 0).filter((item,index)=> index < 25).map(async dog =>{
          let imageResponse = await fetch(`https://dog.ceo/api/breed/${dog}/images/random`)
          let randomImage = await imageResponse.json()
          return (
            {
              'id': uid(),
              'name': uniqueNamesGenerator({
                dictionaries: [names],
                styles: 'upperCase'
              }),
              'breed': dog,
              'subBreed':dogs.message[dog][0],
              'description': lorem.generateParagraphs(1),
              'image': randomImage.message
            })
      })) //format of the data source with real and fake data
      setPets(petsFormated) //set data source to state one time
      setBreeds(breedsFormated) //set all breeds in a state one time
      localStorage.setItem('breeds',JSON.stringify(breedsFormated)) //save breeds in local storage 
      setWaiting({
        message: petsFormated.length > 0 ? '' : 'The data fetch failed, retry again later',
        loading: false
      }) // set Loading to false because fetching finish
    } catch (error) {
      setWaiting({
        loading: false,
        message: 'Ups! Something failed, retry again later'
      }) //set a message in case fetching failed
    }
    
  }

  useEffect(() => {
    if(pets.length <= 0 && location.pathname == '/') //Verify if is the main pathname for load data source
    { 
       setPetsDS()
    }
    localStorage.setItem('pets',JSON.stringify(pets)) //save in local storage the updated data source
  }, [pets])
  
  return (
    <ContextAPI.Provider 
      value={
        {pets,
        breeds,
        waiting,
        setPets
        }
      }>
        {children}
    </ContextAPI.Provider>
  )
}

export const useContextAPI = () =>{
  const context = useContext(ContextAPI)
  return context
}