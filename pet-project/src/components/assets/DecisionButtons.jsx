import React from 'react'

const DecisionButtons = ({accept,deny,setAccept, setDeny}) => {
  return (
    <div className="d-grid gap-2 pt-2 d-md-flex justify-content-md-end">
        <button className="btn btn-primary me-md-2" type="button" onClick={setAccept}>{accept}</button>
        <button className="btn btn-secondary" type="button" onClick={setDeny}>{deny}</button>
    </div>
  )
}

export default DecisionButtons