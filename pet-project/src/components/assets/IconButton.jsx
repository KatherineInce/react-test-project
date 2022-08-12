
const IconButton = (props) => {

  return (
    <>
        <button {...props} className="btn btn-primary customTooltip">
          <span className="customTooltip__message">{props.info}</span>
          {props.children}
        </button>
    </>
   
  )
}

export default IconButton