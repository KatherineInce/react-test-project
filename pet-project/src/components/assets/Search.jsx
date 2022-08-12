//Search customized input with an icon 
import { ImSearch } from "react-icons/im";

const Search = (props) => {
  return (
    <div className="input-group flex-nowrap">
      <span className="input-group-text" id="addon-wrapping"><ImSearch/></span>
      <input className='form-control' {...props}/>
    </div>
  )
}

export default Search