import {createContext,useContext,useState,useEffect} from 'react'
import { LoremIpsum } from "lorem-ipsum"; //lorem ipsum generator package
import { uniqueNamesGenerator, names } from 'unique-names-generator';
import ShortUniqueId from 'short-unique-id';

const ContextAPI = createContext()
const uid = new ShortUniqueId()

export const ContextProvider = ({children}) => {
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 15,
      min: 10
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });

  let storePets = JSON.parse(localStorage.getItem('pets'))
  if(!storePets){
    storePets = []
  }

  let storeBreeds = JSON.parse(localStorage.getItem('breeds'))
  if(!storeBreeds){
    storeBreeds = []
  }

  const [pets, setPets] = useState(storePets)
  const [breeds, setBreeds] = useState(storeBreeds)
  const [waiting,setWaiting] = useState({
    loading: false,
    message: ''
  })
  const setPetsDS = async () =>{ //function that set the data source
    try {
      setWaiting({
        ...waiting,
        loading: true
      }) // set loading to true because is fetching data
      let response = await fetch('https://dog.ceo/api/breeds/list/all')
      let dogs = await response.json()
      let breedsFormated = Object.keys(dogs.message).map(dog => dog)
      let petsFormated = await Promise.all(Object.keys(dogs.message).filter(dog => dogs.message[dog].length > 0).map(async dog =>{
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
      }))
      setPets(petsFormated) //set data source to state
      setBreeds(breedsFormated) //set all breeds in a state just one time
      localStorage.setItem('breeds',JSON.stringify(breedsFormated)) //save breeds in local storage 

      setWaiting({
        message: petsFormated.length > 0 ? '' : 'Data not found',
        loading: false
      }) // set Loading to false because fetching finish
    } catch (error) {
      setWaiting({
        loading: false,
        message: 'Ups! Something failed'
      }) //set a message in case fetching failed
    }
    
  }

  useEffect(() => {
    if(pets.length <= 0)
    { 
       setPetsDS()
    }
    //console.log(pets)
    localStorage.setItem('pets',JSON.stringify(pets)) //save in local storage 
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