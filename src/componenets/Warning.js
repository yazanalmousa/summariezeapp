import React from 'react'
import '../warning.css'

function Warning(props) {
  return (
    <div>
        <div className="alert">
        <a href='/'><span className="closebtn">&times;</span></a>
        <strong>Warning!</strong> {props.message}
        </div>
    </div>
  )
}

export default Warning