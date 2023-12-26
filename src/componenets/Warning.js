import React from 'react'
import '../warning.css'

function Warning(props) {
  return (
    <div>
        <div className="alert">
        <a href='/'><span className="closebtn">&times;</span></a>
        <div className='alert-content'>
        <strong>Warning!</strong> {props.message}
        <div><i class="fa-solid fa-triangle-exclamation"></i></div>
        </div>
        </div>
    </div>
  )
}

export default Warning