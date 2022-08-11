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
  const [pets, setPets] = useState(storePets)
  const [searchValue, setSearchValue] = useState('')
  const [waiting,setWaiting] = useState({
    loading: false,
    message: ''
  })
  const setPetsDS = async () =>{
    try {
      setWaiting({
        ...waiting,
        loading: true
      })
      let response = await fetch('https://dog.ceo/api/breeds/list/all')
      let dogs = await response.json()
      let petsFormated = await Promise.all(Object.keys(dogs.message).filter(dog => dogs.message[dog].length > 0).map(async dog =>{
          let imageResponse = await fetch('https://dog.ceo/api/breeds/image/random')
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
      //console.log(petsFormated)
      setPets(petsFormated)
      setWaiting({
        message: petsFormated.length > 0 ? '' : 'Data not found',
        loading: false
      })
    } catch (error) {
      setWaiting({
        loading: false,
        message: 'Ups! Something failed'
      })
    }
    
  }
  useEffect(() => {
    if(pets.length <= 0)
    { 
       setPetsDS()
    }
    console.log(pets)
    localStorage.setItem('pets',JSON.stringify(pets))
  }, [pets])
  
  return (
    <ContextAPI.Provider 
      value={
        {pets,
        setPets,
        searchValue,
        setSearchValue}
      }>
        {children}
    </ContextAPI.Provider>
  )
}

export const useContextAPI = () =>{
  const context = useContext(ContextAPI)
  return context
}